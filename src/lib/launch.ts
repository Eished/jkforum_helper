import { AutoPlayCounter, IUser } from '@/commonType';
import { NowTime, waitFor } from '@/utils/tools';
import { addPlayEvent, autoPay, autoThk, autoVoted, loadOriginImage, sign } from './';

// 启动
async function launch(user: IUser) {
  try {
    // 增加路由地址判断，只执行对应函数
    const localUrl = location.href;
    if (localUrl.includes('thread')) {
      if (user.autoThkSw) {
        // 自动感谢当前贴
        await autoThk(user);
      }
      if (user.autoPaySw) {
        // 自动购买当前贴
        await autoPay(user);
      }
      if (user.autoRePicSw) {
        // 自动加载原图；
        loadOriginImage();
      }
      // 自动播放图片
      const counter: AutoPlayCounter = {
        playBtn: 0,
        playFlag: 0,
      };
      addPlayEvent(counter, user);
    } else if (
      localUrl.includes('/forum-') ||
      localUrl.includes('/type-')
      // || localUrl.includes('forum.php?mod=forumdisplay') //  图片模式只有一个页面，不需要
    ) {
      // 去掉高亮标题
      const hightLightTitles: NodeListOf<HTMLDivElement> = document.querySelectorAll('[style="color: #2B65B7"]');
      if (hightLightTitles.length) {
        hightLightTitles.forEach((e) => {
          e.style.color = '';
        });
      }
    }

    // 天变动则签到\投票
    const now = new NowTime();
    if (user.today != now.day) {
      user.today = now.day;
      await Promise.all([sign(user), autoVoted(user)]);
    }

    // 异步启动定时每日任务
    if (user.autoDailyTask) {
      autoDailyTasks(user);
    }
  } catch (e) {
    GM_setValue(user.username, user); //保存当天日// today 初始化
    console.error(e);
  }
}

const autoDailyTasks = async (user: IUser) => {
  await waitFor(86400000);
  await Promise.all([sign(user), autoVoted(user)]);
  await autoDailyTasks(user);
};

export { autoDailyTasks, launch };
