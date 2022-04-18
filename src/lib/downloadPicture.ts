function downloadImgs() {
  if (this.timer > 0) {
    // 防重复点击
    return;
  } else {
    this.timer = 1;
  }
  let imgsUrls = []; // 图片下载链接
  let imgsTitles = []; // 图片名称
  const folderName = document.querySelector('.title-cont h1').innerHTML.trim().replace(/\.+/g, '-');
  const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
  if (pcbImg.length) {
    for (let i = 0; i < pcbImg.length; i++) {
      //遍历图片列表
      const img = pcbImg[i];
      if (img.title && img.getAttribute('file') && img.getAttribute('file').includes('mymypic.net')) {
        const reg = /\./g;
        if (!reg.test(img.title)) {
          // 文件格式校验
          if (reg.test(img.alt)) {
            // 文件格式修复
            img.title = img.alt;
          } else {
            new MessageBox('获取图片名失败！');
            this.timer = 0;
            return;
          }
        }
        const imgTitles = img.title.split('.');
        const title = `${imgTitles[imgTitles.length - 2]}-${i + 1}.${imgTitles[imgTitles.length - 1]}`; // 标题 +i.jpg，防重名！
        imgsTitles.push(title); // 保存下载名称到数组
        imgsUrls.push(img.getAttribute('file').split('.thumb.')[0]); // 保存下载链接到数组
      } else if (!img.getAttribute('file') && img.src.includes('mymypic.net')) {
        const nameSrc = img.src.split('/');
        imgsTitles.push(nameSrc[nameSrc.length - 1]); // 保存下载名称到数组
        imgsUrls.push(img.src.split('.thumb.')[0]); // 保存下载链接到数组
      } else {
        // console.log(img.src, '跨域请求，不可下载外链图片！');
        // new MessageBox('跨域请求，不可下载外链图片！');
      }
    }
    if (imgsUrls.length && imgsTitles.length) {
      batchDownload(imgsUrls, imgsTitles, folderName, this);
    } else {
      new MessageBox('没有可下载的图片！');
      this.timer = 0;
      return 0;
    }
  } else {
    new MessageBox('没有图片！');
    this.timer = 0;
    return 0;
  }
}

// 批量下载 顺序
function batchDownload(imgsUrls, imgsTitles, folderName, _this) {
  const zip = new JSZip();
  const promises = [];
  const mesIdH = new MessageBox('正在下载...', 'none'); // 永久消息
  const mesIdP = new MessageBox('...', 'none'); // 永久消息
  for (let index = 0; index < imgsUrls.length; index++) {
    const item = imgsUrls[index];
    // 包装成 promise
    const promise = () => {
      return new Promise(async (resolve) => {
        const file_name = imgsTitles[index]; // 获取文件名
        mesIdH.refreshMessage(`正在下载：第 ${index + 1} / ${imgsUrls.length} 张，文件名：${file_name}`);

        await getData(item, 'blob')
          .then((data) => {
            // 下载文件, 并存成ArrayBuffer对象
            zip.file(file_name, data, {
              binary: true,
            }); // 逐个添加文件
            mesIdP.refreshMessage(
              `第 ${index + 1} 张，文件名：${file_name}，大小：${parseInt(data.size / 1024)} Kb，下载完成！等待压缩...`
            );
            resolve();
          })
          .catch((err) => {
            // 移除消息；
            if (err.responseText) {
              const domParser = new DOMParser();
              const xmlDoc = domParser.parseFromString(err.responseText, 'text/html');
              mesIdP.refreshMessage(`第 ${index + 1} 张，请求错误：${xmlDoc.body.innerHTML}`);
            } else if (err.status) {
              console.error(err.status);
            } else {
              console.error(err);
            }
            resolve(-1); // 错误处理, 标记错误并返回
          });
      });
    };
    promises.push(promise);
  }
  const pool = new ConcurrencyPromisePool(user.limit);
  pool.all(promises).then((results) => {
    mesIdH.removeMessage();
    _this.timer = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] == -1) {
        // new MessageBox("文件缺失！")
        _this.timer++;
      }
    }
    if (results.length == _this.timer) {
      new MessageBox('全部图片下载失败！');
      _this.timer = 0;
      mesIdP.removeMessage();
      return;
    }
    if (_this.timer) {
      if (confirm(`检测到文件缺失 ${_this.timer} 张，是否继续压缩？`)) {
        _this.timer = 0;
      } else {
        _this.timer = 0;
        mesIdP.removeMessage();
        return;
      }
    }
    mesIdP.refreshMessage('正在压缩打包，大文件请耐心等待...');
    zip
      .generateAsync({
        type: 'blob',
      })
      .then((content) => {
        // 生成二进制流
        mesIdP.removeMessage();
        saveAs(content, `${folderName} [${imgsUrls.length}P]`); // 利用file-saver保存文件，大文件需等待很久
      });
  });
}

function noDisplayPic() {
  const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
  if (pcbImg.length) {
    for (let i = 0; i < pcbImg.length; i++) {
      //遍历图片列表
      const img = pcbImg[i];
      // 前10张
      if (img.title && img.getAttribute('file') && img.getAttribute('file').includes('mymypic.net')) {
        img.src = 'https://www.jkforum.net/static/image/common/none.gif';
        // new MessageBox("屏蔽图片成功");
        // 懒加载部分
        function callback() {
          // 监听元素子节点属性变化，然后屏蔽链接
          if (img.src != 'https://www.jkforum.net/static/image/common/none.gif') {
            observer.disconnect(); // 断开监听
            console.log('屏蔽图片成功：', img.src);
            img.src = 'https://www.jkforum.net/static/image/common/none.gif';
          }
        }
        const observer = new MutationObserver(callback); // 建立监听器
        observer.observe(img, {
          // 开始监听
          attributes: true,
        });
      }
    }
    new MessageBox('屏蔽图片完成！');
  }
}