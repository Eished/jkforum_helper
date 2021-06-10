// ==UserScript==
// @name         jkforum helper
// @namespace    https://github.com/Eished/jkforum_helper
// @version      0.3.2
// @description  捷克论坛助手：自动签到、自动感谢、自动加载原图、自动支付购买主题贴、自动完成投票任务，一键批量回帖/感谢
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @exclude      *.jkforum.net/member*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  'use strict';
  if (document.querySelector('.listmenu li a')) {
    const formhash = document.querySelector('.listmenu li a').href.split('&')[2].split('=')[1];
    if (formhash != GM_getValue('formhash')) {
      GM_setValue('formhash', formhash); //用GM_setValue当全局变量
    }
    addBtns();
    launch();
    rePic();
  }
})();

function rePic() {
  if (window.location.href.match('/thread-')) {
    thankThread(); // 自动感谢当前贴
    autoPay(); // 自动购买当前贴
    let ignore_js_ops = document.querySelectorAll('.t_f ignore_js_op'); //获取图片列表，附件也是ignore_js_op
    if (ignore_js_ops) {
      for (let i = 0; i < ignore_js_ops.length; i++) { //遍历图片列表
        let img = ignore_js_ops[i].querySelector("img");
        img.setAttribute('onmouseover', null); // 去掉下载原图提示
        if (img.src.match('.thumb.')) { // 去掉缩略图
          console.log('thumb：', img.src);
          img.src = img.getAttribute('file').split('.thumb.')[0];
          messageBox('加载原图成功', 1000)
        } else if (img.src.match('static/image/common/none.gif')) {
          img.setAttribute('file', img.getAttribute('file').split('.thumb.')[0]); //网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
          // img.src = img.getAttribute('file').split('.thumb.')[0];// 懒加载，下载时激活
          console.log('none.gif:', img.src);
          messageBox('加载原图成功', 1000)
        }
      }
    }
  }
}

function autoPay() {
  if (document.querySelector('.viewpay')) {
    const url = `https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1`
    const referer = location.href;
    const tid = referer.split('-')[1];
    const pData = `formhash=${GM_getValue('formhash')}&referer=${turnUrl(referer)}&tid=${tid}&handlekey=pay`
    postData(url, pData, 'pay');
  }
}

function thankThread() {
  if (document.querySelector('#thankform') && document.querySelectorAll('#k_thankauthor')[1]) { //感谢可见
    thankThreadPost();
    setTimeout(() => {
      location.reload();
    }, 500)
  } else if (document.querySelectorAll('#k_thankauthor')[0]) { //普通贴
    thankThreadPost();
  }
};

