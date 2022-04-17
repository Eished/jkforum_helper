// 自动播放图片
async function autoPlay() {
  const append_parent = document.querySelector('#append_parent'); // 监听子节点
  if (append_parent.timer) {
    // 防重复点击、添加
    return;
  }
  append_parent.timer = 1; // 已添加标志

  function callback() {
    // 监听元素子节点变化，然后添加节点
    const imgzoom_y = document.querySelector('#imgzoom .y');
    if (imgzoom_y) {
      // 按钮也是延迟加载，监听是否有 .y
      observer.disconnect(); // 断开监听
      addAutoPlay(); // 添加按钮
    }
  }
  const observer = new MutationObserver(callback); // 建立监听器
  observer.observe(append_parent, {
    // 开始监听 append_parent
    childList: true,
  });
}
// 添加播放图片按钮、事件
function addAutoPlay() {
  const append_parent = document.querySelector('#append_parent'); // 监听子节点
  const imgzoom = append_parent.querySelector('#imgzoom');
  const imgzoom_cover = append_parent.querySelector('#imgzoom_cover');
  const y = imgzoom.querySelector('.y');

  const a = document.createElement('a');
  a.title = '自动播放/停止播放';
  a.innerHTML = '自动播放/停止播放';
  a.href = 'javascript:void(0);';
  a.addEventListener('click', play); // 添加监听播放事件
  a.style.cssText = `background: url(../../template/yibai_city1/style/common/arw_l.gif) rgb(241, 196, 15) center no-repeat;transform: rotate(180deg);width: 60px;height: 18px;overflow: hidden;`;
  y.prepend(a); // 添加按钮

  // 遮挡暂停
  window.onblur = function () {
    a.timer = 0;
  };
  // 点击背景层暂停
  imgzoom_cover.addEventListener('click', () => {
    a.timer = 0;
  });
  // 关闭按钮暂停
  y.querySelector('.imgclose').addEventListener('click', () => {
    a.timer = 0;
  });

  async function play() {
    if (!a.timer && !a.observer) {
      // 再次点击暂停，只运行一个监听器
      a.timer = 1;
      const imgzoom_waiting = append_parent.querySelector('#imgzoom_waiting');
      const zimg_next = imgzoom.querySelector('.zimg_next'); // 是否有下一张
      if (!zimg_next) {
        a.timer = 0;
        new MessageBox('只有一张图！');
        return;
      }

      a.observer = new MutationObserver(callback);
      a.observer.observe(imgzoom_waiting, {
        attributes: true,
      });

      async function callback() {
        const display = imgzoom_waiting.style.display;
        if (display == 'none') {
          await waitFor(user.autoPlayDiff); // 延迟，然后判断是否停止
          if (a.timer == 0) {
            a.observer.disconnect();
            a.observer = null; // disconnect()并没有清空监听器
            return;
          }
          imgzoom.querySelector('.zimg_next').click(); // 刷新NodeList
        }
      }
      // 开始点击下一张
      await waitFor(user.autoPlayDiff);
      zimg_next.click();
    } else {
      a.timer = 0;
    }
  }
}
