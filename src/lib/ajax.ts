/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericObject, Importance, XhrMethod, XhrOptions, XhrResponseType } from '@/commonType';
import { turnCdata } from '@/utils/tools';
import { MessageBox } from './';

// GM_xmlhttpRequest GET异步通用模块
function getData(
  url: string,
  type: XhrResponseType = XhrResponseType.DOCUMENT,
  usermethod: XhrMethod = XhrMethod.GET
): Promise<Document> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: usermethod,
      url: url,
      responseType: type,
      timeout: 5 * 60 * 1000,
      onload: function (response) {
        if (response.status >= 200 && response.status < 400) {
          resolve(response.response);
        } else {
          reject(response);
        }
      },
      onerror: function (error) {
        new MessageBox('网络错误');
        reject(error);
      },
      ontimeout: () => {
        new MessageBox('网络超时', 'none', Importance.LOG_POP_GM);
        reject('timeout');
      },
    });
  });
}

function postDataCdata(
  url: string,
  postData: string,
  responseType: XhrResponseType = XhrResponseType.DOCUMENT,
  usermethod: XhrMethod = XhrMethod.POST,
  contentType: XhrResponseType = XhrResponseType.FORM
): Promise<Document | string> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: usermethod,
      url: url,
      headers: {
        'Content-Type': contentType,
      },
      data: postData,
      responseType: responseType,
      timeout: 1 * 60 * 1000,
      onload: function (response) {
        if (response.status >= 200 && response.status < 400) {
          resolve(turnCdata(response.response));
        } else {
          new MessageBox('请求错误：' + response.status);
          reject(response.status);
        }
      },
      onerror: function (error) {
        new MessageBox('网络错误');
        reject(error);
      },
      ontimeout: () => {
        new MessageBox('网络超时', 'none', Importance.LOG_POP_GM);
        reject('timeout');
      },
    });
  });
}

// 正常的post
function postData(
  url: string,
  data?: string,
  {
    responseType = XhrResponseType.DOCUMENT,
    usermethod = XhrMethod.POST,
    contentType = XhrResponseType.FORM,
    authorization,
    cookie,
  }: XhrOptions = {
    responseType: XhrResponseType.DOCUMENT,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }
): Promise<any> {
  const headers: GenericObject = {
    'content-type': contentType,
  };
  if (authorization) {
    headers.authorization = authorization;
  }
  if (cookie) {
    headers.cookie = cookie;
  }
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: usermethod,
      url,
      headers,
      data,
      responseType: responseType,
      timeout: 1 * 60 * 1000,
      onload: function (response) {
        if (response.status >= 200 && response.status < 400) {
          resolve(response.response);
        } else {
          reject(response);
        }
      },
      onerror: function (error) {
        reject(error);
      },
      ontimeout: () => {
        new MessageBox('网络超时', 'none', Importance.LOG_POP_GM);
        reject('timeout');
      },
    });
  });
}

export { getData, postData, postDataCdata };
