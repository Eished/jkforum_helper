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
  document.querySelector('body').appendChild(genDiv()); // 消息盒子添加到body

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
  let urlApply = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';
  // 申请任务
  task(urlApply);
  // 签到
  sign();
}

// 签到 直接post签到数据
const formhash = document.querySelectorAll('#scbar_form input')[1].value; // 全局用户hash值
function sign() {
  const todaysay = '好想睡覺~'; //签到输入内容
  let pMessage = 'formhash=' + formhash + '&qdxq=ym&qdmode=1&todaysay=' + turnUrl(todaysay) + '&fastreply=1'; //post 报文
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
      const pMessage = 'formhash=' + formhash + '&inajax=1&handlekey=dian&sid=0&message=1'; //post 投票报文
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
  replyMessage = document.querySelector('#inp1').value; // 获取回复内容
  GM_setValue('reply', replyMessage); // 油猴脚本存储回帖内容
  const currentHref = window.location.href; // 获取当前页地址
  if (currentHref.split('-')[0] == 'https://www.jkforum.net/forum') {
    fid = currentHref.split('-')[1]; // 获取板块fid

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
      randomTime = Math.ceil(Math.random() * 1000) + 11000;
      let i = 0;
      // 遍历所有帖子链接并感谢
      if (confirm("确认开始感谢并回帖？否则感谢本页帖子！")) { //确认回帖
        let timer = setInterval(() => {
          if (i < hrefs.length) {
            const href = hrefs[i].href;
            // 获取帖子ID
            const tid = href.split('-')[1]; // 无前缀 数字
            const touser = tousers[i]; // 无前缀 字符串
            const touserUid = touserUids[i]; //无前缀 数字
            // 拼接感谢报文
            const thkData = 'formhash=' + formhash + '&tid=' + tid + '&touser=' + touser + '&touser' + touserUid + '&handlekey=k_thankauthor&addsubmit=true';
            // 执行感谢函数
            const thkReqUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1'; //请求地址
            postData(thkReqUrl, thkData, 'thk'); //post感谢数据

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
            // randomTime += Math.ceil(Math.random() * 5000) + 11000;
            // POST回帖数据 必须间隔10秒以上+随机数1-10
            postData(replyUrl, replyData, 'reply');
            i++;
          } else if (i == hrefs.length) {
            clearInterval(timer);
            alert("全部回帖完成！");
          }
          console.log(randomTime, i, hrefs.length);
        }, randomTime);
        messageBox('正在回帖中... 需要' + (randomTime * hrefs.length / 1000 / 60).toFixed(2) + '分钟！如无需回帖，请关闭/刷新页面。请保持本页面前台，否则会导致进程休眠无法正常运行！', 'none');
      } else {
        for (i = 0; i < hrefs.length; i++) {
          const href = hrefs[i].href;
          // 获取帖子ID
          const tid = href.split('-')[1]; // 无前缀 数字
          const touser = tousers[i]; // 无前缀 字符串
          const touserUid = touserUids[i]; //无前缀 数字
          // 拼接感谢报文
          const thkData = 'formhash=' + formhash + '&tid=' + tid + '&touser=' + touser + '&touser' + touserUid + '&handlekey=k_thankauthor&addsubmit=true';
          // 执行感谢函数
          const thkReqUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1'; //请求地址
          postData(thkReqUrl, thkData, 'thk'); //post感谢数据
        }
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

      // 判断调用来源，选择对应处理方式
      if (fromId == 'reply') { //回帖
        if (checkHtml(stringOrHtml)) { // 确认html
          const info = stringOrHtml.querySelector('script').innerHTML.split(`, `)[1];
          messageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
        } else {
          messageBox(stringOrHtml, 'none'); //其它情况直接输出
        }
      } else if (fromId == 'sign') { //签到
        if (checkHtml(stringOrHtml)) { // 确认html
          const info = stringOrHtml.querySelector('.c').innerHTML.split('<')[0]; // 解析html，返回字符串
          messageBox(info, 'none');
        } else {
          messageBox(stringOrHtml); //其它情况直接输出
        }
      } else if (fromId == 'voted') { //投票
        if (checkHtml(stringOrHtml)) {
          let info = '';
          if (stringOrHtml.querySelector('.alert_info')) {
            info = stringOrHtml.querySelector('.alert_info').innerHTML; // 解析html，返回字符串，失败警告
          } else if (stringOrHtml.querySelector('script')) {
            info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
          } else {
            info = "投票返回HTML数据识别失败: " + stringOrHtml;
          }
          messageBox(info, 'none');
        } else {
          messageBox(stringOrHtml); //其它情况直接输出
        }
        const urlDraw = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';
        taskDone(urlDraw); // 执行领奖励
      } else if (fromId == 'thk') { //感谢
        if (checkHtml(stringOrHtml)) {
          const info = replaceHtml(stringOrHtml.querySelector('.alert_info').innerHTML); //去除html，返回字符串
          messageBox(info);
        } else {
          messageBox(stringOrHtml); //其它情况直接输出
        }
      } else {
        messageBox(stringOrHtml); //其它情况直接输出
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