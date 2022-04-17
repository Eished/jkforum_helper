// 自动支付
async function autoPay() {
  if (document.querySelector('.viewpay')) {
    const url = user.payUrl;
    const referer = location.href;
    let tid = referer.split('-')[1]; // 不同链接地址不同
    if (tid == undefined) {
      tid = new URLSearchParams(referer).get('tid'); // 用于获取分类贴链接下的 tid
    }
    const pData = `formhash=${user.formhash}&referer=${turnUrl(referer)}&tid=${tid}&handlekey=pay`;
    const stringOrHtml = await postDataCdata(url, pData);
    if (checkHtml(stringOrHtml)) {
      // 确认html
      const info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1);
      new MessageBox(info);
      location.reload();
    } else {
      new MessageBox(stringOrHtml); //其它情况直接输出
    }
  }
}

export { autoPay };
