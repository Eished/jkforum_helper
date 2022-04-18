interface IUser {
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
  arraybuffer = 'arraybuffer',
  blob = 'blob',
  json = 'json',
  text = 'text',
  document = 'document',
  form = 'application/x-www-form-urlencoded',
}

type XhrOptions = {
  responseType: XhrResponseType;
  usermethod: XhrMethod;
  contentType: XhrResponseType;
};

const enum ReplyOrThank {
  reply = 'reply',
  thank = 'thk',
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

export { Counter, XhrMethod, XhrResponseType, XhrOptions, ReplyOrThank, Thread, ForumThreads, IUser, ReplyParams };
