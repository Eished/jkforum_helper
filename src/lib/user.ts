import { IUser, Mood } from '@/commonType';
import { isSameObjKey, mergeObjValue, updateUserUrl } from '@/utils/tools';
import { MessageBox, setFastReply } from './';

class User implements IUser {
  username: string;
  formhash: string;
  constructor(username: string, formhash: string) {
    this.username = username;
    this.formhash = formhash;
  }

  version = GM_info.script.version;
  today = ''; // 签到日期
  signtime = '23:59:59'; // 定时签到时间
  signNum = 10; // 定时签到重试次数
  interTime = 200; // 定时签到重试间隔时间ms
  todaysay = '簽到'; // 签到输入内容
  mood = Mood.fendou; // 签到心情
  autoPlayDiff = 2000; // 自动播放图片间隔时间ms
  autoPaySw = true; // 自动支付开关
  autoThkSw = true; // 自动感谢开关
  autoRePicSw = true; // 自动加载原图开关
  differ = 10000; // 回帖随机间隔时间ms
  interval = 20000; // 回帖基础间隔时间ms
  thkDiffer = 1000; // 批量感谢间隔时间ms
  limit = 2; // 并发下载图片数量限制
  page = ''; // 批量回帖页码
  token = ''; // ORC token
  freeTime = 3300000; // 现在有空间隔
  freeTid = ''; // 自动现在有空 帖子ID，一个账号一个贴子
  votedMessage = '+1'; // 投票输入内容
  orcUrl = 'https://jkf.iknow.fun/api/orc'; // accurate_basic or general_basic 精准或普通 api
  votedUrl = 'https://www.jkforum.net/plugin.php?';
  applyVotedUrl = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';
  taskDoneUrl = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';
  signUrl = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1';
  thkUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1';
  payUrl = 'https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1';
  fastReplyUrl = 'https://www.jkforum.net/thread-8364615-1-1.html';
  replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&';
  greasyforkUrl = 'https://greasyfork.org/zh-CN/scripts/427246';
  userReplyMessage = []; // 用户保存的回复，历史回帖内容
  fastReply = []; // 保存的快速回复，快速回帖内容
  replyThreads = []; // 回帖任务数据
}

const getUserName = () => {
  return document.querySelector('.avatar_info a')?.innerHTML;
};

const getUserFromName = (): IUser | null => {
  const userName = getUserName();
  return userName ? GM_getValue(userName) : null;
};

const getFormhash = () => {
  return new URLSearchParams((document.querySelector('.listmenu li a') as HTMLLinkElement | null)?.href).get(
    'formhash'
  );
};

const creatUser = async (username: string, formhash: string) => {
  let user = GM_getValue<IUser>(username);
  const userMod = new User(username, formhash);
  if (!user) {
    // 空则写入，或版本变动写入
    user = userMod;
    user = await setFastReply(user); // 设置快速回复
    GM_setValue(username, user);
    new MessageBox('添加用户成功！');
  } else if (user.version !== GM_info.script.version) {
    const compa = isSameObjKey(userMod, user); // 比较key
    // 更新所有 Url 参数
    user = updateUserUrl(user, userMod); // new对User赋值
    // key相同 只改变版本
    user.version = GM_info.script.version; // 记录新版本
    if (!compa) {
      // key不同
      user = mergeObjValue(userMod, user); // new对User赋值
      new MessageBox('数据更新成功！');
    }
    user = await setFastReply(user); // 设置快速回复
    GM_setValue(username, user);
    new MessageBox('版本更新成功！请阅读使用说明。');
  }
  if (user.formhash !== formhash) {
    // formhash 变动存储
    user.formhash = formhash;
    GM_setValue(username, user);
  }
  return user;
};

export { User, getUserName, getUserFromName, getFormhash, creatUser };
