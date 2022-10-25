import { GenericObject, IUser } from '@/commonType';
import { checkHtml, urlSearchParams } from '@/utils/tools';
import { MessageBox, postDataCdata } from './';

// 自动感谢
async function autoThk(user: IUser) {
  const forms = document.forms as unknown as Document & GenericObject;
  if (!forms?.thankform) {
    return;
  }
  const thankform = forms.thankform;
  const thkParamsData = urlSearchParams({
    formhash: user.formhash,
    tid: thankform.tid.value,
    touser: thankform.touser.value,
    touseruid: thankform.touseruid.value,
    handlekey: 'k_thankauthor',
    addsubmit: 'true',
  }).toString();
  const xmlData = await postDataCdata(user.thkUrl, thkParamsData); //post感谢数据
  if (xmlData && checkHtml(xmlData)) {
    const info = (xmlData as Document).querySelector('.alert_info')?.innerHTML.split('<')[0].trim(); //去除html，返回字符串
    new MessageBox(info);
  } else {
    new MessageBox(xmlData as string); //其它情况直接输出
  }

  if (document.querySelectorAll('#k_thankauthor').length == 2) {
    //感谢可见
    location.reload();
  }
}

export { autoThk };
