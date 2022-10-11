import { IMPORTANCE, IUser, XhrMethod, XhrResponseType } from '@/commonType';
import { getTid, rdNum, turnCdata, urlSearchParams } from '@/utils/tools';
import { MessageBox, postData } from './';

/**
 * ORC
 */

const RETRY = 'retry';

async function captcha(user: IUser, freeTid: string) {
  return new Promise<string>((resolve, reject) => {
    const url = `${user.votedUrl}id=topthreads:setstatus&tid=${freeTid}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;
    const image = document.createElement('img') as HTMLImageElement;
    image.id = 'captcha';
    image.src = '/captcha/code.php' + '?' + new Date().getMilliseconds();
    image.width = 120;
    document.body.append(image);

    image.onload = async function () {
      //文件的Base64字符串获取验证码
      const code = await readImage(getBase64Image(image), user);
      if (typeof code === 'object') {
        // 令牌错误不重试，使用空格通配
        if (code.error_code === 100 || code.error_code === 111 || code.error_code === 110) {
          new MessageBox(
            code.error_msg + ' 令牌错误，需要令牌请私聊 or 发送邮件到 kished@outlook.com ',
            10000,
            IMPORTANCE.LOG_POP_GM
          );
          user.token = '';
          GM_setValue(user.username, user);
        } else {
          new MessageBox(code.error_msg + ' 未处理的错误，请手动重试或联系管理员', 10000, IMPORTANCE.LOG_POP_GM);
        }
        return reject(code.error_msg);
      }
      if (image.parentNode) {
        image.parentNode.removeChild(image);
      }
      const result = await postData(url, urlSearchParams({ captcha_input: code }).toString())
        .then((res) => turnCdata(res.responseXML))
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

type OrcResult =
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
  const url = `${user.orcUrl}access_token=${user.token}&Content-Type=application/x-www-form-urlencoded`;
  const body = urlSearchParams({ image: base64 }).toString();
  return postData(url, body, {
    responseType: XhrResponseType.JSON,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }).then((res) => {
    const orcResults: OrcResult = res.response;
    if ('words_result_num' in orcResults) {
      if (orcResults.words_result_num === 1 && orcResults.words_result[0].words.length === 4) {
        return orcResults.words_result[0].words;
      }
    }
    if ('error_msg' in orcResults) {
      return orcResults;
    }
    return String(rdNum(1000, 10000));
  });
}

async function autofillCaptcha(user: IUser, freeTid?: string) {
  if (!user.token) {
    const token = prompt('请输入验证码识别的 api 令牌（需要令牌请私聊 or 发送邮件到 kished@outlook.com ）：');
    const reg = /.*\..*\..*\..*/;
    if (token && reg.test(token)) {
      user.token = token;
      GM_setValue(user.username, user);
    } else if (token !== null) {
      new MessageBox('无效的令牌');
      return;
    } else {
      return;
    }
  }

  if (!freeTid) {
    const status = document.querySelector('#topthread_status');
    if (status) {
      freeTid = getTid(location.href);
    } else {
      new MessageBox('找不到指定页面元素！请先打开自己的帖子再试');
      return;
    }
  }

  captcha(user, freeTid)
    .then(() => {
      setTimeout(() => {
        autofillCaptcha(user, freeTid);
      }, user.freeTime);
    })
    .catch((e) => {
      if (e === RETRY) {
        setTimeout(() => {
          autofillCaptcha(user, freeTid);
        }, 2000 + rdNum(1000, 4000)); // 重试频率限制
      } else {
        new MessageBox(e);
      }
    });
}

export { autofillCaptcha };
