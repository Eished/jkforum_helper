import { urlSearchParams, turnCdata, getTid } from '@/utils/tools';
import { MessageBox, playVideo, postData } from './';
import { IUser } from '@/commonType';

/**
 * ORC
 */
async function captcha(user: IUser) {
  return new Promise(async (resolve, reject) => {
    if (!user) return;
    const url = `${user.votedUrl}id=topthreads:setstatus&tid=${user.freeTid}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;

    const captchaPage = await postData(url, urlSearchParams({ captcha_input: '' }).toString())
      .then((res) => turnCdata(res.responseXML))
      .catch((e) => {
        console.log(e);
        return 'retry';
      });

    if (captchaPage === 'Access denied.') {
      reject(captchaPage + ' 无访问权限');
      return;
    } else if (typeof captchaPage !== 'object') {
      new MessageBox('验证码图片访问失败，正在重试...');
      reject('retry');
      return;
    }
    const image = captchaPage.querySelector('#captcha') as HTMLImageElement;
    document.body.append(image);
    image.onload = async function () {
      //文件的Base64字符串获取验证码
      const ma = await readImage(getBase64Image(image), user);
      if (ma.includes(' ')) {
        // 令牌错误不重试，使用空格通配
        new MessageBox(ma + ' 令牌错误，需要令牌请私聊 or 发送邮件到 kished@outlook.com ', 10000);
        user.token = '';
        GM_setValue(user.username, user);
        reject(ma);
        return;
      }

      const result = await postData(url, urlSearchParams({ captcha_input: ma }).toString())
        .then((res) => turnCdata(res.responseXML))
        .catch((e) => {
          console.log(e);
          return 'retry';
        });
      if (result === 'retry') {
        new MessageBox('验证码图片访问失败，正在重试...');
        reject('retry');
        return;
      }
      if (result === '更新完成！若狀態仍沒更新，請嘗試刷新頁面') {
        new MessageBox('更新完成！自動‘現在有空’中，請不要刷新頁面！', user.freeTime);
        resolve(result);
        return;
      } else {
        new MessageBox('验证码错误，正在重试...');
        reject('retry');
        return;
      }
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
  ctx!.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  const dataURL = canvas.toDataURL('image/' + ext);
  return dataURL;
}

/**
 *Base64字符串转二进制
 */
function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(',');
  if (!arr.length) return;
  let mime = arr[0];
  if (!mime) return;
  let mimeTemp = mime.match(/:(.*?);/);
  if (!mimeTemp) return;
  mime = mimeTemp[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

async function readImage(base64: string, user: IUser) {
  const url = `${user.orcUrl}access_token=${user.token}&Content-Type=application/x-www-form-urlencoded`;
  const body = urlSearchParams({ image: base64 }).toString();
  return postData(url, body).then((res) => {
    const code = JSON.parse(res.responseText);
    if (code?.words_result) {
      return code.words_result[0].words;
    }
    return code.error_msg + ' '; // 空格作为错误标志
  });
}

async function autofillCaptcha(user: IUser) {
  if (!user.token) {
    const token = prompt('请输入验证码识别的 api 令牌（需要令牌请私聊 or 发送邮件到 kished@outlook.com ）：');
    const reg = /.*\..*\..*\..*/g;
    if (token && reg.test(user.token)) {
      user.token = token;
      GM_setValue(user.username, user);
    } else if (token !== null) {
      new MessageBox('无效的令牌');
      return;
    } else {
      return;
    }
  }

  if (!user.freeTid) {
    const status = document.querySelector('#topthread_status');
    if (status) {
      user.freeTid = getTid(location.href);
      GM_setValue(user.username, user);
    } else {
      new MessageBox('找不到指定页面元素！请先打开自己的帖子再试');
      return;
    }
  }

  captcha(user)
    .then((res) => {
      const msId = new MessageBox();
      playVideo(msId);
      setTimeout(() => {
        msId.remove();
        autofillCaptcha(user);
      }, user.freeTime);
    })
    .catch((e) => {
      if (e === 'retry') {
        setTimeout(() => {
          autofillCaptcha(user);
        }, 5000); // 重试频率限制
      } else {
        new MessageBox(e);
      }
    });
}

export { autofillCaptcha };
