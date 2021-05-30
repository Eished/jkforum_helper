// ==UserScript==
// @name         jkforum helper
// @namespace    https://www.jkforum.net/
// @version      0.1.2
// @description  自动签到，自动完成投票任务
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';
  addBtns();
})();

// 添加GUI
function addBtns() {
  let status_loginned = document.querySelector('.status_loginned');
  let mnoutbox = document.querySelectorAll('.mnoutbox');

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
function sign() {
  let formhash = document.querySelectorAll('#scbar_form input')[1].value; //hash 值
  let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=%E5%A5%BD%E6%83%B3%E7%9D%A1%E8%A6%BA&fastreply=1'; //post 报文
  let url = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1'; //请求链接

  var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接 false同步 true异步
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      var xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据

      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 提取错误信息
      let a = htmlData.querySelector('.c').innerHTML;
      console.log(a);
      // 提示信息
      alert(a);
    }
  };
}


// 申请投票任务
let urlApply = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';

function task(urlApply) {
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlApply, true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      console.log("task ok");
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
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlVote, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 找到链接
      let href = htmlData.querySelector('.voted a').href;
      console.log(href);
      // 分解链接
      vid = href.split('&')[2];
      console.log(vid);

      // 获取投票页 aid
      getAid(href);
    }
  };
}

// 获取aid
function getAid(vidUrl) {
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', vidUrl, true); //第二步：打开连接
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let data = httpRequest.responseText;
      // 数据类型转换成 html
      let htmlData = document.createElement('div');
      htmlData.innerHTML = data;
      // 找到链接
      let href = htmlData.querySelector('.hp_s_c a').href;
      console.log(href);
      // 分解链接
      aid = href.split('&')[2];
      console.log(aid);
      // 调用投票
      voted(aid, vid);
    }
  };
}
// 投票
function voted(aid, vid) {
  let formhash = document.querySelectorAll('#scbar_form input')[1].value; //hash 值
  let pMessage = 'formhash=' + formhash + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 报文
  // let aid = 13798; //投票目标
  let url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=' + aid + '&' + vid + ' & qr = & inajax = 1 '; //拼接投票链接

  var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      var xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据

      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      console.log(data);
      // 执行领奖励
      taskDone(urlDraw);
      // 提示信息
      alert(data);
    }
  };
}
// 领取投票任务奖励
let urlDraw = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';

function taskDone(urlDraw) {
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlDraw, false); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      console.log("task ok");
    }
  };
}