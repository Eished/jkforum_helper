import { IUser } from '@/commonType';
import { getVersionNum } from '@/utils/tools';
import { getData, MessageBox } from './';

function swRePic(user: IUser) {
  if (user.autoRePicSw) {
    user.autoRePicSw = false;
    GM_setValue(user.username, user);
    new MessageBox('已关闭加载原图');
  } else {
    user.autoRePicSw = true;
    GM_setValue(user.username, user);
    new MessageBox('已开启加载原图');
  }
}

function swPay(user: IUser) {
  if (user.autoPaySw) {
    user.autoPaySw = false;
    GM_setValue(user.username, user);
    new MessageBox('已关闭自动购买');
  } else {
    user.autoPaySw = true;
    GM_setValue(user.username, user);
    new MessageBox('已开启自动购买');
  }
}

function swThk(user: IUser) {
  if (user.autoThkSw) {
    user.autoThkSw = false;
    GM_setValue(user.username, user);
    new MessageBox('已关闭自动感谢');
  } else {
    user.autoThkSw = true;
    GM_setValue(user.username, user);
    new MessageBox('已开启自动感谢');
  }
}

function swDailyTask(user: IUser) {
  if (user.autoDailyTask) {
    user.autoDailyTask = false;
    GM_setValue(user.username, user);
    new MessageBox('已关闭定时每日任务，刷新页面后生效');
  } else {
    user.autoDailyTask = true;
    GM_setValue(user.username, user);
    new MessageBox('已开启定时每日任务，刷新页面后生效');
  }
}

async function checkUpdate(user: IUser) {
  const msg = new MessageBox('正在检查更新...', 'none');
  const data = await getData(user.greasyforkUrl);
  const version = data.querySelectorAll('.script-show-version span')[1].innerHTML;
  if (getVersionNum(user.version) < getVersionNum(version)) {
    GM_openInTab(`${user.greasyforkUrl}-jkforum-%E5%8A%A9%E6%89%8B/code/JKForum%20%E5%8A%A9%E6%89%8B.user.js`);
  } else {
    new MessageBox('已是最新版本！');
  }
  msg.remove();
}

export { checkUpdate, swDailyTask, swPay, swRePic, swThk };
