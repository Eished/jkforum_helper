import { urlSearchParams, checkHtml } from '@/utils/tools';
import { getData, MessageBox, postDataCdata } from './';
import { IUser } from '@/commonType';

async function autoVoted(user: IUser) {
  await getData(user.applyVotedUrl); // 申请任务
  const msId = new MessageBox('申请投票任务执行成功！正在投票请勿退出页面...', 'none');
  // 投票请求链接
  const votedUrlParams = urlSearchParams({
    id: 'voted',
  }).toString();
  const htmlData = await getData(user.votedUrl + votedUrlParams);
  const vidUrl = (htmlData.querySelector('.voted a') as HTMLAnchorElement)?.href; // 找到链接
  const vid = vidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接

  const hrefHtmlData = await getData(vidUrl);
  const aidUrl = (hrefHtmlData.querySelector('.hp_s_c a') as HTMLAnchorElement).href; // 找到链接
  const aid = aidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接
  // 投票请求链接数据
  const votedParams = urlSearchParams({
    id: 'voted',
    ac: 'dian',
    aid: aid,
    vid: vid,
    qr: '',
    inajax: 1,
  }).toString();
  // Post 数据
  const votedParamsData = urlSearchParams({
    formhash: user.formhash,
    inajax: 1,
    handlekey: 'dian',
    sid: 0,
    message: user.votedMessage,
  }).toString();
  // 投票
  const votedMessage = await postDataCdata(user.votedUrl + votedParams, votedParamsData);
  if (checkHtml(votedMessage)) {
    const votedDom = votedMessage as Document;
    let info: string | undefined = '';
    const alertInfo = votedDom.querySelector('.alert_info');
    const script = votedDom.querySelector('script');
    if (alertInfo) {
      info = alertInfo.innerHTML; // 解析html，返回字符串，失败警告
      new MessageBox(info);
    } else if (script) {
      info = script.innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
      new MessageBox(info);
      await getData(user.taskDoneUrl); // 执行领奖励
      new MessageBox('领取投票奖励成功！');
    }
  } else {
    new MessageBox(votedMessage as string); //其它情况直接输出
  }
  msId.remove();
  GM_setValue(user.username, user); //保存当天日// today 初始化
}

export { autoVoted };
