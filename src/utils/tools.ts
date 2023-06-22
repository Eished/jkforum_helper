import { GenericObject, IUser } from '@/commonType';
import { MessageBox } from '@/lib';

// POST返回 xml数据类型转换成 字符串或html 模块
function turnCdata(xmlRepo: Document) {
  const data = xmlRepo.querySelector('root')?.textContent;
  if (!data) return '';
  // 如果判断去掉html是否还有文字，否则返回html
  if (replaceHtml(data)) {
    return replaceHtml(data); // 去掉html内容，返回文字
  } else {
    const domParser = new DOMParser();
    const htmlData = domParser.parseFromString(data, 'text/html');
    return htmlData;
  }
}

// URL 参数添加器
function urlSearchParams(object: { [x: string]: string | number }) {
  const searchParamsData = new URLSearchParams();
  for (const key in object) {
    searchParamsData.append(key, String(object[key]));
  }
  return searchParamsData;
}

// 编码统一资源定位符模块
function turnUrl(data: string, type?: boolean) {
  if (type) {
    return decodeURI(data);
  } else {
    return encodeURI(data);
  }
}

// 判断html和字符串是不是html
function checkHtml(htmlStr: string | Document): htmlStr is Document {
  if (htmlStr instanceof Document) {
    return true;
  } else {
    const reg = /<[^>]+>/g;
    return reg.test(htmlStr);
  }
}

// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt: string) {
  const reg3 = /[\r|\n|\b|\f|\t|\v]+/g; //去掉特殊符号
  const reg = /<.+>/g; //去掉所有<>内内容
  // 先reg3,\n特殊符号会影响reg的匹配
  return txt.replace(reg3, '').replace(reg, '').trim();
}

// promise 等待模块
const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

// n, m 范围随机整数生成
function rdNum(n: number, m: number) {
  const c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}
class NowTime {
  day: string;
  seconds: string;
  date: Date;
  constructor() {
    const date = new Date();
    this.day = date.toLocaleDateString();
    this.seconds = date.toTimeString().split(' ')[0];
    this.date = date;
  }
}

// 比较键
function isSameObjKey(source: IUser, target: IUser) {
  if (Object.keys(target).length === Object.keys(source).length) {
    // 用户数据匹配
    for (const key of Object.keys(source)) {
      // https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// 赋值对象的值
function mergeObjValue(target: IUser & GenericObject, source: IUser & GenericObject): IUser {
  Object.keys(source).forEach((key) => {
    if (source[key] && Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = source[key];
    }
  });
  return target;
}

// 更新User对象的URL值，自动有空间隔时间
function updateUserUrl(target: IUser & GenericObject, source: IUser & GenericObject): IUser {
  Object.keys(source).forEach((key) => {
    if (key.includes('Url') || key === 'freeTime') {
      target[key] = source[key];
    }
  });
  return target;
}

/**
 * 生成不重复的ID
 * @param { Number } randomLength
 */
function getUuiD(randomLength: number) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}

const getVersionNum = (ver: string): number => {
  return Number(ver.replace(/\./g, ''));
};

const getTid = (url: string) => {
  let tid: string | null = url.split('-')[1];
  if (!tid) {
    tid = new URLSearchParams(url).get('tid'); // 用于获取分类贴链接下的 tid
    if (!tid) {
      new MessageBox('没有找到Tid: ' + url);
      throw new Error('没有找到Tid: ' + url);
    }
  }
  return tid;
};

const preciseSetInterval = (handler: () => void, delay: number, timeout = 0) => {
  let baseTime = Date.now();
  const callHandler = () => {
    if (Math.abs(Date.now() - baseTime) <= delay + timeout) {
      baseTime = Date.now();
      handler();
    }
  };
  return window.setInterval(callHandler, delay);
};

const preciseSetTimeout = (handler: () => void, delay: number, timeout = 0) => {
  let baseTime = Date.now();
  const callHandler = () => {
    if (Math.abs(Date.now() - baseTime) <= delay + timeout) {
      baseTime = Date.now();
      handler();
    }
  };
  return window.setTimeout(callHandler, delay);
};

function hoursUntilTimeRange(startHour: number, endHour: number) {
  const date = new Date();
  const currentHour = date.getHours();

  if (startHour <= endHour) {
    // 范围在同一天的情况
    if (currentHour >= startHour && currentHour <= endHour) {
      return 0;
    } else if (currentHour < startHour) {
      return startHour - currentHour;
    } else {
      return 24 - currentHour + startHour;
    }
  } else {
    // 范围跨越两天的情况
    if (currentHour >= startHour || currentHour <= endHour) {
      return 0;
    } else {
      return startHour - currentHour;
    }
  }
}

export {
  NowTime,
  checkHtml,
  getTid,
  getUuiD,
  getVersionNum,
  hoursUntilTimeRange,
  isSameObjKey,
  mergeObjValue,
  preciseSetInterval,
  preciseSetTimeout,
  rdNum,
  replaceHtml,
  turnCdata,
  turnUrl,
  updateUserUrl,
  urlSearchParams,
  waitFor,
};
