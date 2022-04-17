// 加载原图，自动播放
async function rePic() {
  const tfImg = document.querySelectorAll('.t_f ignore_js_op img'); //获取图片列表，附件也是ignore_js_op
  if (tfImg && user.autoRePicSw) {
    // 加载原图开关
    let count = 0;
    for (let i = 0; i < tfImg.length; i++) {
      //遍历图片列表
      const img = tfImg[i];
      img.setAttribute('onmouseover', null); // 去掉下载原图提示
      if (img.src.includes('.thumb.')) {
        // 去掉缩略图 加载部分
        img.src = img.getAttribute('file').split('.thumb.')[0];
        console.log('加载原图成功 thumb：', img.src);
        count++;
      } else if (img.src.includes('static/image/common/none.gif') && img.getAttribute('file')) {
        // 懒加载部分
        if (img.getAttribute('file').includes('.thumb.')) {
          img.setAttribute('file', img.getAttribute('file').split('.thumb.')[0]); // 网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
          console.log('加载原图成功 none.gif:', img.getAttribute('file'));
          count++;
        }
      }
    }
    if (count) {
      new MessageBox(`加载原图成功 ${count} 张！`);
    }
  }
  const zoomimgs = document.querySelectorAll(`img[zoomfile]`); //获取图片列表
  if (zoomimgs) {
    // 自动播放
    for (let i = 0; i < zoomimgs.length; i++) {
      //遍历图片列表
      zoomimgs[i].addEventListener('click', autoPlay, {
        once: true,
      });
    }
  }
  const onclickzoomimgs = document.querySelectorAll(`img[onclick="zoom(this, this.src, 0, 0, 0)"]`); //获取图片列表
  if (onclickzoomimgs) {
    // 自动播放
    for (let i = 0; i < onclickzoomimgs.length; i++) {
      //遍历图片列表
      onclickzoomimgs[i].addEventListener('click', autoPlay, {
        once: true,
      });
    }
  }
}
