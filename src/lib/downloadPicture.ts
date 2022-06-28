import { Counter, IUser, XhrResponseType } from '@/commonType';
import { ConcurrencyPromisePool } from '@/utils/ConcurrencyPromisePool';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getData, MessageBox } from './';

function downloadImgs(user: IUser, counter: Counter, setCounter: (num: Counter) => void) {
  // 防重复点击
  setCounter({
    ...counter,
    downloadBtn: 1,
  });

  const imgsUrls: string[] = []; // 图片下载链接
  const imgsTitles = []; // 图片名称
  const foName = document.querySelector('.title-cont h1');
  if (!foName) return;
  const folderName = foName.innerHTML.trim().replace(/\.+/g, '-');
  const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
  if (pcbImg.length) {
    for (let i = 0; i < pcbImg.length; i++) {
      //遍历图片列表
      const img = pcbImg[i] as HTMLImageElement;
      if (img.title && img.getAttribute('file') && img.getAttribute('file')?.includes('mymypic.net')) {
        const reg = /\./g;
        if (!reg.test(img.title)) {
          // 文件格式校验
          if (reg.test(img.alt)) {
            // 文件格式修复
            img.title = img.alt;
          } else {
            new MessageBox('获取图片名失败！');
            setCounter({
              ...counter,
              downloadBtn: 0,
            });
            return;
          }
        }
        const imgTitles = img.title.split('.');
        const title = `${imgTitles[imgTitles.length - 2]}-${i + 1}.${imgTitles[imgTitles.length - 1]}`; // 标题 +i.jpg，防重名！
        imgsTitles.push(title); // 保存下载名称到数组
        const imgAtrrFile = img.getAttribute('file');
        imgAtrrFile && imgsUrls.push(imgAtrrFile.split('.thumb.')[0]); // 保存下载链接到数组
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
      batchDownload(imgsUrls, imgsTitles, folderName, user, counter, setCounter);
    } else {
      new MessageBox('没有可下载的图片！');
      setCounter({
        ...counter,
        downloadBtn: 0,
      });
      return 0;
    }
  } else {
    new MessageBox('没有图片！');
    setCounter({
      ...counter,
      downloadBtn: 0,
    });
    return 0;
  }
}

// 批量下载 顺序
function batchDownload(
  imgsUrls: string[],
  imgsTitles: string[],
  folderName: string,
  user: IUser,
  counter: Counter,
  setCounter: (num: Counter) => void
) {
  const zip = new JSZip();
  const promises: (() => Promise<number | void>)[] = [];
  const mesIdH = new MessageBox('正在下载...', 'none'); // 永久消息
  const mesIdP = new MessageBox('...', 'none'); // 永久消息
  for (let index = 0; index < imgsUrls.length; index++) {
    const item = imgsUrls[index];
    // 包装成 promise
    const promise = () => {
      const file_name = imgsTitles[index]; // 获取文件名
      mesIdH.refresh(`正在下载：第 ${index + 1} / ${imgsUrls.length} 张，文件名：${file_name}`);
      return getData(item, XhrResponseType.BLOB)
        .then((blob) => {
          const data = blob as unknown as Blob;
          // 下载文件, 并存成ArrayBuffer对象
          zip.file(file_name, data, {
            binary: true,
          }); // 逐个添加文件
          mesIdP.refresh(
            `第 ${index + 1} 张，文件名：${file_name}，大小：${(data.size / 1024).toFixed(0)} Kb，下载完成！等待压缩...`
          );
        })
        .catch((err) => {
          // 移除消息；
          if (err.responseText) {
            const domParser = new DOMParser();
            const xmlDoc = domParser.parseFromString(err.responseText, 'text/html');
            mesIdP.refresh(`第 ${index + 1} 张，请求错误：${xmlDoc.body.innerHTML}`);
          } else if (err.status) {
            console.error(err.status);
          } else {
            console.error(err);
          }
          return -1; // 错误处理, 标记错误并返回
        });
    };
    promises.push(promise);
  }
  const pool = new ConcurrencyPromisePool(user.limit);
  pool.all(promises).then((results) => {
    mesIdH.remove();
    counter.downloadBtn = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] == -1) {
        // new MessageBox("文件缺失！")
        counter.downloadBtn++;
      }
    }
    if (results.length == counter.downloadBtn) {
      new MessageBox('全部图片下载失败！');
      mesIdP.remove();
      setCounter({
        ...counter,
        downloadBtn: 0,
      });
      return;
    }
    if (counter.downloadBtn) {
      if (!confirm(`检测到文件缺失 ${counter.downloadBtn} 张，是否继续压缩？`)) {
        mesIdP.remove();
        return;
      }
    }
    mesIdP.refresh('正在压缩打包，大文件请耐心等待...');
    zip
      .generateAsync({
        type: 'blob',
      })
      .then((content) => {
        // 生成二进制流
        mesIdP.remove();
        setCounter({
          ...counter,
          downloadBtn: 0,
        });
        saveAs(content, `${folderName} [${imgsUrls.length}P]`); // 利用file-saver保存文件，大文件需等待很久
      });
  });
}

function noDisplayPic() {
  const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
  if (pcbImg.length) {
    for (let i = 0; i < pcbImg.length; i++) {
      //遍历图片列表
      const img = pcbImg[i] as HTMLImageElement;
      // 前10张
      if (img.title && img.getAttribute('file') && img.getAttribute('file')?.includes('mymypic.net')) {
        img.src = 'https://www.jkforum.net/static/image/common/none.gif';
        // new MessageBox("屏蔽图片成功");
        // 懒加载部分

        const observer = new MutationObserver(() => {
          // 监听元素子节点属性变化，然后屏蔽链接
          if (img.src != 'https://www.jkforum.net/static/image/common/none.gif') {
            observer.disconnect(); // 断开监听
            console.log('屏蔽图片成功：', img.src);
            img.src = 'https://www.jkforum.net/static/image/common/none.gif';
          }
        }); // 建立监听器
        observer.observe(img, {
          // 开始监听
          attributes: true,
        });
      }
    }
    new MessageBox('屏蔽图片完成！');
  } else {
    new MessageBox('没有图片！');
  }
}

export { noDisplayPic, downloadImgs };
