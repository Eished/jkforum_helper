import { GenericObject, IUser, PostData, XhrMethod, XhrResponseType } from '@/commonType';
import { urlSearchParams } from '@/utils/tools';
import { postData } from './ajax';
import { MessageBox } from './message';

export const autoPost = async (user: IUser) => {
  if (user.posts?.length) {
    if (confirm('已有历史文章，是否使用历史文章发文')) {
      if (!user.posts?.length) {
        return alert('没有读取到文章');
      }
      const post = user.posts[user.posts.length - 1];
      await newThread(post, user.formhash);
      return;
    }
  }
  if (!location.href.includes('mod=post&action=newthread')) {
    return alert(
      '请进入发表文章页面，输入好文章后再点击自动发文，第一次发文后会保存，之后发文无需再次进入发表文章页面'
    );
  }
  const form = document.querySelector('#postform') as unknown as Document & GenericObject;
  if (!form) {
    return alert('未找到发帖输入框');
  }
  const inputTime = prompt('请输入回帖间隔时间（单位分钟，默认361分钟）', '361');

  if (!Number.isInteger(Number(inputTime))) {
    return alert('时间未输入或者数值错误');
  }
  if (!form.message.value || !form.message.value) {
    return alert('请输入文章内容');
  }
  const newPost = {
    typeid: form.typeid.value,
    subject: form.subject.value,
    message: form.message.value,
    allownoticeauthor: form.allownoticeauthor.value,
    postUrl: location.href + '&extra=&topicsubmit=yes',
    postTime: Number(inputTime) * 60 * 1000,
  };
  if (!user.posts) {
    user.posts = [];
  }
  user.posts.push(newPost);
  GM_setValue(user.username, user); //保存当天日// today 初始化
  await newThread(newPost, user.formhash);
};

const newThread = async (post: PostData, formhash: string) => {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const data = urlSearchParams({
    formhash: formhash,
    posttime: currentUnixTimestamp,
    wysiwyg: '1',
    typeid: post.typeid, // 地址
    subject: post.subject, // 标题
    message: post.message, // 文章内容
    accept_checkbox: 'on',
    'localid[]': 1,
    'imglocalid[]': 1,
    uploadalbum: -2,
    usesig: 1,
    allownoticeauthor: post.allownoticeauthor,
  }).toString();
  try {
    const res = await postData(post.postUrl, data, {
      responseType: XhrResponseType.DOCUMENT,
      usermethod: XhrMethod.POST,
      contentType: XhrResponseType.FORM,
    });
    const msg = res?.querySelector('#messagetext p')?.textContent;
    if (msg) {
      new MessageBox(msg);
    } else {
      new MessageBox(`发文成功，到设置时间（${post.postTime / 1000 / 60}分钟）后将会再次自动发表文章`);
      setTimeout(() => {
        newThread(post, formhash);
      }, post.postTime);
    }
  } catch (error) {
    new MessageBox('发文失败：' + JSON.stringify(error));
  }
};
