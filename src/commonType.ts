/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThreadData } from './views/AutoClickManage';

export enum Mood {
  kaixin = 'kx', // 开心,
  nanguo = 'ng', // 难过,
  yumen = 'ym', // 郁闷,
  wuliao = 'wl', // 无聊,
  fennu = 'nu', // 怒,
  cahan = 'ch', // 擦汗,
  fendou = 'fd', // 奋斗,
  yonglan = 'yl', // 慵懒,
  shuai = 'shuai', // 衰,
}
interface IUser {
  username: string;
  formhash: string;
  version: string;
  today: string;
  signtime: string;
  signNum: number;
  interTime: number;
  todaysay: string;
  mood: Mood;
  autoPlayDiff: number;
  autoPaySw: boolean;
  autoThkSw: boolean;
  autoRePicSw: boolean;
  differ: number;
  interval: number;
  thkDiffer: number;
  limit: number;
  page: string;
  token: string;
  freeTime: number;
  freeTid: string;
  freeData: ThreadData[];
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
  userReplyMessage: string[];
  fastReply: string[];
  replyThreads: ForumThreads[];
}

type Counter = {
  signBtn: number;
  playBtn: number;
  playFlag: number;
  playObserver?: MutationObserver;
  downloadBtn: number;
  replyBtn: number;
  thkBtn: number;
};

const enum XhrMethod {
  POST = 'POST',
  GET = 'GET',
}

const enum XhrResponseType {
  ARRAYBUFFER = 'arraybuffer',
  BLOB = 'blob',
  JSON = 'json',
  TEXT = 'text',
  DOCUMENT = 'document',
  FORM = 'application/x-www-form-urlencoded',
  GRCP = 'application/grpc-web-text',
}

type XhrOptions = {
  responseType?: XhrResponseType;
  usermethod?: XhrMethod;
  contentType?: XhrResponseType;
  authorization?: string;
  cookie?: string;
};

const enum ReplyOrThank {
  REPLY = 'reply',
  THANK = 'thk',
}

type Thread = {
  tid: string;
  touseruid: string;
  touser: string;
  replyIndex: number;
  replyLen: number;
  randomTime: number;
};

type ForumThreads = {
  fid: string;
  fidTime: number;
  fidRepIndex: number;
  fidThkIndex: number;
  fidthreads: Thread[];
};

type ReplyParams = {
  message: string;
  posttime: string;
  formhash: string;
  usesig: number;
  subject: string;
};

interface GenericObject {
  [key: string]: any;
}

type exportType = { default: () => void } & GenericObject;

const enum IMPORTANCE {
  LOG_POP = 1,
  LOG_POP_GM = 2,
  POP = 3,
}

export {
  Counter,
  XhrMethod,
  XhrResponseType,
  XhrOptions,
  ReplyOrThank,
  Thread,
  ForumThreads,
  IUser,
  ReplyParams,
  GenericObject,
  exportType,
  IMPORTANCE,
};
