import { MessageBox } from './message';

// 加载原图，自动播放
async function loadOriginImage() {
  const tfImg: NodeListOf<HTMLImageElement> = document.querySelectorAll('.t_f ignore_js_op img'); //获取图片列表，附件也是ignore_js_op
  if (tfImg) {
    // 加载原图开关
    let count = 0;
    for (let i = 0; i < tfImg.length; i++) {
      //遍历图片列表
      const img = tfImg[i];
      img.setAttribute('onmouseover', ''); // 去掉下载原图提示
      const file = img.getAttribute('file');
      if (img.src.includes('.thumb.') && file) {
        // 去掉缩略图 加载部分
        img.src = file.split('.thumb.')[0];
        console.log('加载原图成功 thumb：', img.src);
        count++;
      } else if (img.src.includes('static/image/common/none.gif') && img.getAttribute('file')) {
        // 懒加载部分
        if (file?.includes('.thumb.')) {
          img.setAttribute('file', file.split('.thumb.')[0]); // 网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
          console.log('加载原图成功 none.gif:', img.getAttribute('file'));
          count++;
        }
      }
    }
    if (count) {
      new MessageBox(`加载原图成功 ${count} 张！`);
    }
  }
}

export { loadOriginImage };
