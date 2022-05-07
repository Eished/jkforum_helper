import { checkHtml, urlSearchParams } from '@/utils/tools';
import { MessageBox, postDataCdata } from './';
import { IUser, GenericObject } from '@/commonType';

// 自动感谢
async function autoThk(user: IUser) {
  const forms = document.forms as unknown as Document & GenericObject;
  if (!forms?.thankform) {
    // 没有感谢
    return;
  }
  if (document.querySelectorAll('#k_thankauthor').length == 2) {
    //感谢可见
    await postAutoThk(forms.thankform, user);
    location.reload();
  } else {
    //普通贴
    await postAutoThk(forms.thankform, user);
  }
}
// 发送感谢请求
async function postAutoThk(
  thankform: { tid: { value: any }; touser: { value: any }; touseruid: { value: any } },
  user: IUser
) {
  const thkParamsData = urlSearchParams({
    formhash: user.formhash,
    tid: thankform.tid.value,
    touser: thankform.touser.value,
    touseruid: thankform.touseruid.value,
    handlekey: 'k_thankauthor',
    addsubmit: 'true',
  }).toString();
  const xmlData = (await postDataCdata(user.thkUrl, thkParamsData)) as string; //post感谢数据
  if (xmlData && checkHtml(xmlData)) {
    const info = (xmlData as unknown as HTMLBodyElement).querySelector('.alert_info')?.innerHTML.split('<')[0].trim(); //去除html，返回字符串
    new MessageBox(info);
  } else {
    new MessageBox(xmlData); //其它情况直接输出
  }
}

export { autoThk, postAutoThk };
