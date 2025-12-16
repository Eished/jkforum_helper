import { IUser, Mood } from '@/commonType';
import { isSameObjKey, mergeObjValue, updateUserUrl } from '@/utils/tools';
import { MessageBox, setFastReply } from './';

class User implements IUser {
  uid: string;
  username: string;
  formhash: string;
  constructor(uid: string) {
    this.username = 'username';
    this.formhash = 'formhash';
    this.uid = uid;
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
  autoDailyTask = false; // 定时每日任务开关
  differ = 10000; // 回帖随机间隔时间ms
  interval = 20000; // 回帖基础间隔时间ms
  thkDiffer = 1000; // 批量感谢间隔时间ms
  limit = 2; // 并发下载图片数量限制
  page = ''; // 批量回帖页码
  token = ''; // OCR token
  freeTime = 3300000; // 现在有空间隔
  freeTid = ''; // 自动现在有空 帖子ID，一个账号一个贴子
  freeData = [];
  votedMessage = '+1'; // 投票输入内容
  ocrUrl = 'https://jkf.iknow.fun/api/ocr/numbers';
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

const getUserName = (): string | null => {
  const root = (document.querySelector('[data-logged-in="true"]') as Element) || document.body;
  if (!root) return null;

  const isLikelyUsername = (s?: string) => {
    if (!s) return false;
    const t = s.trim();
    if (t.length < 2 || t.length > 64) return false;
    return /^[\p{L}\p{N}_\-.]{2,64}$/u.test(t);
  };

  // 1) explicit link to personalize page (existing, but prefer textContent)
  const personalize = root.querySelector('[href="/setting/personalize"]');
  if (personalize) {
    const txt = (personalize.textContent || '').trim();
    if (isLikelyUsername(txt)) return txt;
    // sometimes username is in a sibling span
    const sib = personalize
      .closest('[data-logged-in="true"]')
      ?.querySelector('span.text-3.font-600, span.font-600, span.text-3');
    const s2 = sib ? (sib.textContent || '').trim() : '';
    if (isLikelyUsername(s2)) return s2;
  }

  // 2) try class-based candidates near login root
  const classCandidates = root.querySelectorAll(
    'span[class*="user"], span[class*="name"], span[class*="font-600"], span[class*="font-semibold"], a[class*="user"]'
  );
  for (const el of Array.from(classCandidates)) {
    const t = (el.textContent || '').trim();
    if (isLikelyUsername(t)) return t;
  }

  // 3) avatar nearby text
  const avatar = root.querySelector('img[alt="Avatar"], img[src*="/avatar/"], img[class*="avatar"]');
  if (avatar) {
    const container = avatar.closest('[data-logged-in="true"]') || avatar.parentElement;
    if (container) {
      const anchors = container.querySelectorAll('a, span, div');
      for (const a of Array.from(anchors)) {
        const t = (a.textContent || '').trim();
        if (isLikelyUsername(t)) return t;
      }
    }
  }

  // 4) fallback: first visible short text node that looks like a username
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  let node: Node | null = null;
  while ((node = walker.nextNode())) {
    const txt = (node.nodeValue || '').trim();
    if (!txt) continue;
    if (txt.includes(' ')) continue;
    if (!isLikelyUsername(txt)) continue;
    const parent = node.parentElement;
    if (!parent) continue;
    const style = window.getComputedStyle(parent);
    const visible =
      parent.getClientRects().length > 0 &&
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      parent.offsetParent !== null;
    if (visible) return txt;
  }

  return null;
};

// Watch username changes in SPA environments. Returns a disposer to stop observing.
const watchUserName = (onChange: (name: string | null) => void) => {
  let last: string | null = null;
  const check = () => {
    const u = getUserName();
    if (u !== last) {
      last = u;
      try {
        onChange(u);
      } catch (e) {
        // ignore callback errors
      }
    }
  };
  check();
  const root = document.querySelector('[data-logged-in="true"]') || document.body;
  const mo = new MutationObserver(() => check());
  mo.observe(root as Node, { childList: true, subtree: true, characterData: true });
  return () => mo.disconnect();
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

const creatUser = async (uid: string) => {
  let user = GM_getValue<IUser>(uid);
  const userMod = new User(uid);
  if (!user) {
    // 空则写入，或版本变动写入
    user = userMod;
    // user = await setFastReply(user); // 设置快速回复
    GM_setValue(uid, user);
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
    GM_setValue(uid, user);
    new MessageBox('版本更新成功！请阅读使用说明。');
  }

  return user;
};

export { User, creatUser, getFormhash, getUserFromName, getUserName, watchUserName };
