import { replaceHtml } from '@/utils/tools';
import { getData } from './ajax';
import { MessageBox } from './message';
import { IUser } from './user';

async function setFastReply(user: IUser) {
  // 设置快速回复
  try {
    const htmlData = (await getData(user.fastReplyUrl)) as HTMLBodyElement;
    const options = htmlData.querySelectorAll('#rqcss select option') as NodeListOf<HTMLOptionElement>;
    let fastReply: string[] = []; //返回数组
    if (options.length) {
      options.forEach((option) => {
        if (option.value) {
          //去掉空值
          fastReply.push(replaceHtml(option.value)); //去掉需要转义的内容
        }
      });
    } else {
      new MessageBox('获取快速回复失败！');
      return user;
    }
    if (fastReply.length) {
      user.fastReply = fastReply;
      new MessageBox('获取快速回复成功！');
    } else {
      new MessageBox('获取快速回复失败！');
    }
    return user;
  } catch (e) {
    console.error(e);
    return user;
  }
}

export { setFastReply };
