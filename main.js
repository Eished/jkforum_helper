// ==UserScript==
// @name         jkforum helper
// @namespace    https://www.jkforum.net/
// @version      0.2.0
// @description  捷克论坛助手，自动签到，自动投票任务，一键批量感谢，自动回帖
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  'use strict';
  addBtns();
})();

// 添加GUI
function addBtns() {
  let status_loginned = document.querySelector('.status_loginned');
  let mnoutbox = document.querySelectorAll('.mnoutbox');

  // 生产消息盒子
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
  // 回帖输入框
  const input = genElement('textarea', 'inp1', 1, 20);
  status_loginned.insertBefore(input, mnoutbox[1]); //添加按钮到指定位置


  // 感谢 按钮
  const thkBtn = genButton('感谢/回帖', thankauthor); //设置名称和绑定函数
  status_loginned.insertBefore(thkBtn, mnoutbox[1]); //添加按钮到指定位置

  // 签到按钮
  const btn = genButton('签到/投票', launch); //设置名称和绑定函数
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
const todaysay = '好想睡覺~'; //签到输入内容

function sign() {
  let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=' + turnUrl(todaysay) + '&fastreply=1'; //post 报文
  let url = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1'; //请求链接

  const httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接 false同步 true异步
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      const data = turnCdata(httpRequest.responseXML); //返回HTML数据或字符串
      // 如果是html则输出html内容
      if (checkHtml(data)) {
        const info = data.querySelector('.c').innerHTML.split('<')[0]; // 解析html，返回字符串
        messageBox(info, 'none');
      } else {
        messageBox(data);
      }
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
let vid = null; // 纯数字
let aid = null; // 纯数字

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
      vid = href.split('&')[2].split('=')[1]; // 纯数字

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
      aid = href.split('&')[2].split('=')[1]; // 纯数字
      // 调用投票
      voted(aid, vid);
    }
  };
};
// <script type="text/javascript" reload="1">if(typeof succeedhandle_dian=='function') {succeedhandle_dian('https://www.jkforum.net/home.php?mod=space&do=notice', '投票成功，感謝您的參與！', {});}hideWindow('dian');showDialog('投票成功，感謝您的參與！', 'notice', null, function () { window.location.href ='https://www.jkforum.net/home.php?mod=space&do=notice'; }, 0, null, null, '', '', null, 6);</script>

// 投票
function voted(aid, vid) {
  let pMessage = 'formhash=' + formhash + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 报文
  // let aid = 13798; //投票目标
  let url = 'https://www.jkforum.net/plugin/?id=voted&ac=dian&aid=' + aid + '&vid=' + vid + ' & qr = & inajax = 1 '; //拼接投票链接

  const httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
  httpRequest.open('POST', url, true); //第二步：打开连接
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
  httpRequest.send(pMessage); //发送请求 将情头体写在send中
  httpRequest.onreadystatechange = function () { //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) { //验证请求是否发送成功
      const data = turnCdata(httpRequest.responseXML); //返回HTML数据或字符串
      // 如果是html则输出html内容
      if (checkHtml(data)) {
        let info = '';
        if (data.querySelector('.alert_info')) {
          info = turnCdata(data.querySelector('.alert_info').innerHTML); // 解析html，返回字符串，失败警告
        } else if (data.querySelector('script')) {
          info = data.querySelector('script').innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
        } else {
          info = "投票返回HTML数据识别失败: " + data;
        }
        messageBox(info, 'none');
      } else {
        messageBox(data);
      }
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
  const date = new Date;
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

function thankauthor() {
  // 获取回复内容
  replyMessage = document.querySelector('#inp1').value;
  // 油猴脚本存储回帖内容
  GM_setValue('reply', replyMessage);
  // 获取当前页地址
  const currentHref = window.location.href;
  if (currentHref.split('-')[0] == 'https://www.jkforum.net/forum') {
    // 获取板块fid
    fid = currentHref.split('-')[1];

    // 判断当前页是否处于图片模式
    if (document.querySelector('.showmenubox').querySelector('[class="chked"]')) {
      // 图片模式则切换为列表模式
      getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes');
      if (confirm("是否切换到列表模式并刷新页面？")) {
        location.reload();
      } else {
        messageBox('无法在图片模式运行！')
      }
    } else {
      // 获取当前页所有帖子地址
      getThreads(currentHref);
    }

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
      // 遍历去除回帖用户
      for (let i = 0; i < cites.length; i += 2) {
        // 加入数组
        tousers.push(cites[i].innerHTML);
        touserUids.push(cites[i].href.split('&')[1]);
      }
      // 执行回帖函数和感谢函数 必须间隔10秒以上+随机数10-100毫秒
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
        // 拼接回帖url
        const replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&fid=' + fid + '&tid=' +
          tid + '&extra=page%3D1&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1';
        // 生产时间戳
        const date = new Date();
        const posttime = parseInt(date.getTime() / 1000);
        // 拼接回帖报文
        const replyData = 'message=' + turnUrl(replyMessage) + '&posttime=' + posttime + '&formhash=' + formhash + '&usesig=1&subject=++';
        // 计时器累加，实现间隔10000+5000*(0.1~1)毫秒以上
        randomTime += Math.ceil(Math.random() * 5000) + 11000;
        setTimeout(() => {
          // POST回帖数据 必须间隔10秒以上+随机数1-10
          postData(replyUrl, replyData);
        }, randomTime);
      };
      messageBox('正在回帖中... 总共需要' + (randomTime / 1000 / 60).toFixed(1) + '分钟！如无需回帖，请关闭/刷新页面。', randomTime);
      setTimeout(() => {
        messageBox("全部回帖完成！", 'none');
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
      const data = turnCdata(httpRequest.responseXML); //返回HTML数据
      // 如果是html则输出html内容
      if (checkHtml(data)) {
        const info = replaceHtml(data.querySelector('.alert_info').innerHTML); //去除html，返回字符串
        messageBox(info);
      } else {
        messageBox(data);
      }
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
function postData(replyUrl, replyData, type) {
  // 传输数据类型判断,默认 'application/x-www-form-urlencoded'
  if (type) {} else {
    type = 'application/x-www-form-urlencoded';
  }
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', replyUrl, true); //同步写法会时区响应
  httpRequest.setRequestHeader('content-Type', type);
  httpRequest.send(replyData); // post数据
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      // 提取Cdata返回html,错误数据则直接输出
      const replyRespo = turnCdata(httpRequest.responseXML);
      if (replyUrl.split('?')[0] == 'https://www.jkforum.net/forum.php') {
        if (!checkHtml(replyRespo)) {
          // xml错误消息
          messageBox(replyRespo);
        } else {
          const info = replyRespo.querySelector('script').innerHTML.split(`, `)[1];
          // 返回html成功消息
          messageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！');
        }
        // 返回xml字符串或者html
        return replyRespo;
      } else {
        console.log(replyRespo);
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
    var reg = /<[^>]+>/g;
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
// 自动评分
// Request URL: https://www.jkforum.net/forum.php?mod=misc&action=rate&ratesubmit=yes&infloat=yes&inajax=1
// content-type: application/x-www-form-urlencoded
// formhash: 
// tid: 13684758
// pid: 140618316
// referer: https://www.jkforum.net/forum.php?mod=viewthread&tid=13684758&page=0#pid140618316
// handlekey: rate
// score1: +1
// reason: 感謝大大分享


// 自动回帖报道专区 normalthread_13694588 normalthread_13704863