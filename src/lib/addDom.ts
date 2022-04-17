// 添加GUI
function addDom() {
  const WLHerf = location.href;
  const status_loginned = document.querySelector('.status_loginned');
  // 消息盒子
  MessageBox.genMessageBox();
  /* 
    1. 先判断是否在帖子页，是则添加并退出
    2. 是否在版块页，是则添加并退出
    3. 判断是否在首页，是则添加并退出
    */
  const reg = /.+forum\.php$/; // 正则判断是否是首页
  switch (true) {
    case WLHerf.includes('thread'): {
      // 下载按钮
      const repBtn = genButton('下载图片', downloadImgs);
      status_loginned.prepend(repBtn);
      // 屏蔽图片按钮
      const noDisplayBtn = genButton('屏蔽图片', noDisplayPic);
      status_loginned.prepend(noDisplayBtn);
      break;
    }
    case WLHerf.includes('id=dsu_paulsign:sign'): {
      // 定时签到按钮
      const btn = genButton('定时签到', timeControl);
      status_loginned.prepend(btn);
      break;
    }
    case WLHerf.includes('/forum-') || WLHerf.includes('/type-'): {
      //  || WLHerf.includes('mod=forum') 图片模式只有一个页面，不需要
      // 增加 visited 样式，图片模式已阅的帖子变灰色
      GM_addStyle(`.xw0 a:visited {color: grey;}`);
      // 去掉高亮标题
      if (document.querySelector('[style="color: #2B65B7"]')) {
        document.querySelectorAll('[style="color: #2B65B7"]').forEach((e) => {
          e.style = '';
        });
      }
      // 回帖输入框
      const input = genElem('textarea', 'inpreply', 1, 20);
      status_loginned.prepend(input);
      // 感谢 按钮
      const thkBtn = genButton('添加本页', thankOnePage);
      status_loginned.prepend(thkBtn);
      break;
    }
    case reg.test(WLHerf): {
      // 一次性添加，避免多次渲染
      const fragment = document.createDocumentFragment();
      // 回帖 按钮
      const repBtn = genButton('回帖', replyBtn);
      fragment.append(repBtn);
      // 感谢 按钮
      const thankBtn = genButton('感谢', thkBtn);
      fragment.append(thankBtn);
      // 回帖输入框
      const input = genElem('textarea', 'inpreply', 1, 20);
      fragment.append(input);
      // 页码输入框
      const page = genInp('input', 'inp_page');
      fragment.append(page);
      // 添加任务按钮
      const btn = genButton('添加任务', thankBatch);
      fragment.append(btn);
      status_loginned.prepend(fragment);
      break;
    }
    default:
      break;
  }
}
