// ==UserScript==
// @name         jkforum helper
// @namespace    https://www.jkforum.net/
// @version      0.1.6
// @description  捷克论坛助手，自动签到，自动投票任务，一键批量感谢，自动回帖
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// ==/UserScript==

(function () {
  'use strict';
  addBtns();
})();

// 添加GUI
function addBtns() {
  let status_loginned = document.querySelector('.status_loginned');
  let mnoutbox = document.querySelectorAll('.mnoutbox');

  function genDiv() {
    let b = document.createElement('div'); //创建类型为div的DOM对象
    b.style.cssText = 'left: 30%; top: 0%;width:200px;float:left;position:absolute;border-radius: 10px';
    b.id = 'messageBox';
    return b; //返回修改好的DOM对象
  };
  // 消息盒子添加到body
  document.querySelector('body').appendChild(genDiv());

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

  // 感谢 按钮
  let thkBtn = genButton('感谢+回复当前列表', thankauthor); //设置名称和绑定函数
  status_loginned.insertBefore(thkBtn, mnoutbox[1]); //添加按钮到指定位置

  // 签到按钮
  let btn = genButton('一键签到', launch); //设置名称和绑定函数
  status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置

};

function launch() {
  // 申请任务
  task(urlApply);
  // 签到
  sign();
}

// 签到 直接post签到数据
const formhash = document.querySelectorAll('#scbar_form input')[1].value; //hash 值
function sign() {
  let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=%E5%A5%BD%E6%83%B3%E7%9D%A1%E8%A6%BA&fastreply=1'; //post 报文
  let url = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1'; //请求链接

  const httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接 false同步 true异步
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      const xmlRespo = httpRequest.responseXML; //获取到服务端返回的数据

      const data = xmlRespo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 提取错误信息
      const htmlText = htmlData.querySelector('.c').innerHTML;
      messageBox(replaceHtml(htmlText));
    }
  };
}


// 申请投票任务
let urlApply = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';

function task(urlApply) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlApply, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      messageBox("申请投票任务执行成功！");
      // 执行获取vid
      getVid(urlVote);
    }
  };
}

// 自动获取vid和aid
let urlVote = 'https://www.jkforum.net/plugin.php?id=voted';
let vid = null;
let aid = null;

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
      vid = href.split('&')[2];

      // 获取投票页 aid
      getAid(href);
    }
  };
}

// 获取aid
function getAid(vidUrl) {
  const httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', vidUrl, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 找到链接
      const href = htmlData.querySelector('.hp_s_c a').href;
      // 分解链接
      aid = href.split('&')[2];
      // 调用投票
      voted(aid, vid);
    }
  };
};

// 投票
function voted(aid, vid) {
  let pMessage = 'formhash=' + formhash + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 报文
  // let aid = 13798; //投票目标
  let url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=' + aid + '&' + vid + ' & qr = & inajax = 1 '; //拼接投票链接

  const httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      const xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据

      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // console.log(replaceHtml(data));
      messageBox(replaceHtml(data));

      // 执行领奖励
      taskDone(urlDraw);
    }
  };
}
// 领取投票任务奖励
let urlDraw = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';

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

// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt) {
  const reg3 = /^[\s]+|[\\|\/|\:|\*|\<|\>|\r|\n|\s|\b|\f|\t|\v|\`]|[\s]+$/g;
  const reg2 = /^(\s+)|(\s+)$/g;
  const reg = /<.+>/g;
  return txt.replace(reg, '').replace(reg2, '').replace(reg3, '');
}

// 消息通知弹窗
function messageBox(text) {
  function genBox(text, id) {
    let b = document.createElement('div'); //创建类型为button的DOM对象
    b.textContent = text; //修改内部文本为text
    b.style.cssText = 'background-color:#64ce83;float:left;padding:5px 10px;margin-top:5px;border-radius:10px;color:#fff;' //添加样式（margin可以让元素间隔开一定距离）
    // b.addEventListener('click', foo); //绑定click的事件的监听器
    if (id) {
      b.id = id;
    } //如果传入了id，就修改DOM对象的id
    return b; //返回修改好的DOM对象
  };
  // 生成时间 id 
  const date = new Date;
  const timeId = 'a' + date.getTime();
  // 初始化消息盒子
  let textBox = genBox(text, timeId);
  let messageBox = document.querySelector('#messageBox');
  // 显示消息
  messageBox.appendChild(textBox);
  // 5秒删掉消息
  setTimeout(() => {
    messageBox.removeChild(document.getElementById(timeId));
  }, 5000);
}


// 自动感谢帖子
let fid = null; //回复帖子用

function thankauthor() {
  // 获取当前页地址
  // https://www.jkforum.net/forum-640-1.html
  const currentHref = window.location.href;
  if (currentHref.split('-')[0] == 'https://www.jkforum.net/forum') {
    // 获取板块fid
    fid = currentHref.split('-')[1];
    // 获取当前页所有帖子地址
    getThreads(currentHref);
  } else if (currentHref.split('-')[0] == 'https://www.jkforum.net/thread') {
    // 对单独帖子进行感谢
    messageBox('此页面暂不支持！请到 https://www.jkforum.net/forum-* 版块页面，再尝试运行！');
  } else {
    messageBox('此页面不支持！请到 https://www.jkforum.net/forum-* 版块页面，再尝试运行！');
  }
};
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
      // 遍历去除回复用户
      for (let i = 0; i < cites.length; i += 2) {
        // 加入数组
        tousers.push(cites[i].innerHTML);
        touserUids.push(cites[i].href.split('&')[1]);
      }
      // 执行回复函数和感谢函数 必须间隔10秒以上+随机数10-100毫秒
      let randomTime = 0;

      // 遍历所有帖子链接并感谢
      for (let i = 0; i < hrefs.length; i++) {
        const href = hrefs[i].href;
        // 获取帖子ID
        const tid = href.split('-')[1]; // 无前缀 数字
        const touser = tousers[i]; // 无前缀 字符串
        const touserUid = touserUids[i]; //无前缀 数字
        // 拼接感谢报文
        const thkData = 'formhash=' + formhash + '&tid=' + tid + '&touser=' + touser + '&touser' + touserUid + '&handlekey=k_thankauthor&addsubmit=true';
        // 执行感谢函数
        thkThread(thkData);

        // 参数
        // 拼接回复url
        const replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&fid=' + fid + '&tid=' +
          tid + '&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1';
        // 生产时间戳
        const date = new Date();
        const posttime = parseInt(date.getTime() / 1000);
        // 拼接回复报文
        const replyData = 'message=%E6%84%9F%E8%AC%9D%E6%A8%93%E4%B8%BB%E5%88%86%E4%BA%AB&posttime=' + posttime + '&formhash=' + formhash + '&usesig=1&subject=++';
        // 计时器累加，实现间隔10000+5000*(0.1~1)毫秒以上
        randomTime += Math.ceil(Math.random() * 5000) + 10000;
        // 执行回复函数 必须间隔10秒以上+随机数1-10
        setTimeout(() => {
          replyThread(replyUrl, replyData);
        }, randomTime);
      };
      messageBox('请等待' + randomTime / 1000 / 60 + '分钟，即可全部回复完成！如无需回复，请关闭/刷新页面。');
      setTimeout(() => {
        alert("全部回复完成!");
      }, randomTime);
    };
  };
};

//post感谢数据
function thkThread(thkData) {
  const thkReqUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1'; //请求地址
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', thkReqUrl, true);
  httpRequest.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send(thkData); // post数据
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据
      // 获取数据节点
      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // 数据类型转换
      // console.log(replaceHtml(data));
      if (replaceHtml(data)) {
        messageBox(replaceHtml(data));
      } else {
        messageBox('感谢作者成功！');
      }

    };
  };
};


//post回复数据
function replyThread(replyUrl, replyData) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', replyUrl, true);
  httpRequest.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send(replyData); // post数据
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      const xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据
      // 获取数据节点
      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // 数据类型转换
      // console.log(replaceHtml(data));
      if (replaceHtml(data)) {
        messageBox(replaceHtml(data));
      } else {
        messageBox('回复成功！');
      }

    };
  };
};


// 自动评分
// Request URL: https://www.jkforum.net/forum.php?mod=misc&action=rate&ratesubmit=yes&infloat=yes&inajax=1
// content-type: application/x-www-form-urlencoded
// formhash: ff3d16d2
// tid: 13684758
// pid: 140618316
// referer: https://www.jkforum.net/forum.php?mod=viewthread&tid=13684758&page=0#pid140618316
// handlekey: rate
// score1: +1
// reason: 感謝大大分享


// 自动回复报道专区 normalthread_13694588 normalthread_13704863