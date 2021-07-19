// ==UserScript==
// @name         JKForum 助手
// @name:en      JKForum Helper
// @name:zh-TW   JKForum 助手
// @name:ja      JKForum 助手
// @name:ko      JKForum 조수
// @namespace    https://github.com/Eished/jkforum_helper
// @version      0.5.5
// @description        捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片
// @description:en     JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image
// @description:zh-TW  捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片
// @description:ja     自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード
// @description:ko     체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오.
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @exclude      *.jkforum.net/member*
// @icon         https://www.google.com/s2/favicons?domain=jkforum.net
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js
// @connect      mymypic.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_info
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_addElement
// @grant        GM_download
// ==/UserScript==

(async function () {
  'use strict';

  function newUser(username, formhash) {
    const user = {
      username: username,
      formhash: formhash,
      version: GM_info.script.version,
      today: '', // 签到日期
      signtime: '23:59:59', // 定时签到时间
      signNum: 10, // 定时签到重试次数
      interTime: 200, // 定时签到重试间隔时间ms
      todaysay: '簽到', // 签到输入内容
      mood: 'fd', // 签到心情
      autoPlayDiff: 2000, // 自动播放图片间隔时间ms
      autoPaySw: 1, // 自动支付开关
      autoThkSw: 1, // 自动感谢开关
      autoRePicSw: 1, // 自动加载原图开关
      differ: 10000, // 回帖随机间隔时间ms
      interval: 20000, // 回帖基础间隔时间ms
      thkDiffer: 1000, // 批量感谢间隔时间ms
      page: '', // 批量回帖页码
      votedMessage: '+1', // 投票输入内容
      userReplyMessage: [], // 用户保存的回复，历史回帖内容
      fastReply: [], // 保存的快速回复，快速回帖内容
      replyThreads: [], // 回帖任务数据
      applyVotedUrl: 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59',
      votedUrl: 'https://www.jkforum.net/plugin.php?',
      taskDoneUrl: 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59',
      signUrl: 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1',
      thkUrl: 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1',
      payUrl: 'https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1',
      fastReplyUrl: 'https://www.jkforum.net/thread-8364615-1-1.html',
      replyUrl: "https://www.jkforum.net/forum.php?mod=post&action=reply&",
    }
    return user;
  }

  async function creatUser() {
    const formhash = document.querySelector('.listmenu li a').href.split('&')[2].split('=')[1];
    const username = document.querySelector('.avatar_info').querySelector('a').innerHTML;
    let user = getUserFromName();
    if (!user) { // 空则写入，或版本变动写入
      user = newUser(username, formhash);
      user = await setFastReply(user); // 设置快速回复
      GM_setValue(username, user);
      messageBox("添加用户成功！");
    } else if (user.version != GM_info.script.version) {
      const userMod = newUser(username, formhash);
      const compa = compaObjKey(userMod, user); // 比较key
      if (compa) { // key相同 只改变版本
        user.version = GM_info.script.version; // 记录新版本
      } else { // key不同
        user.version = GM_info.script.version; // 记录新版本
        user = copyObjVal(userMod, user); // 对newUser赋值
        messageBox("数据更新成功！");
      }
      messageBox("版本更新成功！请阅读使用说明。");
      user = await setFastReply(user); // 设置快速回复
      GM_setValue(username, user);
    }
    if (user.formhash != formhash) { // formhash 变动存储
      user.formhash = formhash;
      GM_setValue(username, user);
    }
    return user;
  }

  function getUserFromName() { // 从用户名获取对象
    const username = document.querySelector('.avatar_info').querySelector('a').innerHTML; // 用户名判断唯一用户
    return GM_getValue(username);
  }

  async function setFastReply(user) { // 设置快速回复
    const htmlData = await getData(user.fastReplyUrl);
    const options = htmlData.querySelectorAll('#rqcss select option');
    let fastReply = []; //返回数组
    options.forEach(option => {
      if (option.value) { //去掉空值
        fastReply.push(replaceHtml(option.value)); //去掉需要转义的内容
      }
    });
    if (fastReply.length) {
      user.fastReply = fastReply;
      messageBox("获取快速回复成功！");
    } else {
      messageBox("获取快速回复失败！");
    }
    return user;
  }
  // 启动
  async function launch() {
    rePic(); // 启动自动加载原图，自动感谢等；
    if (user.username) { //验证是否登录 //天变动则签到
      const now = new NowTime();
      if (user.today != now.day) {
        user.today = now.day;
        sign(); // 签到

        await getData(user.applyVotedUrl); // 申请任务
        messageBox("申请投票任务执行成功！正在投票请勿退出页面...");
        // 投票请求链接
        const votedUrlParams = urlSearchParams({
          "id": "voted"
        }).toString();
        const htmlData = await getData(user.votedUrl + votedUrlParams);
        const vidUrl = htmlData.querySelector('.voted a').href; // 找到链接
        const vid = vidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接

        const hrefHtmlData = await getData(vidUrl);
        const aidUrl = hrefHtmlData.querySelector('.hp_s_c a').href; // 找到链接
        const aid = aidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接
        // 投票请求链接数据
        const votedParams = urlSearchParams({
          "id": "voted",
          "ac": "dian",
          "aid": aid,
          "vid": vid,
          "qr": "",
          "inajax": 1,
        }).toString();
        // Post 数据
        const votedParamsData = urlSearchParams({
          "formhash": user.formhash,
          "inajax": 1,
          "handlekey": "dian",
          "sid": 0,
          "message": user.votedMessage,
        }).toString();
        // 投票
        const votedMessage = await postDataAs(user.votedUrl + votedParams, votedParamsData);
        if (checkHtml(votedMessage)) {
          let info = '';
          if (votedMessage.querySelector('.alert_info')) {
            info = votedMessage.querySelector('.alert_info').innerHTML; // 解析html，返回字符串，失败警告
            messageBox(info);
          } else if (votedMessage.querySelector('script')) {
            info = votedMessage.querySelector('script').innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
            messageBox(info);
            await getData(user.taskDoneUrl); // 执行领奖励
            messageBox('领取投票奖励成功！');
          }
        } else {
          messageBox(votedMessage); //其它情况直接输出
        }
        GM_setValue(user.username, user); //保存当天日// today 初始化
      }
    } else {
      messageBox('未登录');
    }
  }

  // 加载原图，启动自动感谢、自动支付、自动播放
  async function rePic() {
    if (window.location.href.match('thread')) {
      if (user.autoThkSw) { // 自动感谢当前贴开关
        await thankThread(); // 自动感谢当前贴
      }
      if (user.autoPaySw) { // 自动购买当前贴开关
        await autoPay(); // 自动购买当前贴
      }
      const tfImg = document.querySelectorAll('.t_f ignore_js_op img'); //获取图片列表，附件也是ignore_js_op
      if (tfImg && user.autoRePicSw) { // 加载原图开关
        for (let i = 0; i < tfImg.length; i++) { //遍历图片列表
          const img = tfImg[i]
          img.setAttribute('onmouseover', null); // 去掉下载原图提示
          if (img.src.match('.thumb.')) { // 去掉缩略图 加载部分
            img.src = img.getAttribute('file').split('.thumb.')[0];
            messageBox('加载原图成功', 1000)
            console.log('thumb：', img.src);
          } else if (img.src.match('static/image/common/none.gif') && img.getAttribute('file')) { // 懒加载部分
            if (img.getAttribute('file').match(".thumb.")) {
              img.setAttribute('file', img.getAttribute('file').split('.thumb.')[0]); // 网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
              messageBox('加载原图成功', 1000)
              console.log('none.gif:', img.getAttribute('file'));
            }
          }
        }
      }
      const zoomimgs = document.querySelectorAll(`[zoomfile]`); //获取图片列表
      if (zoomimgs) { // 自动播放
        for (let i = 0; i < zoomimgs.length; i++) { //遍历图片列表
          zoomimgs[i].addEventListener("click", autoPlay);
        }
      }
      const onclickzoomimgs = document.querySelectorAll(`[onclick="zoom(this, this.src, 0, 0, 0)"]`); //获取图片列表
      if (onclickzoomimgs) { // 自动播放
        for (let i = 0; i < onclickzoomimgs.length; i++) { //遍历图片列表
          onclickzoomimgs[i].addEventListener("click", autoPlay);
        }
      }
    }
  }
  // 自动播放图片
  async function autoPlay() {
    const append_parent = document.querySelector("#append_parent"); // 监听子节点
    if (append_parent.timer) { // 防重复点击、添加
      return;
    }
    append_parent.timer = 1; // 已添加标志

    function callback() { // 监听元素子节点变化，然后添加节点
      // 按钮也是延迟加载，监听是否有 .y
      if (imgzoom.querySelector(".y")) {
        observer.disconnect(); // 断开监听
        addAutoPlay(); // 添加按钮
      } else {
        console.log("不存在 .y 元素，正在重试...");
      }
    }
    const observer = new MutationObserver(callback); // 建立监听器
    observer.observe(append_parent, { // 开始监听 append_parent
      childList: true
    })
  }
  // 添加播放图片按钮、事件
  function addAutoPlay() {
    const imgzoom = document.querySelector("#imgzoom");
    const imgzoom_cover = document.querySelector("#imgzoom_cover");
    const y = imgzoom.querySelector(".y");
    const imgzoom_imglink = imgzoom.querySelector("#imgzoom_imglink");
    const a = document.createElement("a");
    a.id = "autoplay";
    a.title = "自动播放/停止播放";
    a.innerHTML = "自动播放/停止播放";
    a.href = "javascript:void(0);";
    a.addEventListener("click", play); // 添加监听播放事件
    a.style.cssText = `background: url(../../template/yibai_city1/style/common/arw_l.gif) rgb(241, 196, 15) center no-repeat;transform: rotate(180deg);width: 60px;height: 18px;overflow: hidden;`;
    y.insertBefore(a, imgzoom_imglink); // 添加按钮
    // 遮挡暂停
    window.onblur = function () {
      a.timer = 0; // 暂停
    };
    // 点击背景层暂停
    imgzoom_cover.addEventListener("click", () => {
      a.timer = 0;
    }); // 暂停

    async function play() {
      if (!a.timer) {
        a.timer = 1;
        while (true) {
          await waitFor(user.autoPlayDiff);
          if (a.timer == 0) {
            break;
          }
          if (imgzoom.querySelector(".zimg_next")) {
            imgzoom.querySelector(".zimg_next").click();
          } else { // 只有一张图
            messageBox("只有一张图！");
            return;
          }
        }
      } else {
        a.timer = 0;
      }
    }
  }
  // 自动支付
  async function autoPay() {
    if (document.querySelector('.viewpay')) {
      const url = user.payUrl;
      const referer = location.href;
      const tid = referer.split('-')[1];
      const pData = `formhash=${user.formhash}&referer=${turnUrl(referer)}&tid=${tid}&handlekey=pay`
      const stringOrHtml = await postDataAs(url, pData);
      if (checkHtml(stringOrHtml)) { // 确认html
        const info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1);
        messageBox(info);
        location.reload();
      } else {
        messageBox(stringOrHtml); //其它情况直接输出
      }
    }
  }
  // 自动感谢
  async function thankThread() {
    if (document.querySelector('#thankform') && document.querySelectorAll('#k_thankauthor')[1]) { //感谢可见
      await thankThreadPost();
      location.reload();
    } else if (document.querySelector('#thankform') && document.querySelectorAll('#k_thankauthor')[0]) { //普通贴
      await thankThreadPost();
    }
  };
  // 发送感谢请求
  async function thankThreadPost() {
    const thankform = document.querySelector('#thankform');
    const tid = thankform.querySelector('[name=tid]').value;
    const touser = thankform.querySelector('[name=touser]').value;
    const touseruid = thankform.querySelector('[name=touseruid]').value;
    const thkParamsData = urlSearchParams({
      "formhash": user.formhash,
      "tid": tid,
      "touser": touser,
      "touseruid": touseruid,
      "handlekey": "k_thankauthor",
      "addsubmit": "true"
    }).toString();
    const xmlData = await postDataAs(user.thkUrl, thkParamsData); //post感谢数据
    if (checkHtml(xmlData)) {
      const info = xmlData.querySelector('.alert_info').innerHTML.split('<')[0].trim(); //去除html，返回字符串
      messageBox(info);
    } else {
      messageBox(xmlData); //其它情况直接输出
    }
  }

  // 添加GUI
  function addBtns() {
    // 增加 visited 样式，图片模式已阅的帖子变灰色 
    GM_addStyle(`.xw0 a:visited {color: grey;}`);
    if (window.location.href.match('/forum-') || window.location.href.match('/type-') || window.location.href.match('mod=forum')) { // 去掉高亮颜色标题
      document.querySelectorAll('[style="color: #2B65B7"]').forEach((e) => {
        e.style = '';
      })
    }

    // 消息盒子
    function genDiv() {
      let b = document.createElement('div'); //创建类型为div的DOM对象
      b.style.cssText = 'width: 220px;float: left;position: fixed;border-radius: 10px;left: auto;right: 5%;bottom: 20px;z-index:999';
      b.id = 'messageBox';
      return b; //返回修改好的DOM对象
    };
    document.querySelector('body').appendChild(genDiv()); // 消息盒子添加到body

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
      const input = genElem('textarea', 'inpreply', 1, 20);
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
      const input = genElem('textarea', 'inpreply', 1, 20);
      status_loginned.insertBefore(input, mnoutbox[1]); //添加文本域到指定位置  
      // 页码输入框
      const page = genInp('input', 'inp_page');
      status_loginned.insertBefore(page, mnoutbox[1]); //添加输入框到指定位置
      // 批量感谢/回帖
      const btn = genButton('添加任务', thankBatch); //设置名称和绑定函数
      status_loginned.insertBefore(btn, mnoutbox[1]); //添加按钮到指定位置
    } else if (window.location.href.match('thread')) {
      // 回帖 按钮
      const repBtn = genButton('下载图片', downloadImgs); //设置名称和绑定函数
      status_loginned.insertBefore(repBtn, mnoutbox[1]); //添加按钮到指定位置

    }
  };

  function replyBtn() {
    if (!this.timer) {
      replyOrThk(this, 'reply');
    }
  }

  function thkBtn() {
    if (!this.timer) {
      replyOrThk(this, 'thk');
    }
  }

  // 定时签到
  function timeControl() {
    const _this = this;
    const signtime = user.signtime; // 设定签到时间
    async function control() {
      const now = new NowTime(); // 获取当前时间，到秒
      if (now.seconds == signtime) {
        clearInterval(_this.timer);
        messageBox('执行中....');
        for (let i = 0; i < user.signNum; i++) { //重试次数
          sign();
          messageBox('执行第' + (i + 1) + '次');
          await waitFor(user.interTime); //重试间隔
        }
      } else {
        console.log('时间没有到：', signtime, '目前时间：', now.seconds);
      }
    }
    if (!this.timer) { // 防重复点击
      document.querySelector('#video1').play(); // 播放视频，防止休眠
      if (!document.querySelector('#video1').paused) {
        const date = new Date()
        const holdTime = date.getTime();
        // 1000*60*60*24
        const hold = ((1000 * 60 * 60) - holdTime % (1000 * 60 * 60)); //通知持续时间，1小时-已运行分钟
        messageBox('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', hold);
        messageBox('定时签到中，请勿退出...', hold);
      } else {
        console.log(document.querySelector('#video1'));
      }
      this.timer = setInterval(control, 500);
    }
  }

  async function sign() {
    const signParamsData = urlSearchParams({
      "formhash": user.formhash,
      "qdxq": user.mood,
      "qdmode": 1,
      "todaysay": user.todaysay,
      "fastreply": 1,
    }).toString();
    const stringOrHtml = await postDataAs(user.signUrl, signParamsData); // 直接post签到数据
    if (checkHtml(stringOrHtml)) { // 确认html
      const info = stringOrHtml.querySelector('.c').innerHTML.split('<')[0].trim(); // 解析html，返回字符串
      messageBox(info);
    } else {
      messageBox(stringOrHtml); //其它情况直接输出
    }
  }

  /**
   * 生成不重复的ID
   * @param { Number } randomLength 
   */
  function getUuiD(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
  }
  // 消息通知弹窗
  function messageBox(text, setTime = 5000, important = 1) {
    function genBox(text, id) {
      let b = document.createElement('div');
      b.textContent = text; //修改内部文本为text
      b.style.cssText = 'width:100%;background-color:#64ce83;float:left;padding:5px 10px;margin-top:10px;border-radius:10px;color:#fff;    box-shadow: 0px 0px 1px 3px #ffffff;';
      b.id = id;
      return b; //返回修改好的DOM对象
    };
    const timeId = 'a' + getUuiD(10); // 生成 id 
    const textBox = genBox(text, timeId); // 初始化消息盒子
    const messageBox = document.querySelector('#messageBox');
    if (important == 0) {
      console.log(text);
    } else if (important == 1) { // 通知级别，默认 1
      messageBox.appendChild(textBox); // 显示消息
      console.log(text);
    } else if (important > 1) {
      messageBox.appendChild(textBox); // 显示消息
      console.log(text);
      GM_notification(text);
    } else {
      messageBox.appendChild(textBox); // 显示消息
    }
    if (setTime && !isNaN(setTime)) { // 默认5秒删掉消息，可设置时间，none一直显示
      setTimeout(() => {
        messageBox.removeChild(document.getElementById(timeId));
      }, setTime);
    }
    return timeId;
  }

  function removeMessage(id) {
    const messageBox = document.querySelector('#messageBox');
    messageBox.removeChild(document.getElementById(id));
  }

  function chooceReply() {
    const inpreply = document.querySelector('#inpreply'); // 获取回复内容
    if (inpreply && inpreply.value) {
      let replyLen = 0; // 统计长度，用于在 user.userReplyMessage 中定位下标
      inpreply.value.split('；').forEach((element) => { // 中文分号分隔字符串
        if (element) {
          user.userReplyMessage.push(element); // 存储自定义回帖内容
          replyLen++;
        }
      })
      GM_setValue(user.username, user); // 油猴脚本存储回帖内容
      messageBox("已使用自定义回复");
      return replyLen;
    } else {
      if (user.fastReply.length && confirm("确认使用快速回复？否则使用历史回复")) { // 1 为错误信息
        GM_setValue(user.username, user); // 油猴脚本存储回帖内容
        messageBox("已使用快速回复");
        return user.fastReply.length;
      } else if (user.userReplyMessage.length && confirm("确认使用历史自定义回复？")) {
        GM_setValue(user.username, user); // 油猴脚本存储回帖内容
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
    const page = currentHref.split('-')[2].split('.')[0]; // 获取页码
    thankBatch(`${fid}-${page}-${page}`); // 使用批量感谢
  }

  async function thankBatch(onePage) {
    const reg = new RegExp(/^\d+-\d+-\d+$/);
    let forumPage = '';
    if (reg.test(onePage)) { // 如果输入了正确地址单页
      forumPage = onePage;
    } else {
      forumPage = document.querySelector('#inp_page').value;
    }
    if (reg.test(forumPage)) { // 如果输入了正确地址则进行批量处理
      messageBox('正在添加：' + forumPage);
      user.page = forumPage;
      GM_setValue(user.username, user);
      let pageFrom = parseInt(forumPage.split('-')[1]); // 获取起点页码
      const pageEnd = parseInt(forumPage.split('-')[2]); // 获取终点页码
      const fid = forumPage.split('-')[0]; // 获取版块代码

      await getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes'); // 切换到列表模式，同步请求。
      messageBox('已切换到列表模式');

      let replyLen = chooceReply(); //如果输入了值则使用用户值，如果没有则使用默认值；没有默认值则返回错误
      if (replyLen <= 0) {
        messageBox('获取回帖内容失败！');
        return "获取回帖内容失败！";
      };

      while (pageFrom <= pageEnd) {
        let currentHref = 'https://www.jkforum.net/forum-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
        messageBox('当前地址：' + currentHref + '页码：' + pageFrom);
        const data = await getData(currentHref);
        setThreadsTask(data, fid, replyLen); // 设置任务列表
        pageFrom++;
      }
    } else {
      messageBox('请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1', 10000);
    }
  }
  // 添加任务列表
  function setThreadsTask(htmlData, fid, replyLen) {
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
            addThrInfo(user.replyThreads[i]);
            user.replyThreads[i].fidTime += fidTime; // 累加时间
            GM_setValue(user.username, user);
            return; // 匹配到则退出循环 // 传入对应对象
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
    }

    function addThrInfo(elem) {
      // 遍历去除回帖用户
      let count = 0;
      for (let i = 0; i < cites.length; i += 2) {
        // 加入数组
        const touser = cites[i].innerHTML;
        const touseruid = cites[i].href.split('uid=')[1]; // href="home.php?mod=space&uid=1123445"
        const href = hrefs[i / 2].href;
        const tid = href.split('-')[1]; // 获取帖子ID
        let noSkip = true; // 跳过标识
        for (let index = 0; index < elem.fidthreads.length; index++) { // 确保帖子的唯一性
          const element = elem.fidthreads[index];
          if (element.tid == tid) {
            noSkip = false;
            messageBox(`${fid}：任务列表：${index}，thread-${tid}-1-1 ：已在任务列表，已跳过此贴！`);
            break;
          }
        }
        if (noSkip) {
          const replyIndex = rdNum(start, replyLen - 1); // 从返回的输入长度获取随机值
          const randomTime = rdNum(user.interval, user.differ + user.interval);
          const thread = {
            tid: tid,
            touseruid: touseruid,
            touser: touser,
            replyIndex: replyIndex, // 回帖随机数
            replyLen: replyLen, // 用于判断使用的哪个数组，和确定起始位置
            randomTime: randomTime, // 回帖时间随机数
          }
          fidTime += randomTime;
          elem.fidthreads.push(thread); // 给对象数组添加
          count++;
        }
      }
      GM_setValue(user.username, user);
      messageBox(`${fid}：任务列表成功添加 ${count} 贴！`, 10000);
    }

    newFid(); // 启动
  };

  async function replyOrThk(_this, type = 'reply') { // 回帖函数
    let fidIndex = 0; // 当前回帖版块序号
    let thkFidIndex = 0; // 当前感谢版块序号
    if (!user.replyThreads.length) {
      messageBox('任务列表为空，请先添加任务！');
      return;
    } else if (type == 'reply') {
      messageBox(type + "：开始回帖...");
    } else {
      messageBox(type + "：开始感谢...");
    }
    const video = genVideo(); //需要视频时再加载视频，提高性能
    document.querySelector('body').appendChild(video); //添加视频到指定位置
    document.querySelector('#video1').play(); // 播放视频，防止休眠
    let mesId = ''; // 清除永久消息id
    if (!document.querySelector('#video1').paused) {
      mesId = messageBox('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', 'none');
    } else {
      messageBox('防止休眠启动失败');
    }
    while ((type == 'reply' && fidIndex < user.replyThreads.length) || (type == 'thk' && thkFidIndex < user.replyThreads.length)) // 分别处理感谢和回帖
    {
      const elementForum = user.replyThreads[(type == 'reply') ? fidIndex : thkFidIndex]
      const fid = elementForum.fid;
      let fidRepIndex = elementForum.fidRepIndex; // 上次回复位置
      let fidThkIndex = elementForum.fidThkIndex; // 上次感谢位置
      if (type == 'reply') {
        messageBox(fid + "-版块，当前位置：" + fidRepIndex + " ，总数：" + elementForum.fidthreads.length + "，总计时间：" + (elementForum.fidTime / 1000 / 60).toFixed(1) + " 分钟时间", elementForum.fidTime);
      } else if (type == 'thk') {
        messageBox(fid + "-版块，当前位置：" + fidThkIndex + " ，总数：" + elementForum.fidthreads.length);
      }
      while ((elementForum.fidthreads.length > fidRepIndex && type == 'reply') || (elementForum.fidthreads.length > fidThkIndex && type == 'thk')) // 分别处理感谢和回帖 
      {
        switch (type) {
          case 'reply': {
            const elementThr = elementForum.fidthreads[fidRepIndex];
            const tid = elementThr.tid;
            const replyIndex = elementThr.replyIndex;
            const replyLen = elementThr.replyLen;
            const randomTime = elementThr.randomTime;
            // 回帖链接
            const replyUrlParamsData = urlSearchParams({
              "fid": fid,
              "tid": tid,
              "extra": "page%3D1",
              "replysubmit": "yes",
              "infloat": "yes",
              "inflohandlekeyat": "fastpost",
              "inajax": 1
            });

            // 拼接回帖报文
            const date = new Date();
            const posttime = parseInt(date.getTime() / 1000); // 生产时间戳
            const replyParamsObj = {}; // 回帖数据对象
            if (replyLen == user.fastReply.length) {
              replyParamsObj.message = user.fastReply[replyIndex];
            } else {
              replyParamsObj.message = user.userReplyMessage[replyIndex];
            }
            replyParamsObj.posttime = posttime;
            replyParamsObj.formhash = user.formhash;
            replyParamsObj.usesig = 1;
            replyParamsObj.subject = "";
            const replyParamsData = urlSearchParams(replyParamsObj);
            // 发送数据
            const data = await postDataAs(user.replyUrl + replyUrlParamsData.toString(), replyParamsData.toString());
            if (checkHtml(data)) { // 确认html
              const info = data.querySelector('script').innerHTML.split(`, `)[1];
              messageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
            } else {
              messageBox(data, 'none'); //其它情况直接输出
            }
            messageBox("序号：" + fidRepIndex + '，随机号：' + replyIndex + '，用时：' + randomTime + "，帖子：" + tid + '，内容：' + replyParamsData.get("message")); //测试使用  
            elementForum.fidRepIndex = ++fidRepIndex;
            GM_setValue(user.username, user);
            _this.timer = 1; // 防止重复点击
            await waitFor(randomTime); // 等待指定时间
            break;
          }
          case 'thk': {
            const elementThr = elementForum.fidthreads[fidThkIndex];
            const thkParamsData = urlSearchParams({
              "formhash": user.formhash,
              "tid": elementThr.tid,
              "touser": elementThr.touser,
              "touseruid": elementThr.touseruid,
              "handlekey": "k_thankauthor",
              "addsubmit": "true"
            });
            const data = await postDataAs(user.thkUrl, thkParamsData.toString()); //post感谢数据
            if (checkHtml(data)) {
              const info = data.querySelector('.alert_info').innerHTML.split('<')[0].trim(); //去除html，返回字符串
              messageBox(info);
            } else {
              messageBox(data); //其它情况直接输出
            }
            console.log(fidThkIndex, thkParamsData.get("tid"));
            elementForum.fidThkIndex = ++fidThkIndex;
            GM_setValue(user.username, user);
            clearInterval(_this.timer);
            _this.timer = 1; // 防止重复点击
            await waitFor(user.thkDiffer); // 等待指定时间
            break;
          }

          default:
            console.log("参数不在范围");
            break;
        }
      }
      if (type == 'thk') {
        thkFidIndex++; // 翻页
      } else if (type == 'reply') {
        fidIndex++; // 翻页
        messageBox(fid + "：版块回帖完成！");
      }
      GM_setValue(user.username, user);
    }
    if (type == 'thk') {
      messageBox("全部感谢完成！", 10000, 2);
    } else if (type == 'reply') {
      messageBox("全部回帖完成！", 10000, 2);
    }
    _this.timer = 0;
    removeMessage(mesId);
  };
  // promise 等待模块
  const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

  // n, m 范围随机整数生成 
  function rdNum(n, m) {
    let c = m - n + 1;
    return Math.floor(Math.random() * c + n);
  }

  function downloadImgs() {
    if (this.timer > 0) { // 防重复点击
      return;
    } else {
      this.timer = 1;
    }
    let imgsUrl = []; // 图片下载链接
    let imgsTitles = []; // 图片名称
    const folderName = document.querySelector('.title-cont h1').innerHTML.trim().replace(/\.+/g, '-');
    const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
    if (pcbImg.length) {
      for (let i = 0; i < pcbImg.length; i++) { //遍历图片列表
        let img = pcbImg[i];
        if (img.title && img.getAttribute('file') && img.getAttribute('file').match('mymypic.net')) {
          const reg = /\./g;
          if (!reg.test(img.title)) { // 文件格式校验
            if (reg.test(img.alt)) { // 文件格式修复
              img.title = img.alt;
            } else {
              messageBox("获取图片名失败！");
              this.timer = 0;
              return;
            }
          }
          imgsTitles.push(img.title); // 保存下载名称到数组
          imgsUrl.push(img.getAttribute('file').split('.thumb.')[0]); // 保存下载链接到数组
        } else if (!img.getAttribute('file') && img.src.match('mymypic.net')) {
          const nameSrc = img.src.split('/');
          imgsTitles.push(nameSrc[nameSrc.length - 1]); // 保存下载名称到数组
          imgsUrl.push(img.src.split('.thumb.')[0]); // 保存下载链接到数组
        } else {
          // console.log(img.src, '跨域请求，不可下载外链图片！');
          // messageBox('跨域请求，不可下载外链图片！');
        }
      }
      if (imgsUrl.length && imgsTitles.length) {
        batchDownload(imgsUrl, imgsTitles, folderName, this);
      } else {
        messageBox('没有可下载的图片！');
        this.timer = 0
        return 0;
      }
    } else {
      messageBox('没有图片！');
      this.timer = 0
      return 0;
    }
  }

  // 批量下载 顺序
  async function batchDownload(imgsUrl, imgsTitles, folderName, _this) {
    const data = imgsUrl;
    const zip = new JSZip();
    const promises = [];
    const mesId = messageBox(data.length + "张：开始下载...", "none");
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const promise = await getData(item, "blob").then(data => { // 下载文件, 并存成ArrayBuffer对象
        const file_name = imgsTitles[index]; // 获取文件名
        zip.file(file_name, data, {
          binary: true
        }) // 逐个添加文件
        messageBox(`第${index+1}张，文件名：${file_name}，大小：${parseInt(data.size / 1024)} Kb，下载完成！等待压缩...`);
      }).catch((err) => { // 移除消息；
        const domParser = new DOMParser();
        const xmlDoc = domParser.parseFromString(err, 'text/html');
        messageBox("请求错误：" + xmlDoc.body.innerHTML, 1000);
        return -1;
      })
      promises.push(promise);
    }
    Promise.all(promises).then((err) => {
      removeMessage(mesId);
      _this.timer = 0;
      if (err[err.length - 1] == -1) {
        messageBox("下载出错！")
        return;
      }
      for (let i = 0; i < err.length; i++) {
        if (err[i] == -1) {
          messageBox("文件缺失！")
          _this.timer = 1;
          break;
        }
      }
      if (_this.timer) {
        if (confirm("检测到文件缺失，是否继续压缩？")) {
          _this.timer = 0;
        } else {
          _this.timer = 0;
          return;
        }
      }
      zip.generateAsync({
        type: "blob"
      }).then(content => { // 生成二进制流
        saveAs(content, `${folderName} [${data.length}P]`); // 利用file-saver保存文件，大文件需等待很久
      })
    })
  };

  // GM_xmlhttpRequest GET异步通用模块
  function getData(url, type = "document", usermethod = "GET") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: usermethod,
        url: url,
        responseType: type,
        onload: function (response) {
          if (response.status == 200) {
            resolve(response.response);
          } else {
            reject(response.responseText);
          }
        },
        onerror: function (error) {
          messageBox("网络错误");
          reject(error);
        }
      });
    });
  }
  // GM_xmlhttpRequest POST异步通用模块
  function postDataAs(url, postData, type = "document", usermethod = "POST") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: usermethod,
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: postData,
        responseType: type,
        onload: function (response) {
          if (!response) {
            if (response.status == 200) {
              resolve(response.response);
            } else {
              messageBox("请求错误：" + response.status);
              reject(response.status);
            }
          }
          resolve(turnCdata(response.response));
        },
        onerror: function (error) {
          messageBox("网络错误");
          reject(error);
        }
      });
    });
  }

  // POST返回 xml数据类型转换成 字符串或html 模块
  function turnCdata(xmlRepo) {
    let data = xmlRepo.getElementsByTagName("root")[0].childNodes[0].nodeValue;
    if (replaceHtml(data)) { // 如果判断去掉html是否还有文字，否则返回html
      return replaceHtml(data); // 去掉html内容，返回文字
    } else {
      const domParser = new DOMParser();
      const htmlData = domParser.parseFromString(data, 'text/html');
      return htmlData;
    }
  }

  // URL 参数添加器
  function urlSearchParams(object) {
    const searchParamsData = new URLSearchParams();
    for (const key in object) {
      searchParamsData.append(key, object[key]);
    }
    return searchParamsData;
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

  class NowTime {
    constructor() {
      const date = new Date();
      this.day = date.toLocaleDateString();
      this.seconds = date.toTimeString().split(" ")[0];
      this.date = date;
    }
  }

  // 比较键
  function compaObjKey(source, target) {
    if (Object.keys(target).length == Object.keys(source).length) {
      // 用户数据匹配
      Object.keys(source).forEach(key => {
        if (!target.hasOwnProperty(key)) {
          return false;
        }
      })
      return true;
    } else {
      return false;
    }
  }

  // 赋值对象的值
  function copyObjVal(target, source) {
    Object.keys(source).forEach((key) => {
      if (source[key] && target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    });
    return target;
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

  function genElem(type, id, val1, val2) {
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

  function genInp(type, id) {
    let b = document.createElement(type); //创建类型为button的DOM对象
    b.style.cssText = 'margin:16px 10px 0px 0px;float:left;width:80px' //添加样式（margin可以让元素间隔开一定距离）
    if (id) {
      b.id = id;
    }
    const user = getUserFromName();
    if (user && user.page) {
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
  // 没有登录则退出
  if (!document.querySelector('.listmenu li a')) {
    return;
  }
  addBtns(); // 添加DOM
  const user = await creatUser(); // 添加用户, 全局变量，每个页面只获取一次
  launch(); // 启动自动签到、投票、加载原图等
})();