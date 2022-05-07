import { Counter, IUser } from '@/commonType';
import { checkHtml, NowTime, urlSearchParams, waitFor } from '@/utils/tools';
import { MessageBox, playVideo, postDataCdata } from './';

// 定时签到
function timeControl(counter: Counter, setCounter: (num: Counter) => void, user: IUser) {
  const signtime = user.signtime; // 设定签到时间
  // 初始化永久消息通知
  const msIdSlp = new MessageBox();
  const msIdSig = new MessageBox();
  const msIdTime = new MessageBox();

  async function control() {
    const now = new NowTime(); // 获取当前时间，到秒
    if (now.seconds == signtime) {
      clearInterval(counter.signBtn); // timer=1 未知原因
      counter.signBtn = 0;
      // 移除永久消息通知
      msIdSlp.removeMessage();
      msIdSig.removeMessage();
      msIdTime.refreshMessage('执行中....');
      for (let i = 0; i < user.signNum; i++) {
        //重试次数
        sign(user);
        msIdTime.refreshMessage('执行第' + (i + 1) + '次');
        await waitFor(user.interTime); //重试间隔
      }
      msIdTime.removeMessage();
    } else {
      msIdTime.refreshMessage('时间没有到：' + signtime + '，目前时间：' + now.seconds);
    }
  }
  if (!counter.signBtn) {
    // 防重复点击
    playVideo(msIdSlp); // 防休眠
    msIdSig.showMessage('定时签到中，请勿退出...', 'none');
    msIdTime.showMessage('...', 'none'); // 占位消息，给刷新用
    counter.signBtn = window.setInterval(control, 500); // 运行自动签到
  }
}

async function sign(user: IUser) {
  const signParamsData = urlSearchParams({
    formhash: user.formhash,
    qdxq: user.mood,
    qdmode: 1,
    todaysay: user.todaysay,
    fastreply: 1,
  }).toString();
  const stringOrHtml = await postDataCdata(user.signUrl, signParamsData); // 直接post签到数据
  if (checkHtml(stringOrHtml)) {
    // 确认html
    const info = (stringOrHtml as Document).querySelector('.c')?.innerHTML.split('<')[0].trim(); // 解析html，返回字符串
    new MessageBox(info);
  } else {
    new MessageBox(stringOrHtml as string); //其它情况直接输出
  }
}

export { timeControl, sign };
