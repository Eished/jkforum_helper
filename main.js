// ==UserScript==
// @name         jkforum helper
// @namespace    https://github.com/Eished/jkforum_helper
// @version      0.3.7
// @description  捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @exclude      *.jkforum.net/member*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_download
// @grant        GM_info
// ==/UserScript==

(function () {
  'use strict';
  if (document.querySelector('.listmenu li a')) {
    newUser();
    addBtns();
    launch(); // 启动自动签到 自动投票
    rePic();
  }
})();

function newUser() {
  const formhash = document.querySelector('.listmenu li a').href.split('&')[2].split('=')[1];
  const username = document.querySelector('.avatar_info').querySelector('a').innerHTML;
  if (!GM_getValue(username) || GM_getValue(username).version != GM_info.script.version) { //空则写入，或版本变动写入
    const fastReplyUrl = 'https://www.jkforum.net/thread-8364615-1-1.html'; // 获取快速回复的地址
    const fastReply = getFastReply(fastReplyUrl); // 从置顶帖子初始化快速回贴内容, 返回数组
    const user = {
      username: username,
      formhash: formhash,
      version: GM_info.script.version,
      today: '', // 签到日期
      signtime: '23:59:59', // 签到时间
      signNum: 10, // 签到重试次数
      interTime: 200, // 签到重试间隔时间
      todaysay: '簽到', // 签到输入内容
      mood: 'fd', // 签到心情
      differ: 10000, // 回帖随机间隔时间
      interval: 20000, // 回帖基础间隔时间
      autoPaySw: 1, // 自动支付开关
      autoThkSw: 1, // 自动感谢开关
      autoRePicSw: 1, // 自动加载原图开关
      page: '', // 批量回帖页码
      votedMessage: '+1', //投票输入内容
      userReplyMessage: [], // 用户保存的回复，历史回帖内容
      replyMessage: [], // 用于回复的内容，临时回帖内容
      fastReply: fastReply, // 保存的快速回复，快速回帖内容
      replyThreads: [], // 回帖数据
      applyVotedUrl: 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59',
      votedUrl: 'https://www.jkforum.net/plugin.php?id=voted',
      taskDoneUrl: 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59',
      signUrl: 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1',
      thkUrl: 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1',
      payUrl: 'https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1',
    }
    GM_setValue(username, user);
  }

  const user = getUserFromName();
  if (user.formhash != formhash) { //formhash 变动存储
    user.formhash = formhash;
    GM_setValue(username, user);
  }
}

function getUserFromName() { //从用户名获取对象
  const avatar_info = document.querySelector('.avatar_info'); // 用户名判断唯一用户
  const username = avatar_info.querySelector('a').innerHTML;
  const user = GM_getValue(username);
  return user;
}

function getFastReply(url) { //获取快速回复
  const html = getData(url);
  const options = html.querySelectorAll('#rqcss select option');
  let fastReply = []; //返回数组
  options.forEach(option => {
    if (option.outerText) { //去掉空值
      fastReply.push(replaceHtml(option.value)); //去掉需要转义的内容
    }
  });
  return fastReply;
}

