import { AutoPlayCounter, IUser } from '@/commonType';
import { waitFor } from '@/utils/tools';
import { MessageBox } from './';

const addPlayEvent = (counter: AutoPlayCounter, user: IUser) => {
  const zoomimgs = document.querySelectorAll(`img[zoomfile]`); //获取图片列表
  if (zoomimgs) {
    // 自动播放
    for (let i = 0; i < zoomimgs.length; i++) {
      //遍历图片列表
      zoomimgs[i].addEventListener(
        'click',
        () => {
          autoPlay(counter, user);
        },
        {
          once: true,
        }
      );
    }
  }
  const onclickzoomimgs = document.querySelectorAll(`img[onclick="zoom(this, this.src, 0, 0, 0)"]`); //获取图片列表
  if (onclickzoomimgs) {
    // 自动播放
    for (let i = 0; i < onclickzoomimgs.length; i++) {
      //遍历图片列表
      onclickzoomimgs[i].addEventListener(
        'click',
        () => {
          autoPlay(counter, user);
        },
        {
          once: true,
        }
      );
    }
  }
};

// 自动播放图片
async function autoPlay(counter: AutoPlayCounter, user: IUser) {
  const append_parent = document.querySelector('#append_parent'); // 监听子节点
  if (counter.playBtn || !append_parent) {
    // 防重复点击、添加
    return;
  }
  counter.playBtn = 1; // 已添加标志

  const observer = new MutationObserver(() => {
    // 监听元素子节点变化，然后添加节点
    const imgzoom_y = document.querySelector('#imgzoom .y');
    if (imgzoom_y) {
      // 按钮也是延迟加载，监听是否有 .y
      observer.disconnect(); // 断开监听
      addAutoPlay(counter, user); // 添加按钮
    }
  }); // 建立监听器
  observer.observe(append_parent, {
    // 开始监听 append_parent
    childList: true,
  });
}
// 添加播放图片按钮、事件
function addAutoPlay(counter: AutoPlayCounter, user: IUser) {
  const append_parent = document.querySelector('#append_parent');
  if (!append_parent) return;
  const imgzoom = append_parent.querySelector('#imgzoom');
  const imgzoom_cover = append_parent.querySelector('#imgzoom_cover');
  if (!imgzoom) return;
  const y = imgzoom.querySelector('.y');

  const a = document.createElement('a');
  a.title = '自动播放/停止播放';
  a.innerHTML = '自动播放/停止播放';
  a.href = 'javascript:void(0);';
  a.addEventListener('click', play); // 添加监听播放事件
  a.style.cssText = `background: url(../../template/yibai_city1/style/common/arw_l.gif) rgb(241, 196, 15) center no-repeat;transform: rotate(180deg);width: 60px;height: 18px;overflow: hidden;`;
  if (!y) return;
  y.prepend(a); // 添加按钮

  // 遮挡暂停
  window.onblur = function () {
    counter.playFlag = 0;
  };
  // 点击背景层暂停
  imgzoom_cover?.addEventListener('click', () => {
    counter.playFlag = 0;
  });
  // 关闭按钮暂停
  y.querySelector('.imgclose')?.addEventListener('click', () => {
    counter.playFlag = 0;
  });

  async function play() {
    if (!counter.playFlag && !counter.playObserver) {
      // 再次点击暂停，只运行一个监听器
      counter.playFlag = 1;
      const imgzoom_waiting = append_parent?.querySelector('#imgzoom_waiting') as HTMLDivElement;
      const zimg_next = imgzoom?.querySelector('.zimg_next'); // 是否有下一张
      if (!zimg_next || !imgzoom_waiting) {
        counter.playFlag = 0;
        new MessageBox('只有一张图！');
        return;
      }

      counter.playObserver = new MutationObserver(async () => {
        const display = imgzoom_waiting.style.display;
        if (display == 'none') {
          await waitFor(user.autoPlayDiff); // 延迟，然后判断是否停止
          if (counter.playFlag == 0 && counter.playObserver) {
            counter.playObserver.disconnect();
            counter.playObserver = undefined; // disconnect()并没有清空监听器
            return;
          }
          (imgzoom?.querySelector('.zimg_next') as HTMLDivElement)?.click(); // 刷新NodeList
        }
      });
      counter.playObserver.observe(imgzoom_waiting, {
        attributes: true,
      });

      // 开始点击下一张
      await waitFor(user.autoPlayDiff);
      (zimg_next as HTMLDivElement).click();
    } else {
      counter.playFlag = 0;
    }
  }
}

export { autoPlay, addPlayEvent };
