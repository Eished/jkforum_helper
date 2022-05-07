import { IUser } from '@/commonType';
import { compaObjKey, copyObjVal } from '@/utils/tools';
import { MessageBox, setFastReply } from './';

class User implements IUser {
  username: string;
  formhash: string;
  version: string;
  today: string;
  signtime: string;
  signNum: number;
  interTime: number;
  todaysay: string;
  mood: string;
  autoPlayDiff: number;
  autoPaySw: number;
  autoThkSw: number;
  autoRePicSw: number;
  differ: number;
  interval: number;
  thkDiffer: number;
  limit: number;
  page: string;
  token: string;
  freeTime: number;
  freeTid: string;
  votedMessage: string;
  orcUrl: string;
  votedUrl: string;
  applyVotedUrl: string;
  taskDoneUrl: string;
  signUrl: string;
  thkUrl: string;
  payUrl: string;
  fastReplyUrl: string;
  replyUrl: string;
  greasyforkUrl: string;
  userReplyMessage: never[];
  fastReply: never[];
  replyThreads: never[];
  constructor(username: string, formhash: string) {
    this.username = username;
    this.formhash = formhash;
    this.version = GM_info.script.version;
    this.today = ''; // 签到日期
    this.signtime = '23:59:59'; // 定时签到时间
    this.signNum = 10; // 定时签到重试次数
    this.interTime = 200; // 定时签到重试间隔时间ms
    this.todaysay = '簽到'; // 签到输入内容
    this.mood = 'fd'; // 签到心情
    this.autoPlayDiff = 2000; // 自动播放图片间隔时间ms
    this.autoPaySw = 1; // 自动支付开关
    this.autoThkSw = 1; // 自动感谢开关
    this.autoRePicSw = 1; // 自动加载原图开关
    this.differ = 10000; // 回帖随机间隔时间ms
    this.interval = 20000; // 回帖基础间隔时间ms
    this.thkDiffer = 1000; // 批量感谢间隔时间ms
    this.limit = 2; // 并发下载图片数量限制
    this.page = ''; // 批量回帖页码
    this.token = ''; // ORC token
    this.freeTime = 3600000; // 现在有空间隔
    this.freeTid = ''; // 自动现在有空 帖子ID，一个账号一个贴子
    this.votedMessage = '+1'; // 投票输入内容
    this.orcUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?'; // general_basic 精准或普通 api
    this.votedUrl = 'https://www.jkforum.net/plugin.php?';
    this.applyVotedUrl = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';
    this.taskDoneUrl = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';
    this.signUrl = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1';
    this.thkUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1';
    this.payUrl = 'https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1';
    this.fastReplyUrl = 'https://www.jkforum.net/thread-8364615-1-1.html';
    this.replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&';
    this.greasyforkUrl = 'https://greasyfork.org/zh-CN/scripts/427246';
    this.userReplyMessage = []; // 用户保存的回复，历史回帖内容
    this.fastReply = []; // 保存的快速回复，快速回帖内容
    this.replyThreads = []; // 回帖任务数据
  }
}

const getUserName = () => {
  return document.querySelector('.avatar_info a')?.innerHTML;
};

const getUserFromName = (): IUser | undefined => {
  const userName = getUserName();
  return userName ? GM_getValue(userName) : undefined;
};

const getFormhash = () => {
  return (document.querySelector('.listmenu li a') as HTMLLinkElement)?.href.split('&')[2].split('=')[1];
};

const creatUser = async (username: string) => {
  const formhash = getFormhash();
  let user = getUserFromName();
  if (!user) {
    // 空则写入，或版本变动写入
    user = new User(username, formhash);
    user = await setFastReply(user); // 设置快速回复
    GM_setValue(username, user);
    new MessageBox('添加用户成功！');
  } else if (user.version != GM_info.script.version) {
    const userMod = new User(username, formhash);
    const compa = compaObjKey(userMod, user); // 比较key
    if (compa) {
      // key相同 只改变版本
      user.version = GM_info.script.version; // 记录新版本
    } else {
      // key不同
      user.version = GM_info.script.version; // 记录新版本
      user = copyObjVal(userMod, user); // new对User赋值
      new MessageBox('数据更新成功！');
    }
    user = await setFastReply(user); // 设置快速回复
    GM_setValue(username, user);
    new MessageBox('版本更新成功！请阅读使用说明。');
  }
  if (user.formhash != formhash) {
    // formhash 变动存储
    user.formhash = formhash;
    GM_setValue(username, user);
  }
  return user;
};

export { User, getUserName, getUserFromName, creatUser };
