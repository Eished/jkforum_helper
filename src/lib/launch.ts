import { NowTime } from '@/utils/tools';
import { autoThk } from './thank';
import { IUser } from './user';

// 启动
async function launch(user: IUser) {
  try {
    if (location.href.includes('thread')) {
      if (user.autoThkSw) {
        // 自动感谢当前贴开关
        await autoThk(user);
      }
      if (user.autoPaySw) {
        // 自动购买当前贴开关
        await autoPay();
      }
      rePic(); // 启动自动加载原图；
    }
    // 天变动则签到\投票
    const now = new NowTime();
    if (user.today != now.day) {
      user.today = now.day;
      sign(); // 签到
      await autoVoted();
    }
  } catch (e) {
    GM_setValue(user.username, user); //保存当天日// today 初始化
    console.error(e);
  }
}

export { launch };
