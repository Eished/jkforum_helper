import { getVersionNum } from '@/utils/tools';
import { getData, MessageBox } from './';
import { IUser } from '@/commonType';

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

export { update, swThk, swPay, swRePic };
