import { IUser } from '@/commonType';
import { checkHtml, getTid, turnUrl } from '@/utils/tools';
import { MessageBox, postDataCdata } from './';

// 自动支付
async function autoPay(user: IUser) {
  if (document.querySelector('.viewpay')) {
    const url = user.payUrl;
    const referer = location.href;
    const pData = `formhash=${user.formhash}&referer=${turnUrl(referer)}&tid=${getTid(referer)}&handlekey=pay`;
    const stringOrHtml = await postDataCdata(url, pData);
    if (checkHtml(stringOrHtml)) {
      // 确认html
      const info = stringOrHtml.querySelector('script')?.innerHTML.split(`', `)[1].slice(1);
      new MessageBox(info);
      location.reload();
    } else {
      new MessageBox(stringOrHtml); //其它情况直接输出
    }
  }
}

export { autoPay };
