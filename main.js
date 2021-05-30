// ==UserScript==
// @name         jkforum helper
// @namespace    https://www.jkforum.net/
// @version      0.1
// @description  自动签到，自动申请任务，自动投票，自动使用道具
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
  // document.querySelector('#todaysay').value = "好想睡覺";
  // Your code here...
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
  task();
  // 签到
  sign();
  // 投票
  voted();
  // 领取投票奖励
  taskDone();
}

// 直接post签到数据

// id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1
// formhash=5971d33c&qdxq=ym&qdmode=1&todaysay=%E5%A5%BD%E6%83%B3%E7%9D%A1%E8%A6%BA&fastreply=1
// scbar_form formhash 5971d33c
function sign() {
  let formhash = document.querySelectorAll('#scbar_form input')[1].value; //hash 值
  let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=%E5%A5%BD%E6%83%B3%E7%9D%A1%E8%A6%BA&fastreply=1'; //post 报文
  let url = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1'; //请求链接

  var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, false); //第二步：打开连接 false同步 true异步
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


// 检查是否已经签到


// get投票页面 无用
function getVoted() {
  // let wall = document.getElementById('wall');
  // let formhash = wall.querySelectorAll('')[1].value; //hash 值
  // let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=%E5%A5%BD%E6%83%B3%E7%9D%A1%E8%A6%BA&fastreply=1'; //post 报文
  let aid = 13798;
  let url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&sid=0&aid=' + aid + '&vid=1114&qr=&sttneve=&hsahtneve=&infloat=yes&handlekey=dian&inajax=1&ajaxtarget=fwin_content_dian'; //请求链接页面

  var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('GET', url, false); //第二步：打开连接
  httpRequest.setRequestHeader("Content-Type", "text/xml; charset=utf-8"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(); //发送请求 将情头体写在send中
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
      let a = htmlData.querySelector('.alert_right').innerHTML;
      console.log(a);
      // 提示信息
      alert(a);
    }
  };
}

// 投票
function voted() {
  let formhash = document.querySelectorAll('#scbar_form input')[1].value; //hash 值
  let pMessage = 'formhash=' + formhash + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 报文
  let aid = 13798; //投票目标
  let url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=' + aid + '&vid=1114&qr=&inajax=1'; //请求链接

  var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, false); //第二步：打开连接
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      var xmlRepo = httpRequest.responseXML; //获取到服务端返回的数据

      let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
      // // 数据类型转换成 html
      // let htmlData = document.createElement('div');
      // htmlData.innerHTML = data;
      // // 提取错误信息
      // let a = htmlData.querySelector('.c').innerHTML;
      console.log(data);
      // 提示信息
      alert(data);
    }
  };
}

// https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=13794&vid=1114&qr=&inajax=1
// application/x-www-form-urlencoded
// id=voted&ac=dian&aid=13794&vid=1114&qr=&inajax=1
// formhash=9310b72f&inajax=1&handlekey=dian&sid=0&message=1

// https://www.jkforum.net/plugin/?id=voted&ac=dian&sid=0&aid=13798&vid=1114&qr=&sttneve=&hsahtneve=&infloat=yes&handlekey=dian&inajax=1&ajaxtarget=fwin_content_dian
// <?xml version="1.0" encoding="utf-8"?>
// <root><![CDATA[<h3 class="flb"><em>提示訊息</em><span><a href="javascript:;" class="flbc" onclick="hideWindow('dian');" title="關閉">關閉</a></span></h3>
// <div class="c altw">
// <div class="alert_right">您沒權限參與投票！<script type="text/javascript" reload="1">if(typeof errorhandle_dian=='function') {errorhandle_dian('您沒權限參與投票！', {});}hideWindow('dian');showDialog('您沒權限參與投票！', 'right', null, null, 0, null, null, '', '', 6, null);</script></div>
// </div>
// <p class="o pns">
// <button type="button" class="pn pnc" id="closebtn" onclick="hideWindow('dian');"><strong>確定</strong></button>
// <script type="text/javascript" reload="1">if($('closebtn')) {$('closebtn').focus();}</script>
// </p>
// ]]></root>