function rePic() {
  if (window.location.href.match('thread')) {
    const user = getUserFromName();
    if (user.autoThkSw) { // 自动感谢当前贴开关
      thankThread(); // 自动感谢当前贴
    }
    if (user.autoPaySw) { // 自动购买当前贴开关
      autoPay(); // 自动购买当前贴
    }
    let ignore_js_ops = document.querySelectorAll('.t_f ignore_js_op'); //获取图片列表，附件也是ignore_js_op
    if (ignore_js_ops && user.autoRePicSw) { // 加载原图开关
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
    const user = getUserFromName();
    const url = user.payUrl;
    const referer = location.href;
    const tid = referer.split('-')[1];
    const pData = `formhash=${user.formhash}&referer=${turnUrl(referer)}&tid=${tid}&handlekey=pay`
    postData(url, pData, 'pay');
  }
}

function thankThread() {
  if (document.querySelector('#thankform') && document.querySelectorAll('#k_thankauthor')[1]) { //感谢可见
    thankThreadPost();
    setTimeout(() => {
      location.reload();
    }, 500)
  } else if (document.querySelector('#thankform') && document.querySelectorAll('#k_thankauthor')[0]) { //普通贴
    thankThreadPost();
  }
};

function thankThreadPost() {
  const thankform = document.querySelector('#thankform');
  // const formhash = thankform.querySelector('[name=formhash]').value;
  const tid = thankform.querySelector('[name=tid]').value;
  const touser = thankform.querySelector('[name=touser]').value;
  const touseruid = thankform.querySelector('[name=touseruid]').value;
  const user = getUserFromName();
  const thkData = `formhash=${user.formhash}&tid=${tid}&touser=${touser}&touseruid=${touseruid}&handlekey=k_thankauthor&addsubmit=true`;
  // 执行感谢函数
  const thkReqUrl = user.thkUrl; //请求地址
  postData(thkReqUrl, thkData, 'thk'); //post感谢数据
}

// 添加GUI
function addBtns() {
  // 增加 visited 样式，图片模式已阅的帖子变灰色
  function genStlye() {
    let b = document.createElement('style');
    b.innerHTML = `.xw0 a:visited {color: grey;}`;
    return b;
  };
  document.querySelector('body').appendChild(genStlye()); // 增加 visited 样式到 body


  // 生产消息盒子
  function genDiv() {
    let b = document.createElement('div'); //创建类型为div的DOM对象
    b.style.cssText = 'width: 200px;float: left;position: absolute;border-radius: 10px;left: auto;right: 5%;bottom: 20px;z-index:999';
    b.id = 'messageBox';
    return b; //返回修改好的DOM对象
  };
  document.querySelector('body').appendChild(genDiv()); // 消息盒子添加到body
  const messageBox = document.querySelector('#messageBox');
  const messageBoxBottom = parseInt(messageBox.style.bottom);
  window.onscroll = function () { //定位在右下角
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    messageBox.style.bottom = messageBoxBottom - scrollTop + 'px';
  }
  const status_loginned = document.querySelector('.status_loginned');
  const mnoutbox = document.querySelectorAll('.mnoutbox');

  // 在签到页面激活 定时签到
  if (location.href.match(`id=dsu_paulsign:sign`)) {
    let btn = genButton('定时签到', timeControl); //设置名称和绑定函数
    status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置
    const video = genVideo();
    status_loginned.insertBefore(video, mnoutbox[1]); //添加视频到指定位置
  }

  if (window.location.href.match('/forum-')) {
    // 回帖输入框
    const input = genElement('textarea', 'inpreply', 1, 20);
    status_loginned.insertBefore(input, mnoutbox[1]); //添加文本域到指定位置
    // 感谢 按钮
    const thkBtn = genButton('添加本页', thankOnePage); //设置名称和绑定函数
    status_loginned.insertBefore(thkBtn, mnoutbox[1]); //添加按钮到指定位置
  } else if (location.href == `https://www.jkforum.net/forum.php`) { //在首页激活批量感谢功能
    // 回帖 按钮
    const repBtn = genButton('回帖', replyBtn); //设置名称和绑定函数
    status_loginned.insertBefore(repBtn, mnoutbox[1]); //添加按钮到指定位置
    // 感谢 按钮
    const thankBtn = genButton('感谢', thkBtn); //设置名称和绑定函数
    status_loginned.insertBefore(thankBtn, mnoutbox[1]); //添加按钮到指定位置  
    // 回帖输入框
    const input = genElement('textarea', 'inpreply', 1, 20);
    status_loginned.insertBefore(input, mnoutbox[1]); //添加文本域到指定位置  
    // 页码输入框
    const page = genElement2('input', 'inp_page');
    status_loginned.insertBefore(page, mnoutbox[1]); //添加输入框到指定位置
    // 批量感谢/回帖
    const btn = genButton('添加任务', thankBatch); //设置名称和绑定函数
    status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置
  }
};

function replyBtn() {
  if (!this.timer) {
    const _this = this;
    replyOrThk(_this, 'reply');
  }
}

function thkBtn() {
  if (!this.timer) {
    const _this = this;
    replyOrThk(_this, 'thk');
  }
}

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
  b.placeholder = '中文分号；分隔回帖内容';
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
  const user = getUserFromName();
  if (user.page) {
    b.value = user.page;
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

function nowTime(time) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  // 补零
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  switch (time) {
    case 'year': {
      return year;
    }
    case 'month': {
      return `${year}/${month}`;
    }
    case 'day': {
      return `${year}/${month}/${day}`;
    }
    case 'hours': {
      return `${year}/${month}/${day} ${hours}`;
    }
    case 'minutes': {
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
    case 'seconds': {
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }
    default:
      return "输入时间";
  }
}

// 定时签到
function timeControl() {
  const _this = this; //获取对象
  clearInterval(_this.timer); //清除重复定时器
  document.querySelector('#video1').play(); // 播放视频，防止休眠
  if (!document.querySelector('#video1').paused) {
    const date = new Date()
    const holdTime = date.getTime();
    // 1000*60*60*24
    const hold = ((1000 * 60 * 60) - holdTime % (1000 * 60 * 60)); //通知持续时间，1小时-已运行分钟
    messageBox('防止休眠启动，请保持本页处于激活状态，勿最小化本窗口以及全屏运行其它应用！', hold);
    messageBox('定时签到中，请勿退出...', hold);
  } else {
    console.log(document.querySelector('#video1'));
  }
  const user = getUserFromName();
  const signtime = user.signtime; // 设定签到时间

  function control() {
    const nowtime = nowTime('seconds').split(' ')[1]; // 获取当前时间，到秒
    if (nowtime == signtime) {
      clearInterval(_this.timer);
      messageBox('执行中....');
      let retryTime = 0;
      for (let i = 0; i < user.signNum; i++) { //重试次数
        setTimeout(() => {
          sign();
          messageBox('执行第' + (i + 1) + '次');
          console.log('执行第' + (i + 1) + '次');
        }, retryTime += user.interTime) //重试间隔
      }
    } else {
      console.log('时间没有到：', signtime, '目前时间：', nowTime('seconds').split(' ')[1]);
    }
  }
  _this.timer = setInterval(control, 500);
}

function launch() {
  const user = getUserFromName();
  // 版本更新后，today 写入空值，在此初始化。
  if (user.username) { //验证是否登录 //天变动则签到
    if (user.today != nowTime('day')) {
      user.today = nowTime('day');
      GM_setValue(user.username, user); //保存当天日
      const urlApply = user.applyVotedUrl;
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
  const user = getUserFromName();
  let pMessage = 'formhash=' + user.formhash + '&qdxq=' + user.mood + '&qdmode=1&todaysay=' + turnUrl(user.todaysay) + '&fastreply=1'; //post 报文
  let url = user.signUrl; //请求链接
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
      let urlVote = getUserFromName().votedUrl;
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
      const user = getUserFromName();
      const pMessage = 'formhash=' + user.formhash + '&inajax=1&handlekey=dian&sid=0&message=' + turnUrl(user.votedMessage); //post 投票报文
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

function chooceReply() {
  const inpreply = document.querySelector('#inpreply'); // 获取回复内容
  const user = getUserFromName();
  if (inpreply && inpreply.value) {
    user.replyMessage = []; // 中文分号分隔字符串
    inpreply.value.split('；').forEach((element) => {
      if (element) {
        user.replyMessage.push(element); // 中文分号分隔字符串
        user.userReplyMessage.push(element); // 存储自定义回帖内容，从头部添加
      }
    })
    GM_setValue(user.username, user); // 油猴脚本存储回帖内容
    console.log("已使用自定义回复");
    messageBox("已使用自定义回复");
    return user.replyMessage.length;
  } else {
    if (user.fastReply.length) {
      GM_setValue(user.username, user); // 油猴脚本存储回帖内容
      console.log("已使用快速回复");
      messageBox("已使用快速回复");
      return user.fastReply.length;
    } else if (user.userReplyMessage.length && confirm("是否使用历史自定义回复？")) {
      GM_setValue(user.username, user); // 油猴脚本存储回帖内容
      console.log("已使用历史自定义回复");
      messageBox("已使用历史自定义回复");
      return user.userReplyMessage.length;
    } else {
      alert('没有获取到任何回复，请确认有浏览可快速回贴的版块的权限！否则需要手动输入回帖内容！');
      return -1;
    }
  }
}

function thankOnePage() {
  const currentHref = window.location.href; // 获取当前页地址
  const fid = currentHref.split('-')[1]; // 获取板块fid
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
    messageBox('正在添加本页...');
    // 获取当前页所有帖子地址
    getThreads(currentHref, fid);
  }
}

function thankBatch() {
  const page = document.querySelector('#inp_page').value;
  const reg = new RegExp(/^\d+-\d+-\d+$/);
  if (reg.test(page)) { //如果输入了正确地址则进行批量处理
    messageBox('正在添加：' + page);
    const user = getUserFromName();
    user.page = page;
    GM_setValue(user.username, user);
    let pageFrom = parseInt(page.split('-')[1]); // 获取起点页码
    const pageEnd = parseInt(page.split('-')[2]); // 获取终点页码
    const fid = page.split('-')[0]; // 获取版块代码

    getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes'); //切换到列表模式，同步请求。
    messageBox('已切换到列表模式');

    function sendPage() {
      let currentHrefPage = 'https://www.jkforum.net/forum-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
      getThreads(currentHrefPage, fid);
      console.log('当前地址：', currentHrefPage, '页码：', pageFrom);
      pageFrom++;
    };
    // sendPage();
    while (pageFrom <= pageEnd) {
      sendPage();
    }
  } else {
    messageBox('请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1', 10000);
  }
}
// 获取当前页所有帖子地址
function getThreads(currentHref, fid) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', currentHref, true);
  httpRequest.send();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const data = httpRequest.responseText;
      // 数据类型转换
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;

      let replyLen = chooceReply(); //如果输入了值则使用用户值，如果没有则使用默认值；没有默认值则返回错误
      if (replyLen <= 0) {
        console.log('获取回帖内容失败！');
        messageBox('获取回帖内容失败！');
        return "获取回帖内容失败！";
      };

      const user = getUserFromName(); //获取user对象，必须在用户输入值后面，不然取不到快速回复
      //帖子类名 40个a标签数组 
      let hrefs = htmlData.querySelectorAll('.s');
      // 获取作者昵称和 UID
      let cites = htmlData.querySelectorAll('cite a');

      // 以 fid 创建对象，如果fid存在则写入fid的数组的fidthreads属性的数组内；否则创建新的 fidthreads，自我调用
      const fidthreads = {
        fid: fid,
        fidTime: 0,
        fidRepIndex: 0, // 记录此版块上次回复的位置，用于解决无法遍历到后续增加的帖子；
        fidThkIndex: 0, // 记录此版块上次感谢的位置，用于解决无法遍历到后续增加的帖子；
        fidthreads: [],
      }

      let fidTime = 0; // 统计总时间
      function newFid() {
        if (user.replyThreads.length) {
          for (let i = 0; i < user.replyThreads.length; i++) {
            if (user.replyThreads[i].fid == fid) {
              // console.log(fid);
              const info = addThrInfo(user.replyThreads[i]);
              user.replyThreads[i].fidTime += fidTime; // 累加时间
              GM_setValue(user.username, user);
              return info; // 匹配到则退出循环 // 传入对应对象
            }
          }
          // 如果没匹配到同样增加
          user.replyThreads.push(fidthreads);
          newFid();
        } else {
          user.replyThreads.push(fidthreads); // 初始化threads
          newFid();
        }
      }
      // 回帖变量随即范围限制
      let start = 0;
      if (replyLen == user.fastReply.length || replyLen == user.userReplyMessage.length) { // 判断起始位置
      } else {
        start = user.userReplyMessage.length - replyLen; // 用户数组长-增加的数据长=起始位置；
        replyLen = user.userReplyMessage.length; // 结束位置
        // console.log(start, replyLen - 1, "变量范围");
      }

      function addThrInfo(elem) {
        // 遍历去除回帖用户
        for (let i = 0; i < cites.length; i += 2) {
          // 加入数组
          const touser = cites[i].innerHTML;
          const touseruid = cites[i].href.split('uid=')[1]; // href="home.php?mod=space&uid=1123445"
          const href = hrefs[i / 2].href;
          // 获取帖子ID
          const tid = href.split('-')[1];
          // 确保帖子的唯一性
          for (let i = 0; i < elem.fidthreads.length; i++) {
            const element = elem.fidthreads[i];
            if (element.tid == tid) {
              return `thread-${tid}-1-1 ：此帖子已在任务列表，已跳过此页，请选择其他页！`;
            }
          }
          // 感谢数据
          const thkData = 'formhash=' + user.formhash + '&tid=' + tid + '&touser=' + turnUrl(touser) + '&touseruid=' + touseruid + '&handlekey=k_thankauthor&addsubmit=true';
          const replyIndex = rdNum(start, replyLen - 1); // 从返回的输入长度获取随机值
          // console.log(start, replyLen - 1, replyIndex);
          const randomTime = rdNum(user.interval, user.differ + user.interval);
          const thread = {
            tid: tid,
            touseruid: touseruid,
            touser: touser,
            thkData: thkData,
            replyIndex: replyIndex, // 回帖随机数
            replyLen: replyLen, // 用于判断使用的哪个数组，和确定起始位置
            // replyData: '', // 和 posttime 一起生成
            // posttime: '', // 回帖时间，发送时赋值 getTime()/1000
            randomTime: randomTime, // 回帖时间随机数
          }
          fidTime += randomTime;
          elem.fidthreads.push(thread); // 给对象数组添加
        }
        GM_setValue(user.username, user);
        // console.log(user.replyThreads.length)
        messageBox('回帖列表任务添加成功！')
      }
      // 错误提示
      const info = newFid();
      if (info) {
        messageBox(info);
      }
    };
  };
};

function replyOrThk(_this, type = 'reply') { // 回帖函数
  const video = genVideo(); //需要视频时再加载视频，提高性能
  document.querySelector('body').appendChild(video); //添加视频到指定位置
  document.querySelector('#video1').play(); // 播放视频，防止休眠
  if (!document.querySelector('#video1').paused) {
    messageBox('防止休眠启动，请保持本页处于激活状态，勿最小化本窗口以及全屏运行其它应用！', 'none');
  } else {
    console.log(document.querySelector('#video1'));
  }
  const user = getUserFromName();
  const thkUrl = user.thkUrl;
  let fidIndex = 0; // 当前回帖版块序号
  let thkFidIndex = 0; // 当前感谢版块序号
  if (!user.replyThreads.length) {
    messageBox('任务列表为空，请先添加任务！');
    console.log('任务列表为空，请先添加任务！');
    return 0; // 打断了通知消息的异步执行
  } else if (type == 'reply') {
    console.log(type, ":开始回帖...");
  } else {
    console.log(type, ":开始感谢...");
  }
  cricleReplyForum();

  function cricleReplyForum() {
    if ((type == 'reply' && fidIndex < user.replyThreads.length) || (type == 'thk' && thkFidIndex < user.replyThreads.length)) { // 分别处理感谢和回帖
      const elementForum = user.replyThreads[(type == 'reply') ? fidIndex : thkFidIndex]
      const fid = elementForum.fid;
      let fidRepIndex = elementForum.fidRepIndex; // 上次回复位置
      let fidThkIndex = elementForum.fidThkIndex; // 上次感谢位置
      if (type == 'reply') {
        console.log(fid + " 版块，起始位置：" + fidRepIndex + " 总数：" + elementForum.fidthreads.length + "，版块总需" + (elementForum.fidTime / 1000 / 60).toFixed(1) + " 分钟时间");
        messageBox(fid + " 版块，起始位置：" + fidRepIndex + " 总数：" + elementForum.fidthreads.length + "，版块总需" + (elementForum.fidTime / 1000 / 60).toFixed(1) + " 分钟时间");
      } else if (type == 'thk') {
        console.log(fid + " 版块，起始位置：" + fidThkIndex + " 总数：" + elementForum.fidthreads.length);
        messageBox(fid + " 版块，起始位置：" + fidThkIndex + " 总数：" + elementForum.fidthreads.length);
      }
      cricleReply();

      function cricleReply() {
        if ((elementForum.fidthreads.length > fidRepIndex && type == 'reply') || (elementForum.fidthreads.length > fidThkIndex && type == 'thk')) { // 分别处理感谢和回帖
          switch (type) {
            case 'reply': {
              const elementThr = elementForum.fidthreads[fidRepIndex];
              const tid = elementThr.tid;
              const replyIndex = elementThr.replyIndex;
              const replyLen = elementThr.replyLen;
              const randomTime = elementThr.randomTime;
              const replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&fid=' + fid + '&tid=' +
                tid + '&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1'; // 拼接回帖url
              const date = new Date();
              const posttime = parseInt(date.getTime() / 1000); // 生产时间戳
              // 拼接回帖报文
              let replyData = '';
              if (replyLen == user.fastReply.length) {
                replyData = 'message=' + turnUrl(user.fastReply[replyIndex]) + '&posttime=' + posttime + '&formhash=' + user.formhash + '&usesig=1&subject=++';
              } else {
                replyData = 'message=' + turnUrl(user.userReplyMessage[replyIndex]) + '&posttime=' + posttime + '&formhash=' + user.formhash + '&usesig=1&subject=++';
              }
              clearInterval(_this.timer);
              _this.timer = setInterval(() => {
                clearInterval(_this.timer);
                // postData(replyUrl, replyData, type);
                console.log("版块：" + fidRepIndex, '随机序号:', replyIndex, '内容:', turnUrl(replyData, 1), '用时:', randomTime); //测试使用  
                elementForum.fidRepIndex = ++fidRepIndex;
                GM_setValue(user.username, user);
                cricleReply();
              }, randomTime);
              break;
            }
            case 'thk': {
              const elementThr = elementForum.fidthreads[fidThkIndex];
              const thkData = elementThr.thkData;
              // postData(thkUrl, thkData, type); //post感谢数据
              console.log(fidThkIndex, thkData, type); //post感谢数据
              elementForum.fidThkIndex = ++fidThkIndex;
              cricleReply();
              break;
            }

            default:
              break;
          }
        } else {
          if (type == 'thk') {
            thkFidIndex++; // 翻页
          } else if (type == 'reply') {
            fidIndex++; // 翻页
            messageBox(fid + "：版块感谢/回帖完成！");
          }
          GM_setValue(user.username, user);
          cricleReplyForum();
        }
      }
    } else {
      if (type == 'thk') {
        messageBox("全部感谢完成！");
      } else if (type == 'reply') {
        messageBox("全部回帖完成！");
        GM_notification("全部回帖完成！");
      }
    }
  }
  GM_setValue(user.username, user);
};

// n, m 范围随机整数生成 
function rdNum(n, m) {
  let c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}

// GET数据通用模块，返回html
function getData(url) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url, false);
  httpRequest.send();
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    let htmlData = document.createElement('div');
    htmlData.innerHTML = httpRequest.responseText;
    return htmlData;
  };
};

// POST数据通用模块,返回XML
function postData(replyUrl, replyData, fromId, contentType = 'application/x-www-form-urlencoded') {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', replyUrl, true);
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
            console.log(stringOrHtml);
          }
          break;
        }
        case 'sign': {
          if (checkHtml(stringOrHtml)) { // 确认html
            const info = stringOrHtml.querySelector('.c').innerHTML.split('<')[0].trim(); // 解析html，返回字符串
            messageBox(info, 10000);
            console.log(info, 10000);
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
          const urlDraw = getUserFromName().taskDoneUrl;
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
  const reg3 = /[\a|\r|\n|\b|\f|\t|\v]+/g; //去掉特殊符号
  const reg = /<.+>/g; //去掉所有<>内内容
  // 先reg3,\n特殊符号会影响reg的匹配
  return txt.replace(reg3, '').replace(reg, '').trim();
}