function thankThreadPost() {
  const thankform = document.querySelector('#thankform');
  // const formhash = thankform.querySelector('[name=formhash]').value;
  const tid = thankform.querySelector('[name=tid]').value;
  const touser = thankform.querySelector('[name=touser]').value;
  const touseruid = thankform.querySelector('[name=touseruid]').value;
  const thkData = `formhash=${GM_getValue('formhash')}&tid=${tid}&touser=${touser}&touseruid=${touseruid}&handlekey=k_thankauthor&addsubmit=true`;
  // 执行感谢函数
  const thkReqUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1'; //请求地址
  postData(thkReqUrl, thkData, 'thk'); //post感谢数据
}
// 添加GUI
function addBtns() {
  // 生产消息盒子
  function genDiv() {
    let b = document.createElement('div'); //创建类型为div的DOM对象
    b.style.cssText = 'left: 30%; top: 0%;width:200px;float:left;position:absolute;border-radius: 10px';
    b.id = 'messageBox';
    return b; //返回修改好的DOM对象
  };
  document.querySelector('body').appendChild(genDiv()); // 消息盒子添加到body

  const status_loginned = document.querySelector('.status_loginned');
  const mnoutbox = document.querySelectorAll('.mnoutbox');

  // 在签到页面激活 定时签到
  if (location.href == `https://www.jkforum.net/plugin/?id=dsu_paulsign:sign`) {
    let btn = genButton('定时签到', aotuSign); //设置名称和绑定函数
    status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置
    const video = genVideo();
    status_loginned.insertBefore(video, mnoutbox[1]); //添加视频到指定位置
  }


  if (window.location.href.match('/forum-')) {
    // 回帖输入框
    const input = genElement('textarea', 'inp1', 1, 20);
    status_loginned.insertBefore(input, mnoutbox[1]); //添加文本域到指定位置
    // 感谢 按钮
    const thkBtn = genButton('感谢/回帖', thankOnePage); //设置名称和绑定函数
    status_loginned.insertBefore(thkBtn, mnoutbox[1]); //添加按钮到指定位置
  } else if (location.href == `https://www.jkforum.net/forum.php`) { //在首页激活批量感谢功能
    // 回帖输入框
    const input = genElement('textarea', 'inp1', 1, 20);
    status_loginned.insertBefore(input, mnoutbox[1]); //添加文本域到指定位置
    // 页码输入框
    const page = genElement2('input', 'inp2');
    status_loginned.insertBefore(page, mnoutbox[1]); //添加输入框到指定位置
    // 批量感谢/回帖
    const btn = genButton('批量感谢/回帖', thankBatch); //设置名称和绑定函数
    status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置
  }
};

function genButton(text, foo, id) {
  let b = document.createElement('button'); //创建类型为button的DOM对象
  b.textContent = text; //修改内部文本为text
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left' //添加样式（margin可以让元素间隔开一定距离）
  b.addEventListener('click', foo); //绑定click的事件的监听器
  if (id) {
    b.id = id;
  } //如果传入了id，就修改DOM对象的id
  return b; //返回修改好的DOM对象
}

function genElement(type, id, val1, val2) {
  let b = document.createElement(type); //创建类型为button的DOM对象
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left' //添加样式（margin可以让元素间隔开一定距离）
  b.rows = val1;
  b.cols = val2;
  // 油猴脚本存储回帖内容
  if (GM_getValue('reply')) {
    b.value = GM_getValue('reply');
  } else {
    b.value = '感謝大大分享！';
  }
  if (id) {
    b.id = id;
  } //如果传入了id，就修改DOM对象的id
  return b; //返回修改好的DOM对象
}

function genElement2(type, id) {
  let b = document.createElement(type); //创建类型为button的DOM对象
  b.style.cssText = 'margin:16px 10px 0px 0px;float:left;width:80px' //添加样式（margin可以让元素间隔开一定距离）
  if (id) {
    b.id = id;
  }
  if (GM_getValue('replyPage')) {
    b.value = GM_getValue('replyPage');
  }
  b.placeholder = `版块-1-2`;
  return b; //返回修改好的DOM对象
}

function genVideo() {
  let video = document.createElement('video');
  video.style.cssText = 'display: none; z-index: -1000;width:0;height:0;'
  video.id = 'video1';
  video.loop = 'true';
  video.autoplay = 'true';
  let source = document.createElement('source');
  source.src = 'https://raw.githubusercontent.com/Eished/jkforum_helper/main/video/light.mp4';
  source.type = "video/mp4"
  video.append(source);
  return video;
}

function launch() {
  let avatar_info = document.querySelector('.avatar_info'); // 用户名判断唯一用户
  if (avatar_info) { //验证是否登录
    avatar_info = avatar_info.querySelector('a').innerHTML;
    const date = new Date();
    let signDate = GM_getValue(avatar_info); // 从formhash判断唯一用户, 不行，是变量！avatar_info
    if (signDate != date.getDate()) { //天变动则签到
      signDate = date.getDate();
      GM_setValue(avatar_info, signDate); //保存当天日
      const urlApply = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';
      // 申请任务
      task(urlApply);
      // 签到
      sign();
    }
  } else {
    messageBox('未登录');
  }
}