// <?xml version="1.0" encoding="utf-8"?>
// <root><![CDATA[<script type="text/javascript" reload="1">if(typeof succeedhandle_dian=='function') {succeedhandle_dian('https://www.jkforum.net/plugin.php?id=voted', '投票成功，感謝您的參與！', {});}hideWindow('dian');showDialog('投票成功，感謝您的參與！', 'notice', null, function () { window.location.href ='https://www.jkforum.net/plugin.php?id=voted'; }, 0, null, null, '', '', null, 6);</script>]]></root>

// 签到

// 申请投票任务
let urlApply = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';

function task(urlApply) {
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlApply, false); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      // var json = httpRequest.responseText; //获取到json字符串，还需解析
      // console.log(json);
      console.log("task ok");
    }
  };
}

// 领取投票任务奖励
let urlDraw = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';

function taskDone(urlDraw) {
  var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
  httpRequest.open('GET', urlDraw, false); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      // var json = httpRequest.responseText; //获取到json字符串，还需解析
      // console.log(json);
      console.log("task ok");
    }
  };
}


// 使用道具

// <?xml version="1.0" encoding="utf-8"?>
// <root><![CDATA[<script type="text/javascript" reload="1">
// setTimeout("hideWindow('qwindow')", 10000);
// </script>
// <div class="f_c">
// <h3 class="flb">
// <em id="return_win">簽到提示</em>
// <span>
// <a href="javascript:;" class="flbc" onclick="hideWindow('qwindow')" title="關閉">關閉</a></span>
// </h3>
// <div class="c">
// 對不起，您所在的用戶組未被加入允許簽到的行列. </div>
// </div>
// ]]></root>



// 采用DOMParser实现
//     var str="<div>"
//             +"<div id='div1'>"
//                 +"<div id='div1_1'>div1-1</div>"
//                 +"<div id='div1_2'>div1-2</div>"
//             +"</div>"
//             +"<div id='div2'>"
//                 +"<div id='div2_1'>div2-1</div>"
//                 +"<div id='div2_2'>div2-2</div>"
//             +"</div>";
//           +"/div>";
//     var parser = new DOMParser();
//     var doc=parser.parseFromString(str, "text/xml");
//     console.log(doc.getElementById('div1'). innerHTML);


// <?xml version="1.0" encoding="utf-8"?>
// <root><![CDATA[
// <script>
// jQuery('document').ready(function($){
// $('#form_dian').submit(function(){
// $('#sendVote').css('display', 'none');
// $('#plswait').css('display', 'inline');
// });
// });
// </script>
// <h3 class="flb">
// <em>會員每日有 1 次投票機會，您還有 1 次。</em>
// <span><a href="javascript:;" onclick="hideWindow('dian');" class="flbc" title="關閉">關閉</a></span>
// </h3>
// <form action="plugin/?id=voted&amp;ac=dian&amp;aid=13794&amp;vid=1114&amp;qr=" onsubmit="ajaxpost(this.id, 'form_dian');" id="form_dian" name="form_dian" method="POST">
// <input type="hidden" value="9310b72f" name="formhash" />
// <input type="hidden" name="inajax" value="1">
// <input type="hidden" name="handlekey" value="dian">
// <input type="hidden" name="sid" value="0">
// <div class="c bart">
// <p>請輸入投票原因</p>
// <textarea name="message" rows="5" style="width:400px" class="pt"></textarea>
// </div>
// <div class="o pns">
// <button type="submit" id="sendVote" class="pn pnc xs2"><strong>送出投票</strong></button>
// <span style="display:none;" id="plswait">投票送出中，請稍候...</span>
// </div>
// </form>

// ]]></root>