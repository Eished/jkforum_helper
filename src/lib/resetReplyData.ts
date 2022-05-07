import { IUser } from '@/commonType';
import { MessageBox } from './message';

const resetReplyData = (user: IUser) => {
  user.replyThreads = [];
  user.fastReply = [];
  user.userReplyMessage = [];
  GM_setValue(user.username, user);
  new MessageBox('重置回帖数据成功');
};

export { resetReplyData };