function sign() {
  const todaysay = '好想睡覺~'; //签到输入内容
  let pMessage = 'formhash=' + GM_getValue('formhash') + '&qdxq=ym&qdmode=1&todaysay=' + turnUrl(todaysay) + '&fastreply=1'; //post 报文
  let url = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1'; //请求链接
  // 直接post签到数据
  postData(url, pMessage, 'sign');
}

// 申请投票任务
function task(urlApply) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlApply, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      messageBox("申请投票任务执行成功！");
      let urlVote = 'https://www.jkforum.net/plugin.php?id=voted';
      // 执行获取vid
      getVid(urlVote);
    }
  };
}

// 自动获取vid和aid
function getVid(urlVote) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlVote, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 找到链接
      const href = htmlData.querySelector('.voted a').href;
      // 分解链接
      const vid = href.split('&')[2].split('=')[1]; // 纯数字

      // 获取投票页 aid
      getAid(href, vid);
    }
  };
}

// 获取aid
function getAid(vidUrl, vid) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', vidUrl, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const data = httpRequest.responseText;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 找到链接
      const href = htmlData.querySelector('.hp_s_c a').href;
      // 分解链接
      const aid = href.split('&')[2].split('=')[1]; // 纯数字
      const pMessage = 'formhash=' + GM_getValue('formhash') + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 投票报文
      const url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=' + aid + '&vid=' + vid + ' & qr = & inajax = 1 '; //拼接投票链接
      postData(url, pMessage, 'voted');
    }
  };
};

// 领取投票任务奖励
function taskDone(urlDraw) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlDraw, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      messageBox("领取投票奖励执行成功！");
    }
  };
}

// 消息通知弹窗
function messageBox(text, setTime) {
  function genBox(text, id) {
    let b = document.createElement('div'); //创建类型为button的DOM对象
    b.textContent = text; //修改内部文本为text
    b.style.cssText = 'width:100%;background-color:#64ce83;float:left;padding:5px 10px;margin-top:5px;border-radius:10px;color:#fff;' //添加样式（margin可以让元素间隔开一定距离）
    // b.addEventListener('click', foo); //绑定click的事件的监听器
    if (id) {
      b.id = id;
    } //如果传入了id，就修改DOM对象的id
    return b; //返回修改好的DOM对象
  };
  // 生成时间 id 
  const date = new Date();
  const timeId = 'a' + date.getTime();
  // 初始化消息盒子
  let textBox = genBox(text, timeId);
  let messageBox = document.querySelector('#messageBox');
  // 显示消息
  messageBox.appendChild(textBox);
  // 默认5秒删掉消息，可设置时间，none一直显示
  if (setTime && !isNaN(setTime)) {
    setTimeout(() => {
      messageBox.removeChild(document.getElementById(timeId));
    }, setTime);
  } else if (setTime == 'none') {} else {
    setTimeout(() => {
      messageBox.removeChild(document.getElementById(timeId));
    }, 5000);
  }
}

// 自动感谢帖子
let fid = null; //回帖帖子用
let replyMessage = ''; //回复内容
let page = null; // 帖子列表页码
let pageTime = 1000; // 翻页时间，默认感谢为1秒，回帖为第一次请求时初始化值
let pageFrom = 0; //回帖起始页
let pageEnd = 0; //回帖终点页

function thankOnePage() {
  messageBox('已选择单页感谢/回帖');
  replyMessage = document.querySelector('#inp1').value; // 获取回复内容
  GM_setValue('reply', replyMessage); // 油猴脚本存储回帖内容
  const currentHref = window.location.href; // 获取当前页地址
  fid = currentHref.split('-')[1]; // 获取板块fid
  // 判断当前页是否处于图片模式
  if (document.querySelector('.showmenubox').querySelector('[class="chked"]')) {
    // 图片模式则切换为列表模式
    if (confirm("是否切换到列表模式并刷新页面？")) {
      getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes');
      location.reload();
    } else {
      messageBox('无法在图片模式运行！')
    }
  } else {
    // 获取当前页所有帖子地址
    getThreads(currentHref);
  }
}

