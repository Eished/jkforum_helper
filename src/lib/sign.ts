import { Counter, IUser } from '@/commonType';
import { NowTime, checkHtml, urlSearchParams, waitFor } from '@/utils/tools';
import { MessageBox, postDataCdata } from './';

// 定时签到
function timeControl(counter: Counter, setCounter: (num: Counter) => void, user: IUser) {
  const signtime = user.signtime; // 设定签到时间
  // 初始化永久消息通知
  const msIdSig = new MessageBox();
  const msIdTime = new MessageBox();
  let timer = 0;

  async function control() {
    const now = new NowTime(); // 获取当前时间，到秒
    if (now.seconds == signtime) {
      clearInterval(timer); // timer=1 未知原因
      setCounter({
        ...counter,
        signBtn: 0,
      });
      // 移除永久消息通知
      msIdSig.remove();
      msIdTime.update('执行中....');
      for (let i = 0; i < user.signNum; i++) {
        //重试次数
        sign(user);
        msIdTime.update('执行第' + (i + 1) + '次');
        await waitFor(user.interTime); //重试间隔
      }
      msIdTime.remove();
    } else {
      msIdTime.update('时间没有到：' + signtime + '，目前时间：' + now.seconds);
    }
  }
  if (!counter.signBtn) {
    // 防重复点击
    msIdSig.show('定时签到中，请勿退出...', 'none');
    msIdTime.show('...', 'none'); // 占位消息，给刷新用

    timer = window.setInterval(control, 500);
    setCounter({
      ...counter,
      signBtn: timer,
    }); // 运行自动签到}
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
    const info = stringOrHtml.querySelector('.c')?.innerHTML.split('<')[0].trim(); // 解析html，返回字符串
    new MessageBox(info);
  } else {
    new MessageBox(stringOrHtml); //其它情况直接输出
  }
}

export { sign, timeControl };
