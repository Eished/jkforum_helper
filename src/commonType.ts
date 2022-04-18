type Counter = {
  signBtn: number;
  playBtn: number;
  playSign: number;
  playObserver?: MutationObserver;
  downloadBtn: number;
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

export { Counter, XhrMethod, XhrResponseType, XhrOptions };