function thankBatch() {
  page = document.querySelector('#inp2').value;
  messageBox('已选择多页感谢/回帖：' + page);
  if (page) { //如果输入了地址则进行批量处理
    // 视频播放
    const video = genVideo(); //需要视频时再加载视频，提高性能
    document.querySelector('body').appendChild(video); //添加视频到指定位置
    document.querySelector('#video1').play(); // 播放视频，防止休眠
    if (!document.querySelector('#video1').paused) {
      messageBox('防止休眠启动，请保持本页处于激活状态，勿最小化本窗口以及全屏运行其它应用！', 'none');
    } else {
      console.log(document.querySelector('#video1'));
    }

    GM_setValue('replyPage', page);
    pageFrom = parseInt(page.split('-')[1]); // 获取起点页码
    pageEnd = parseInt(page.split('-')[2]); // 获取终点页码
    fid = page.split('-')[0]; // 获取版块代码

    getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes'); //切换到列表模式，同步请求。
    messageBox('已切换到列表模式');

    function sendPage() {
      let currentHrefPage = 'https://www.jkforum.net/forum-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
      getThreads(currentHrefPage);
      console.log('当前地址：', currentHrefPage, '页码：', pageFrom);
      pageFrom++;
    };
    sendPage();

    setTimeout(() => { //等待上一次异步请求sendPage()初始化pageTime
      let pageTimeCache = pageTime; //缓存上一次的pageTime
      timeMachine();

      // 时光机自我调用，自我更新pageTime，用上一页的pageTime来运行下一页的sendPage
      function timeMachine() {
        let timer1 = setInterval(() => {
          if (pageFrom > pageEnd) {
            clearInterval(timer1);
            messageBox(page + "：所有页码回帖/感谢发送完成", 'none');
          } else if (pageTime != pageTimeCache) { //保持pageTime为最新获取的时间
            console.log('上一页设定运行时间:', pageTimeCache, '下一页设定运行时间:', pageTime);
            clearInterval(timer1);
            pageTimeCache = pageTime; //同步时间
            timeMachine(); //重新生成第二次的计时器，每次矫正要等pageTime
            sendPage(); //计时器需要等待pageTime，不如用第二次的计时器边发边等，生成第三次pageTime；用第三次pageTime执行第四次发送；如果三次<四次，会发送失败，+20秒平衡误差；
          } else {
            sendPage(); //第二次执行，重置pageTime；第三次与缓存不符，重新生成计时器，同步计时器pageTimeCache。
          }
        }, pageTime)
      }
    }, 5000);
    messageBox(page + "：多页感谢/回帖中，请等待...", 'none');
  } else {
    messageBox('请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1', 10000);
  }
}
// 获取当前页所有帖子地址
function getThreads(currentHref) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', currentHref, true);
  httpRequest.send();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const data = httpRequest.responseText;
      // 数据类型转换
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      //帖子类名 40个a标签数组
      let hrefs = htmlData.querySelectorAll('.s');

      // 获取作者昵称和 UID
      let cites = htmlData.querySelectorAll('cite a');
      // uid 数组
      let touserUids = new Array();
      // 用户名数组
      let tousers = new Array();
      // 遍历去除回帖用户
      for (let i = 0; i < cites.length; i += 2) {
        // 加入数组
        tousers.push(cites[i].innerHTML);
        touserUids.push(cites[i].href.split('&')[1]);
      }
      // 执行回帖函数和感谢函数 必须间隔10秒以上+随机数10-100毫秒
      let randomTime = 0;
      // 防封号：随机间隔时间，随机快速回帖内容。未完成。
      const differ = 5000; // 回单贴随机差值
      const interval = 11000; // 回帖基础间隔
      randomTime = Math.ceil(Math.random() * differ) + interval; //回帖随机时间
      let i = 0;
      let href = null;
      let tid = null;
      // 遍历所有帖子链接并感谢
      for (i = 0; i < hrefs.length; i++) {
        href = hrefs[i].href;
        // 获取帖子ID
        tid = href.split('-')[1]; // 无前缀 数字
        const touser = tousers[i]; // 无前缀 字符串
        const touserUid = touserUids[i]; //无前缀 数字
        // 拼接感谢报文
        const thkData = 'formhash=' + GM_getValue('formhash') + '&tid=' + tid + '&touser=' + touser + '&touser' + touserUid + '&handlekey=k_thankauthor&addsubmit=true';
        // 执行感谢函数
        const thkReqUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1'; //请求地址
        postData(thkReqUrl, thkData, 'thk'); //post感谢数据
      }
      i = 0;

      function chkReply() { // 回帖函数，提取出来，先于计时器执行
        if (i < hrefs.length) {
          href = hrefs[i].href;
          // 获取帖子ID
          tid = href.split('-')[1]; // 无前缀 数字
          // 参数
          // 拼接回帖url
          const replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&fid=' + fid + '&tid=' +
            tid + '&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1';
          // 生产时间戳
          const date = new Date();
          const posttime = parseInt(date.getTime() / 1000);
          // 拼接回帖报文
          const replyData = 'message=' + turnUrl(replyMessage) + '&posttime=' + posttime + '&formhash=' + GM_getValue('formhash') + '&usesig=1&subject=++';
          postData(replyUrl, replyData, 'reply');
          i++;
        }
        console.log(randomTime, '帖子序号：', i, '总数量：', hrefs.length);
      };

      function timeMeassage() { //动态赋值pageTime 和通知消息
        pageTime = (differ + interval) * hrefs.length; // 动态赋值pageTime 每页加 20000ms 等待时间，平衡误差
        // console.log("本页需要运行时间：", pageTime - 20000);
        messageBox('正在回帖中... ' + (pageFrom - 1) + '/' + pageEnd + '页需要' + (pageTime / 1000 / 60).toFixed(1) + '分钟', 'none');
      }

      function circleReply() {
        chkReply();
        let timer = setInterval(() => {
          if (i == hrefs.length) {
            clearInterval(timer);
            messageBox("本页回帖完成！", 'none');
          } else {
            clearInterval(timer);
            randomTime = Math.ceil(Math.random() * differ) + interval;
            circleReply();
          }
        }, randomTime);
      }
      // if (pageTime == 1000 && confirm("已感谢，确认回帖？")) { //确认回帖
      //   circleReply();
      //   timeMeassage();
      // } else if (pageTime != 2000 && pageTime != 1000) { //如果第一次确认回帖，则后面无需确认
      //   circleReply();
      //   timeMeassage();
      // } else {
      //   pageTime = 2000; //第一次取消回帖，第二次无需再确认
      //   console.log("已取消回帖：", pageTime);
      // }
    };
  };
};

