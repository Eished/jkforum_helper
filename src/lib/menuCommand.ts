import { getTid, getVersionNum, turnCdata, urlSearchParams } from '@/utils/tools';
import { getData, postData } from './ajax';
import { MessageBox } from './message';
import { getUserFromName, IUser } from './user';

/**
 * ORC
 */
async function captcha() {
  return new Promise(async (resolve, reject) => {
    const user = getUserFromName();
    if (!user) return;
    const type = 'application/x-www-form-urlencoded';
    const url = `${user.votedUrl}id=topthreads:setstatus&tid=${user.freeTid}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;

    const captchaPage = await postData(url, urlSearchParams({ captcha_input: '' }).toString(), type)
      .then((res) => turnCdata(res.responseXML))
      .catch((e) => {
        console.log(e);
        return 'retry';
      });

    if (captchaPage === 'Access denied.') {
      new MessageBox(captchaPage);
      reject('Access denied.');
      return;
    } else if (typeof captchaPage !== 'object') {
      new MessageBox('验证码图片访问失败，正在重试...');
      reject('retry');
      return;
    }
    const image = captchaPage.querySelector('#captcha');
    document.body.append(image);
    image.onload = async function () {
      //文件的Base64字符串获取验证码
      const ma = await readImage(getBase64Image(image));
      if (ma.includes(' ')) {
        // 令牌错误不重试，使用空格通配
        new MessageBox(ma + ' 令牌错误，需要令牌请私聊 or 发送邮件到 kished@outlook.com ', 10000);
        user.token = '';
        GM_setValue(user.username, user);
        reject(ma);
        return;
      }

      const result = await postData(url, urlSearchParams({ captcha_input: ma }).toString(), type)
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
function getBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  const dataURL = canvas.toDataURL('image/' + ext);
  return dataURL;
}

/**
 *Base64字符串转二进制
 */
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
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

async function autoCompleteCaptcha(user: IUser) {
  if (!user.token) {
    user.token = prompt('请输入验证码识别的 api 令牌（需要令牌请私聊 or 发送邮件到 kished@outlook.com ）：') ?? '';
    const reg = /.*\..*\..*\..*/g;
    if (reg.test(user.token)) {
      GM_setValue(user.username, user);
    } else {
      new MessageBox('无效的令牌');
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

  captcha()
    .then((res) => {
      const msId = new MessageBox();
      playVideo(msId);
      setTimeout(() => {
        msId.removeMessage();
        autoCompleteCaptcha(user);
      }, user.freeTime);
    })
    .catch((e) => {
      if (e === 'retry') {
        setTimeout(() => {
          autoCompleteCaptcha(user);
        }, 5000); // 重试频率限制
      } else {
        new MessageBox(e);
      }
    });
}

function swRePic(user: IUser) {
  if (user.autoRePicSw === 1) {
    user.autoRePicSw = 0;
    GM_setValue(user.username, user);
    new MessageBox('已关闭加载原图');
  } else {
    user.autoRePicSw = 1;
    GM_setValue(user.username, user);
    new MessageBox('已开启加载原图');
  }
}

function swPay(user: IUser) {
  if (user.autoPaySw === 1) {
    user.autoPaySw = 0;
    GM_setValue(user.username, user);
    new MessageBox('已关闭自动购买');
  } else {
    user.autoPaySw = 1;
    GM_setValue(user.username, user);
    new MessageBox('已开启自动购买');
  }
}

function swThk(user: IUser) {
  if (user.autoThkSw === 1) {
    user.autoThkSw = 0;
    GM_setValue(user.username, user);
    new MessageBox('已关闭自动感谢');
  } else {
    user.autoThkSw = 1;
    GM_setValue(user.username, user);
    new MessageBox('已开启自动感谢');
  }
}

async function update(user: IUser) {
  new MessageBox('正在检查更新...');
  const data = await getData(user.greasyforkUrl);
  let version = data.querySelectorAll('.script-show-version span')[1].innerHTML;
  if (getVersionNum(user.version) < getVersionNum(version)) {
    GM_openInTab(`${user.greasyforkUrl}-jkforum-%E5%8A%A9%E6%89%8B/code/JKForum%20%E5%8A%A9%E6%89%8B.user.js`);
  } else {
    new MessageBox('已是最新版本！');
  }
}

export { update, swThk, swPay, swRePic, autoCompleteCaptcha };
