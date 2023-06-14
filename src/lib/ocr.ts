import { IMPORTANCE, IUser, ThreadData, XhrMethod, XhrResponseType } from '@/commonType';
import { getTid, rdNum, turnCdata, urlSearchParams } from '@/utils/tools';
import { MessageBox, postData } from '.';

/**
 * OCR
 */

export const RETRY = 'retry';

async function captcha(url: string, user: IUser) {
  return new Promise<string>((resolve, reject) => {
    const image = document.createElement('img') as HTMLImageElement;
    image.id = 'captcha';
    image.src = '/captcha/code.php' + '?' + new Date().getMilliseconds();
    image.width = 120;
    document.body.append(image);

    image.onload = async function () {
      //文件的Base64字符串获取验证码
      const code = await readImage(getBase64Image(image), user);
      if (image.parentNode) {
        image.parentNode.removeChild(image);
      }
      if (typeof code === 'object') {
        // 令牌错误不重试，使用空格通配
        if (code.error_code === 100 || code.error_code === 111 || code.error_code === 110) {
          new MessageBox(
            code.error_msg + '：令牌错误，需要令牌请登录 jkf.iknow.fun 或发送邮件到 kished@outlook.com ',
            10000,
            IMPORTANCE.LOG_POP_GM
          );
        } else {
          new MessageBox(code.error_msg + ' 未处理的错误，请手动重试或联系管理员', 10000, IMPORTANCE.LOG_POP_GM);
        }
        return reject(code.error_msg);
      }
      const result = await postData(url, urlSearchParams({ captcha_input: code }).toString())
        .then((response) => turnCdata(response))
        .catch((e) => {
          console.log(e);
          return RETRY;
        });
      if (result === RETRY) {
        new MessageBox('验证码发送失败，正在重试...');
        return reject(RETRY);
      } else if (result === '更新完成！若狀態仍沒更新，請嘗試刷新頁面') {
        new MessageBox('更新完成！自動‘現在有空’中，請不要刷新頁面！', user.freeTime);
        return resolve(result);
      } else if (result === 'Access denied.') {
        new MessageBox('无此帖子的访问权限，请检查帖子状态');
        return reject(result);
      } else {
        new MessageBox('验证码错误，正在重试...');
        return reject(RETRY);
      }
    };

    image.onerror = function (error) {
      console.log(error);
      if (image.parentNode) {
        image.parentNode.removeChild(image);
      }
      new MessageBox('验证码图片加载失败，正在重试...');
      return reject(RETRY);
    };
  });
}

/**
 * 图像转Base64
 */
function getBase64Image(img: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx && ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  const dataURL = canvas.toDataURL('image/' + ext);
  return dataURL;
}

type OcrResult =
  | {
      words_result: {
        words: string;
      }[];
      words_result_num: number;
      log_id: number;
    }
  | {
      log_id: number;
      error_msg: string;
      error_code: number;
    };

async function readImage(base64: string, user: IUser) {
  const body = urlSearchParams({ image: base64, token: user.token }).toString();
  const response = await postData(user.ocrUrl, body, {
    responseType: XhrResponseType.JSON,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }).catch((e) => {
    return { error_msg: e.response?.message, error_code: 100 };
  });
  const ocrResults: OcrResult = response;
  if ('words_result_num' in ocrResults) {
    if (ocrResults.words_result_num === 1 && ocrResults.words_result[0].words.length === 4) {
      return ocrResults.words_result[0].words;
    }
  }
  if ('error_msg' in ocrResults) {
    return ocrResults;
  }
  return String(rdNum(1000, 10000));
}

async function autofillCaptcha(
  t: ThreadData,
  user: IUser,
  setNextClickTime: (value: ThreadData) => void,
  saveStatusData: (value: ThreadData) => void,
  triggerNextClick: (value: ThreadData) => void
) {
  try {
    // 在异步请求前设置好时间，防止时间错误
    const timeInterval = 1000 * 60 * Number(t.cycle);
    const nextClickTime = new Date().getTime() + timeInterval;
    t.nextClickTime = nextClickTime;

    const url = `${user.votedUrl}id=topthreads:setstatus&tid=${getTid(
      t.url
    )}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;
    const result = await captcha(url, user);
    t.retry = 0;
    // 调用计数和存入时间
    setNextClickTime(t);
    setTimeout(() => {
      triggerNextClick(t);
    }, timeInterval);
  } catch (e: any) {
    if (e === RETRY) {
      const timeInterval = 1000 + rdNum(1000, 4000);
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
      saveStatusData(t);
      new MessageBox(e);
    }
  }
}

export { autofillCaptcha };
