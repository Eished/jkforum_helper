import { Importance, IUser, OcrResult, RunStatus, ThreadData, XhrMethod, XhrResponseType } from '@/commonType';
import { getBase64Image, getTid, hoursUntilTimeRange, rdNum, turnCdata, urlSearchParams } from '@/utils/tools';
import { MessageBox, postData } from '.';

/**
 * OCR
 */

export const RETRY = 'retry';

async function captcha(thread: ThreadData, user: IUser) {
  const tid = getTid(thread.url);
  const url = `${user.votedUrl}id=topthreads:setstatus&tid=${tid}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;
  return new Promise<string>((resolve, reject) => {
    const image = document.createElement('img') as HTMLImageElement;
    image.id = 'captcha';
    image.src = 'https://www.jkforum.net/captcha/code.php' + '?' + new Date().getMilliseconds();
    image.width = 120;
    image.crossOrigin = 'anonymous';
    document.body.append(image);

    image.onload = async function () {
      const base64Img = getBase64Image(image);
      if (!base64Img) {
        new MessageBox('图片转码失败，正在重试...');
        return reject(RETRY);
      }
      //文件的Base64字符串获取验证码
      const code = await readImage(base64Img, user);
      if (image.parentNode) {
        image.parentNode.removeChild(image);
      }

      if (typeof code === 'string') {
        const response = await postData(url, urlSearchParams({ captcha_input: code }).toString()).catch((e) => {
          console.log(e);
          return RETRY;
        });
        if (!response) {
          new MessageBox(tid + '，无效的帖子ID，请检查帖子状态', 'none', 'LOG_POP_GM');
          return reject(response);
        }
        const result = turnCdata(response);
        if (result === RETRY) {
          new MessageBox(tid + '，验证码发送失败，正在重试...');
          return reject(RETRY);
        } else if (result === '更新完成！若狀態仍沒更新，請嘗試刷新頁面') {
          new MessageBox(tid + '，更新完成！自動‘現在有空’中，請不要刷新頁面！');
          return resolve(result);
        } else if (result === 'Access denied.') {
          new MessageBox(tid + '，无此帖子的访问权限，请检查帖子状态', 'none', 'LOG_POP_GM');
          return reject(result);
        } else {
          new MessageBox(tid + '，验证码错误，正在重试...');
          return reject(RETRY);
        }
      } else {
        if (code.error_msg === RETRY) {
          new MessageBox('识别失败，正在重试...');
          return reject(RETRY);
        } else if (code.type === 'token_error') {
          new MessageBox('令牌错误，请检查设置：' + code.error_msg, 'none', Importance.LOG_POP_GM);
          return reject(code);
        } else if (code.type === 'server_error') {
          new MessageBox(
            `服务器内部错误，将在 ${thread.cycle} 分钟后自动重试，多次重试未恢复请联系管理员`,
            60000 * Number(thread.cycle),
            Importance.LOG_POP_GM
          );
          return resolve(code.error_msg);
        } else {
          // 其他错误情况
          new MessageBox('运行错误，正在重试：' + code.error_msg);
          return reject(RETRY);
        }
      }
    };

    image.onerror = function (error) {
      console.log(error);
      if (image.parentNode) {
        image.parentNode.removeChild(image);
      }
      new MessageBox(tid + '，验证码图片加载失败，正在重试...');
      return reject(RETRY);
    };
  });
}

async function readImage(base64: string, user: IUser) {
  const body = urlSearchParams({ image: base64, token: user.token }).toString();
  const response = await postData(user.ocrUrl, body, {
    responseType: XhrResponseType.JSON,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }).catch((e: any) => {
    if (e === 'timeout' || e?.message?.includes('network')) {
      return { error_msg: RETRY };
    }
    // 其他未知错误也返回为重试，解析错误消息
    let msg;
    if (e.response) {
      msg = JSON.parse(e.response);
      if (msg && msg.message) {
        msg = msg.message;
      } else {
        msg = e.statusText;
      }
    } else if (e.statusText) {
      msg = e.statusText;
    } else {
      msg = '未知错误';
    }
    return {
      error_msg: msg,
      type: 'unknown_error',
    };
  });

  const ocrResults: OcrResult = response;

  // 成功识别验证码的情况
  if ('words_result' in ocrResults) {
    const words = ocrResults.words_result[0].words.replace(/g/gi, '6');
    if (words.length < 4) {
      return String(rdNum(0, 10)) + words;
    } else if (words.length > 4) {
      return words.slice(1, 5);
    } else {
      return words;
    }
  }

  // 处理错误情况
  if ('error_msg' in ocrResults) {
    // 令牌相关错误
    if (ocrResults.error_msg.includes('令牌') || ocrResults.error_msg.includes('Not Found:')) {
      return {
        error_msg: ocrResults.error_msg,
        type: 'token_error', // 添加错误类型标记
      };
    }

    // 服务器内部错误
    if (ocrResults.error_msg === '服务器内部错误') {
      return {
        error_msg: ocrResults.error_msg,
        type: 'server_error',
      };
    }

    // 其他错误返回 RETRY
    return { error_msg: RETRY };
  }

  // 兜底返回随机数
  return String(rdNum(1000, 10000));
}

async function autofillCaptcha(
  t: ThreadData,
  user: IUser,
  setNextClickTime: (value: ThreadData, skip?: boolean) => void,
  saveStatusData: (url: string, runStatus: RunStatus) => void,
  triggerNextClick: (value: ThreadData) => void
) {
  try {
    // 在异步请求前设置好时间，防止时间错误
    let timeInterval = 60000 * Number(t.cycle);
    let skip = false;
    const now = new Date();
    if (t.runTime) {
      const hours = hoursUntilTimeRange(t.runTime.startTime, t.runTime.endTime);
      if (hours !== 0) {
        // 不在运行时间内时，随机数增加到120秒（2分钟）内，减少并发启动时造成的错误重试
        const overMinutes = now.getMinutes() * 60000 + now.getSeconds() * 1000 - rdNum(0, 120000);
        timeInterval = hours * 3600000 - overMinutes;
        skip = true;
      }
    }
    const nextClickTime = now.getTime() + timeInterval;
    t.nextClickTime = nextClickTime;

    if (!skip) {
      saveStatusData(t.url, RunStatus.Running);
      await captcha(t, user);
      t.retry = 0;
    } else {
      saveStatusData(t.url, RunStatus.Waiting);
    }
    // 调用计数和存入时间
    setNextClickTime(t, skip);
    setTimeout(() => {
      triggerNextClick(t);
    }, timeInterval);
  } catch (e: unknown) {
    if (typeof e === 'string') {
      if (e === RETRY) {
        const timeInterval = 1000 + rdNum(0, 5000);

        const nextClickTime = new Date().getTime() + timeInterval;
        t.nextClickTime = nextClickTime;
        t.retry = (t.retry ?? 0) + 1;
        // 调用计数
        setNextClickTime(t);
        setTimeout(() => {
          triggerNextClick(t);
        }, timeInterval); // 重试频率限制
      } else {
        // 错误则改变状态
        saveStatusData(t.url, RunStatus.Error);
      }
    } else {
      saveStatusData(t.url, RunStatus.Error);
    }
  }
}

export { autofillCaptcha };