// GET数据通用模块
function getData(url) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url, false);
  httpRequest.send();
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    return httpRequest.responseText;
  };
};

// POST数据通用模块,返回XML
function postData(replyUrl, replyData, fromId, contentType) {
  // 传输数据类型判断,默认 'application/x-www-form-urlencoded'
  if (contentType) {} else {
    contentType = 'application/x-www-form-urlencoded';
  }
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', replyUrl, true); //同步写法会时区响应
  httpRequest.setRequestHeader('content-Type', contentType);
  httpRequest.send(replyData); // post数据
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const stringOrHtml = turnCdata(httpRequest.responseXML); // 提取Cdata返回html或字符串
      switch (fromId) {
        case 'reply': {
          if (checkHtml(stringOrHtml)) { // 确认html
            const info = stringOrHtml.querySelector('script').innerHTML.split(`, `)[1];
            messageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
          } else {
            messageBox(stringOrHtml, 'none'); //其它情况直接输出
          }
          break;
        }
        case 'sign': {
          if (checkHtml(stringOrHtml)) { // 确认html
            const info = stringOrHtml.querySelector('.c').innerHTML.split('<')[0]; // 解析html，返回字符串
            messageBox(info, 10000);
          } else {
            messageBox(stringOrHtml); //其它情况直接输出
          }
          break;
        }
        case 'voted': {
          if (checkHtml(stringOrHtml)) {
            let info = '';
            if (stringOrHtml.querySelector('.alert_info')) {
              info = stringOrHtml.querySelector('.alert_info').innerHTML; // 解析html，返回字符串，失败警告
            } else if (stringOrHtml.querySelector('script')) {
              info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
            } else {
              info = "投票返回HTML数据识别失败: " + stringOrHtml;
            }
            messageBox(info, 10000);
          } else {
            messageBox(stringOrHtml); //其它情况直接输出
          }
          const urlDraw = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';
          taskDone(urlDraw); // 执行领奖励
          break;
        }
        case 'thk': {
          if (checkHtml(stringOrHtml)) {
            const info = replaceHtml(stringOrHtml.querySelector('.alert_info').innerHTML); //去除html，返回字符串
            messageBox(info);
          } else {
            messageBox(stringOrHtml); //其它情况直接输出
          }
          break;
        }
        case 'pay': {
          if (checkHtml(stringOrHtml)) { // 确认html
            const info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1);
            messageBox(info);
            location.reload();
          } else {
            messageBox(stringOrHtml); //其它情况直接输出
          }
          break;
        }

        default: {
          messageBox(stringOrHtml); //其它情况直接输出
          break;
        }
      }
    };
  };
};

