import { XhrMethod, XhrResponseType } from '@/commonType';
import { postData } from '.';

const AccessTokenUrl = 'https://jkf.hare200.com/gapi/pan.general.member.MemberServiceV2/AccessToken';
const SigninUrl = 'https://www.jkforum.net/api/pan/sso_signin.php';

const genButton = (text: string, foo: () => void) => {
  const b = document.createElement('button');
  b.textContent = text;
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left';
  if (foo) {
    b.addEventListener('click', foo);
  }
  return b;
};

const skipPhoneValidate = () => {
  if (location.href.includes('https://www.jkforum.net/member.php')) {
    document.querySelector('.status_loginned')?.append(genButton('登录前点击按钮跳过手机验证', hackLogin));
  }
};

const hackLogin = () => {
  const xhrSend = XMLHttpRequest.prototype.send;
  let isAuthMethod = 0;
  XMLHttpRequest.prototype.send = async function (...args) {
    if (isAuthMethod) {
      const authBase64 = args[0] as string;
      const response = await postData(AccessTokenUrl, authBase64, {
        contentType: XhrResponseType.GRCP,
        responseType: XhrResponseType.GRCP,
        usermethod: XhrMethod.POST,
      });
      const reg = /[ey].*�/;
      const results = response.match(reg);
      if (results) {
        const jwt = results[0].replace(/�/, '');
        await postData(SigninUrl, undefined, {
          contentType: XhrResponseType.GRCP,
          authorization: 'Bearer ' + jwt,
          responseType: XhrResponseType.GRCP,
        });
        window.location.reload();
      }
    }
    return xhrSend.apply(this, args);
  };

  const xhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method: string, url: string | URL) {
    if (url === AccessTokenUrl) {
      isAuthMethod = 1;
    } else {
      isAuthMethod = 0;
    }
    return xhrOpen.apply(this, [method, url, true]);
  };
};

export { skipPhoneValidate };
