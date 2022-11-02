import { IMPORTANCE, IUser, XhrMethod, XhrResponseType } from '@/commonType';
import { rdNum, turnCdata, urlSearchParams } from '@/utils/tools';
import { MessageBox, postData } from './';
import { ThreadData } from './../views/AutoClickManage';

/**
 * ORC
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
            code.error_msg + '：令牌错误，需要令牌请登录 jkf.iknow.fun or 发送邮件到 kished@outlook.com ',
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
  const body = urlSearchParams({ image: base64, token: user.token }).toString();
  const response = await postData(user.orcUrl, body, {
    responseType: XhrResponseType.JSON,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }).catch((e) => {
    return { error_msg: e.response?.message, error_code: 100 };
  });
  const orcResults: OrcResult = response;
  if ('words_result_num' in orcResults) {
    if (orcResults.words_result_num === 1 && orcResults.words_result[0].words.length === 4) {
      return orcResults.words_result[0].words;
    }
  }
  if ('error_msg' in orcResults) {
    return orcResults;
  }
  return String(rdNum(1000, 10000));
}

async function autofillCaptcha(
  t: ThreadData,
  user: IUser,
  saveTimesData: (value: ThreadData) => void,
  saveStatusData: (value: ThreadData) => void
) {
  try {
    const result = await captcha(t.url, user);
    // 调用计数
    saveTimesData(t);
    setTimeout(() => {
      autofillCaptcha(t, user, saveTimesData, saveStatusData);
    }, Number(t.cycle) * 60 * 1000);
  } catch (e: any) {
    if (e === RETRY) {
      // 调用计数
      saveTimesData(t);
      setTimeout(() => {
        autofillCaptcha(t, user, saveTimesData, saveStatusData);
      }, 2000 + rdNum(1000, 4000)); // 重试频率限制
    } else {
      // 错误则改变状态
      saveStatusData(t);
    }
  }
}

export { autofillCaptcha };