// POST返回 xml数据类型转换成 字符串或html 模块
function turnCdata(xmlRepo) {
  let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
  // 如果判断去掉html是否还有文字，否则返回html
  if (replaceHtml(data)) {
    // 去掉html内容，返回文字
    return replaceHtml(data);
  } else {
    // 数据类型转换成 html
    let htmlData = document.createElement('div');
    htmlData.innerHTML = data;
    return htmlData;
  }
}

// 编码统一资源定位符模块
function turnUrl(data, type) {
  if (type) {
    return decodeURI(data);
  } else {
    return encodeURI(data);
  }
}
// 判断html和字符串是不是html
function checkHtml(htmlStr) {
  if (htmlStr.nodeName) {
    return true;
  } else {
    let reg = /<[^>]+>/g;
    return reg.test(htmlStr);
  }
}
// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt) {
  const reg3 = /[\\|\/|\:|\*|\r|\n|\b|\f|\t|\v|\`]+/g; //去掉特殊符号
  const reg2 = /^(\s+)|(\s+)$/g; //去掉前后空格
  const reg = /<.+>/g; //去掉所有<>内内容
  // 先reg3,\n特殊符号会影响reg的匹配
  return txt.replace(reg3, '').replace(reg, '').replace(reg2, '');
}

function aotuSign() {
  document.querySelector('#video1').play(); // 播放视频，防止休眠
  if (!document.querySelector('#video1').paused) {
    messageBox('防止休眠启动，请保持本页处于激活状态，勿最小化本窗口以及全屏运行其它应用！', 'none');
  } else {
    console.log(document.querySelector('#video1'));
  }
  // 定时签到
  timeControl();
}

// 定时签到
function timeControl() {
  var hours, minutes, seconds;
  const h = 0,
    m = 0,
    s = 0;

  function nowTime() {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
  }

  function control() {
    if (hours == h && minutes == m && seconds == s) {
      clearInterval(timmer);
      console.log('执行中....');
      for (let i = 0; i < 10; i++) {
        sign();
      }
    } else {
      console.log('时间没有到：', h, m, s, '目前时间：', hours, minutes, seconds);
    }
  }

  function check() {
    nowTime();
    control();
  }
  let timmer = setInterval(check, 500);
}