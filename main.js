// ==UserScript==
// @name         JKForum 助手
// @name:en      JKForum Helper
// @name:zh-TW   JKForum 助手
// @name:ja      JKForum 助手
// @name:ko      JKForum 조수
// @namespace    https://github.com/Eished/jkforum_helper
// @version      0.6.4
// @description        JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片
// @description:en     JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image
// @description:zh-TW  JKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片
// @description:ja     JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード
// @description:ko     JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오.
// @author       Eished
// @license      AGPL-3.0
// @match        *://*.jkforum.net/*
// @exclude      *.jkforum.net/member*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzYwNmI3NGQtODA4Zi03YjQ3LWI4NGYtYjNlZmJiMTM4NDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3MzFDMzYyRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MzFDMzYxRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MWY1NjgyLTk5OTctNDU0OS04NjIzLWZhNzY0MmVjMTM5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjNjA2Yjc0ZC04MDhmLTdiNDctYjg0Zi1iM2VmYmIxMzg0MjAiLz4g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
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js
// @connect      mymypic.net
// @connect      greasyfork.org
// @connect      jsdelivr.net
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_info
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_addElement
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

(async function () {
  'use strict';

  function newUser(username, formhash) {
    return {
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
      limit: 2, // 并发下载图片数量限制
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
  }

  async function creatUser() {
    const formhash = document.querySelector('.listmenu li a').href.split('&')[2].split('=')[1];
    const username = document.querySelector('.avatar_info').querySelector('a').innerHTML;
    let user = getUserFromName();
    if (!user) { // 空则写入，或版本变动写入
      user = newUser(username, formhash);
      user = await setFastReply(user); // 设置快速回复
      GM_setValue(username, user);
      new MessageBox("添加用户成功！");
    } else if (user.version != GM_info.script.version) {
      const userMod = newUser(username, formhash);
      const compa = compaObjKey(userMod, user); // 比较key
      if (compa) { // key相同 只改变版本
        user.version = GM_info.script.version; // 记录新版本
      } else { // key不同
        user.version = GM_info.script.version; // 记录新版本
        user = copyObjVal(userMod, user); // 对newUser赋值
        new MessageBox("数据更新成功！");
      }
      user = await setFastReply(user); // 设置快速回复
      GM_setValue(username, user);
      new MessageBox("版本更新成功！请阅读使用说明。");
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
    try {
      const htmlData = await getData(user.fastReplyUrl);
      const options = htmlData.querySelectorAll('#rqcss select option');
      let fastReply = []; //返回数组
      if (options.length) {
        options.forEach(option => {
          if (option.value) { //去掉空值
            fastReply.push(replaceHtml(option.value)); //去掉需要转义的内容
          }
        });
      } else {
        new MessageBox("获取快速回复失败！");
        return user;
      }
      if (fastReply.length) {
        user.fastReply = fastReply;
        new MessageBox("获取快速回复成功！");
      } else {
        new MessageBox("获取快速回复失败！");
      }
      return user;
    } catch (e) {
      console.error(e);
      return user;
    }
  }
  // 启动
  async function launch() {
    try {
      if (location.href.includes('thread')) {
        if (user.autoThkSw) { // 自动感谢当前贴开关
          await autoThk();
        }
        if (user.autoPaySw) { // 自动购买当前贴开关
          await autoPay();
        }
        rePic(); // 启动自动加载原图；
      }
      // 天变动则签到\投票
      const now = new NowTime();
      if (user.today != now.day) {
        user.today = now.day;
        sign(); // 签到
        await autoVoted();
      }
    } catch (e) {
      GM_setValue(user.username, user); //保存当天日// today 初始化
      console.error(e);
    }
  }

  async function autoVoted() {
    await getData(user.applyVotedUrl); // 申请任务
    const msId = new MessageBox("申请投票任务执行成功！正在投票请勿退出页面...", "none");
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
        new MessageBox(info);
      } else if (votedMessage.querySelector('script')) {
        info = votedMessage.querySelector('script').innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
        new MessageBox(info);
        await getData(user.taskDoneUrl); // 执行领奖励
        new MessageBox('领取投票奖励成功！');
      }
    } else {
      new MessageBox(votedMessage); //其它情况直接输出
    }
    msId.removeMessage();
    GM_setValue(user.username, user); //保存当天日// today 初始化
  }

  // 加载原图，自动播放
  async function rePic() {
    const tfImg = document.querySelectorAll('.t_f ignore_js_op img'); //获取图片列表，附件也是ignore_js_op
    if (tfImg && user.autoRePicSw) { // 加载原图开关
      let count = 0;
      for (let i = 0; i < tfImg.length; i++) { //遍历图片列表
        const img = tfImg[i]
        img.setAttribute('onmouseover', null); // 去掉下载原图提示
        if (img.src.includes('.thumb.')) { // 去掉缩略图 加载部分
          img.src = img.getAttribute('file').split('.thumb.')[0];
          console.log('加载原图成功 thumb：', img.src);
          count++;
        } else if (img.src.includes('static/image/common/none.gif') && img.getAttribute('file')) { // 懒加载部分
          if (img.getAttribute('file').includes(".thumb.")) {
            img.setAttribute('file', img.getAttribute('file').split('.thumb.')[0]); // 网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
            console.log('加载原图成功 none.gif:', img.getAttribute('file'));
            count++;
          }
        }
      }
      if (count) {
        new MessageBox(`加载原图成功 ${count} 张！`);
      }
    }
    const zoomimgs = document.querySelectorAll(`img[zoomfile]`); //获取图片列表
    if (zoomimgs) { // 自动播放
      for (let i = 0; i < zoomimgs.length; i++) { //遍历图片列表
        zoomimgs[i].addEventListener("click", autoPlay, {
          once: true
        });
      }
    }
    const onclickzoomimgs = document.querySelectorAll(`img[onclick="zoom(this, this.src, 0, 0, 0)"]`); //获取图片列表
    if (onclickzoomimgs) { // 自动播放
      for (let i = 0; i < onclickzoomimgs.length; i++) { //遍历图片列表
        onclickzoomimgs[i].addEventListener("click", autoPlay, {
          once: true
        });
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
      const imgzoom_y = document.querySelector("#imgzoom .y");
      if (imgzoom_y) { // 按钮也是延迟加载，监听是否有 .y
        observer.disconnect(); // 断开监听
        addAutoPlay(); // 添加按钮
      }
    }
    const observer = new MutationObserver(callback); // 建立监听器
    observer.observe(append_parent, { // 开始监听 append_parent
      childList: true
    })
  }
  // 添加播放图片按钮、事件
  function addAutoPlay() {
    const append_parent = document.querySelector("#append_parent"); // 监听子节点
    const imgzoom = append_parent.querySelector("#imgzoom");
    const imgzoom_cover = append_parent.querySelector("#imgzoom_cover");
    const y = imgzoom.querySelector(".y");

    const a = document.createElement("a");
    a.title = "自动播放/停止播放";
    a.innerHTML = "自动播放/停止播放";
    a.href = "javascript:void(0);";
    a.addEventListener("click", play); // 添加监听播放事件
    a.style.cssText = `background: url(../../template/yibai_city1/style/common/arw_l.gif) rgb(241, 196, 15) center no-repeat;transform: rotate(180deg);width: 60px;height: 18px;overflow: hidden;`;
    y.prepend(a); // 添加按钮

    // 遮挡暂停
    window.onblur = function () {
      a.timer = 0;
    };
    // 点击背景层暂停
    imgzoom_cover.addEventListener("click", () => {
      a.timer = 0;
    });
    // 关闭按钮暂停
    y.querySelector(".imgclose").addEventListener("click", () => {
      a.timer = 0;
    })

    async function play() {
      if (!a.timer && !a.observer) { // 再次点击暂停，只运行一个监听器
        a.timer = 1;
        const imgzoom_waiting = append_parent.querySelector("#imgzoom_waiting");
        const zimg_next = imgzoom.querySelector(".zimg_next"); // 是否有下一张
        if (!zimg_next) {
          a.timer = 0;
          new MessageBox("只有一张图！")
          return;
        }

        a.observer = new MutationObserver(callback);
        a.observer.observe(imgzoom_waiting, {
          attributes: true
        })

        async function callback() {
          const display = imgzoom_waiting.style.display;
          if (display == "none") {
            await waitFor(user.autoPlayDiff); // 延迟，然后判断是否停止
            if (a.timer == 0) {
              a.observer.disconnect();
              a.observer = null; // disconnect()并没有清空监听器
              return;
            }
            imgzoom.querySelector(".zimg_next").click(); // 刷新NodeList
          }
        }
        // 开始点击下一张
        await waitFor(user.autoPlayDiff);
        zimg_next.click();
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
      let tid = referer.split('-')[1]; // 不同链接地址不同
      if (tid == undefined) {
        tid = new URLSearchParams(referer).get("tid"); // 用于获取分类贴链接下的 tid
      }
      const pData = `formhash=${user.formhash}&referer=${turnUrl(referer)}&tid=${tid}&handlekey=pay`
      const stringOrHtml = await postDataAs(url, pData);
      if (checkHtml(stringOrHtml)) { // 确认html
        const info = stringOrHtml.querySelector('script').innerHTML.split(`', `)[1].slice(1);
        new MessageBox(info);
        location.reload();
      } else {
        new MessageBox(stringOrHtml); //其它情况直接输出
      }
    }
  }
  // 自动感谢
  async function autoThk() {
    if (!document.querySelector('#thankform')) {
      // 没有感谢
      return;
    }
    if (document.querySelectorAll('#k_thankauthor').length == 2) { //感谢可见
      await postAutoThk();
      location.reload();
    } else { //普通贴
      await postAutoThk();
    }
  };
  // 发送感谢请求
  async function postAutoThk() {
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
      new MessageBox(info);
    } else {
      new MessageBox(xmlData); //其它情况直接输出
    }
  }

  // 定时签到
  function timeControl() {
    const _this = this;
    const signtime = user.signtime; // 设定签到时间
    // 初始化永久消息通知
    const msIdSlp = new MessageBox();
    const msIdSig = new MessageBox();
    const msIdTime = new MessageBox();

    async function control() {
      const now = new NowTime(); // 获取当前时间，到秒
      if (now.seconds == signtime) {
        clearInterval(_this.timer); // _this.timer=1 未知原因
        _this.timer = 0;
        // 移除永久消息通知
        msIdSlp.removeMessage();
        msIdSig.removeMessage();
        msIdTime.refreshMessage('执行中....');
        for (let i = 0; i < user.signNum; i++) { //重试次数
          sign();
          msIdTime.refreshMessage('执行第' + (i + 1) + '次');
          await waitFor(user.interTime); //重试间隔
        }
        msIdTime.removeMessage();
      } else {
        msIdTime.refreshMessage('时间没有到：' + signtime + '，目前时间：' + now.seconds);
      }
    }
    if (!this.timer) { // 防重复点击
      playVideo(msIdSlp); // 防休眠
      msIdSig.showMessage('定时签到中，请勿退出...', "none");
      msIdTime.showMessage("...", "none"); // 占位消息，给刷新用
      _this.timer = setInterval(control, 500); // 运行自动签到
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
      new MessageBox(info);
    } else {
      new MessageBox(stringOrHtml); //其它情况直接输出
    }
  }

  // 添加GUI
  function addDom() {
    const WLHerf = location.href;
    const status_loginned = document.querySelector('.status_loginned');
    // 消息盒子
    MessageBox.genMessageBox();
    /* 
    1. 先判断是否在帖子页，是则添加并退出
    2. 是否在版块页，是则添加并退出
    3. 判断是否在首页，是则添加并退出
    */
    const reg = /.+forum\.php$/; // 正则判断是否是首页
    switch (true) {
      case WLHerf.includes('thread'): {
        // 下载按钮
        const repBtn = genButton('下载图片', downloadImgs);
        status_loginned.prepend(repBtn);
        // 屏蔽图片按钮
        const noDisplayBtn = genButton('屏蔽图片', noDisplayPic);
        status_loginned.prepend(noDisplayBtn);
        break;
      }
      case WLHerf.includes('id=dsu_paulsign:sign'): {
        // 定时签到按钮
        const btn = genButton('定时签到', timeControl);
        status_loginned.prepend(btn);
        break;
      }
      case (WLHerf.includes('/forum-') || WLHerf.includes('/type-')): { //  || WLHerf.includes('mod=forum') 图片模式只有一个页面，不需要
        // 增加 visited 样式，图片模式已阅的帖子变灰色 
        GM_addStyle(`.xw0 a:visited {color: grey;}`);
        // 去掉高亮标题
        if (document.querySelector('[style="color: #2B65B7"]')) {
          document.querySelectorAll('[style="color: #2B65B7"]').forEach((e) => {
            e.style = '';
          })
        }
        // 回帖输入框
        const input = genElem('textarea', 'inpreply', 1, 20);
        status_loginned.prepend(input);
        // 感谢 按钮
        const thkBtn = genButton('添加本页', thankOnePage);
        status_loginned.prepend(thkBtn);
        break;
      }
      case reg.test(WLHerf): {
        // 一次性添加，避免多次渲染
        const fragment = new DocumentFragment();
        // 回帖 按钮
        const repBtn = genButton('回帖', replyBtn);
        fragment.append(repBtn);
        // 感谢 按钮
        const thankBtn = genButton('感谢', thkBtn);
        fragment.append(thankBtn);
        // 回帖输入框
        const input = genElem('textarea', 'inpreply', 1, 20);
        fragment.append(input);
        // 页码输入框
        const page = genInp('input', 'inp_page');
        fragment.append(page);
        // 添加任务按钮
        const btn = genButton('添加任务', thankBatch);
        fragment.append(btn);
        status_loginned.prepend(fragment);
        break;
      }
      default:
        break;
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

  /* 
    消息通知类：
    0.先调用静态方法 genMessageBox() 方法初始化消息弹出窗口
    1.传参默认值：消息，持续时间，重要性
    2.持续时间非数字时为永久消息，需手动移除 removeMessage() ；
    3.初始化用 new MessageBox() 参数为空时，调用 showMessage() 传参显示消息；用于增大作用域。refreshMessage() 刷新永久消息；
    4.重要性：1 = log + 自定义弹窗；2 = log + 自定义弹窗 + GM；默认 = 自定义弹窗；
  */
  class MessageBox {
    constructor(text, setTime = 5000, important = 1) {
      this._msg = null; // 永久显示标记，和元素地址
      this._text = text;
      this._setTime = setTime;
      this._important = important;
      this._timer = 0; // 计数器
      // 非空初始化，立即执行；
      if (text != undefined) {
        this.showMessage();
      }
    }

    // 静态属性，消息盒子
    static _msgBox;
    // 静态方法，初始化消息盒子，先调用本方法初始化消息弹出窗口
    static genMessageBox() {
      // 添加样式
      GM_addStyle(`#messageBox {width: 222px;position:fixed;right: 5%;bottom: 20px;z-index:999}`);
      GM_addStyle(`#messageBox div {width:100%;background-color:#64ce83;float:left;padding:5px 10px;margin-top:10px;border-radius:10px;color:#fff;box-shadow: 0px 0px 1px 3px #ffffff;}`);

      this._msgBox = document.createElement('div'); // 创建类型为div的DOM对象
      this._msgBox.id = "messageBox";
      document.body.append(this._msgBox); // 消息盒子添加到body
    };

    // 显示消息
    showMessage(text = this._text, setTime = this._setTime, important = this._important) {
      if (this._msg != null) {
        throw new Error("先移除上条消息，才可再次添加！");
      }
      this._text = text;
      this._setTime = setTime;
      this._important = important;

      this._msg = document.createElement('div');
      this._msg.textContent = text;
      MessageBox._msgBox.append(this._msg); // 显示消息

      switch (important) {
        case 1: {
          console.log(text);
          break;
        }
        case 2: {
          console.log(text);
          GM_notification(text);
          break;
        }

        default: {
          break;
        }
      }

      if (setTime && !isNaN(setTime)) { // 默认5秒删掉消息，可设置时间，none一直显示
        setTimeout(() => {
          this.removeMessage();
        }, setTime);
      }
    }

    refreshMessage(text) {
      if (isNaN(this._setTime) && this._msg != null) {
        this._msg.textContent = text;
        switch (this._important) {
          case 1: {
            console.log(text);
            break;
          }
          case 2: {
            console.log(text);
            GM_notification(text);
            break;
          }

          default: {
            break;
          }
        }
      } else {
        throw new Error("只有弹窗永久消息支持刷新内容：" + this._setTime);
      }
    }

    // 移除方法，没有元素则等待setTime 5秒再试5次
    removeMessage() {
      if (this._msg != null) {
        this._msg.remove();
        this._msg = null; // 清除标志位
      } else {
        // 空初始化时，消息异步发送，导致先执行移除而获取不到元素，默认 setTime=5000
        // 消息发出后，box 非空，可以移除，不会执行 setTime="none"
        if (this._timer == 4) {
          throw new Error("移除的元素不存在：" + this._msg);
        }
        this._timer++;
        setTimeout(() => {
          this.removeMessage();
        }, this._setTime);
      }
    }

    // 危险操作
    cleanMessage() {
      document.querySelector('#messageBox').innerHTML = "";
    }
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
      GM_setValue(user.username, user);
      new MessageBox("已使用自定义回复");
      return replyLen;
    } else {
      if (user.fastReply.length && confirm("确认使用快速回复？否则使用历史回复")) {
        GM_setValue(user.username, user);
        new MessageBox("已使用快速回复");
        return user.fastReply.length;
      } else if (user.userReplyMessage.length && confirm("确认使用历史自定义回复？")) {
        GM_setValue(user.username, user);
        new MessageBox("已使用历史自定义回复");
        return user.userReplyMessage.length;
      } else {
        alert('没有获取到任何回复，请确认有浏览可快速回贴的版块的权限！否则需要手动输入回帖内容！');
        return -1;
      }
    }
  }

  function thankOnePage() {
    const currentHref = location.href; // 获取当前页地址
    const fid = currentHref.split('-')[1]; // 获取板块fid
    const page = currentHref.split('-')[2].split('.')[0]; // 获取页码
    if (currentHref.includes("type-")) {
      thankBatch(`${fid}-${page}-${page}`, "type");
    } else {
      thankBatch(`${fid}-${page}-${page}`);
    }
  }

  async function thankBatch(onePage = 0, type = null) {
    const reg = new RegExp(/^\d+-\d+-\d+$/);
    let forumPage = '';
    if (reg.test(onePage)) { // 如果输入了正确地址单页
      forumPage = onePage;
    } else {
      forumPage = document.querySelector('#inp_page').value;
    }
    if (reg.test(forumPage)) { // 如果输入了正确地址则进行批量处理
      user.page = forumPage;
      GM_setValue(user.username, user);
      let pageFrom = parseInt(forumPage.split('-')[1]); // 获取起点页码
      const pageEnd = parseInt(forumPage.split('-')[2]); // 获取终点页码
      const fid = forumPage.split('-')[0]; // 获取版块代码

      if (pageFrom > pageEnd) {
        new MessageBox("页码错误：起点页不能大于终点页！");
        return;
      }
      const msId = new MessageBox('正在添加：' + forumPage, "none");

      let replyLen = chooceReply(); //如果输入了值则使用用户值，如果没有则使用默认值；没有默认值则返回错误
      if (replyLen <= 0) {
        new MessageBox('获取回帖内容失败！');
        msId.removeMessage();
        return "获取回帖内容失败！";
      };

      while (pageFrom <= pageEnd) {
        let currentHref = '';
        if (type != null) {
          currentHref = 'https://www.jkforum.net/' + type + '-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
        } else {
          currentHref = 'https://www.jkforum.net/forum-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
        }
        new MessageBox('当前地址：' + currentHref + '，页码：' + pageFrom);
        let data = await getData(currentHref);

        // 判断是否需要切换到列表模式。
        while (data.querySelector(`[class="chked"]`)) {
          await getData('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes'); // 切换到列表模式，同步请求。
          new MessageBox('已切换到列表模式');
          data = await getData(currentHref);
        }
        // 添加回帖任务
        setThreadsTask(data, fid, replyLen); // 设置任务列表
        pageFrom++;
      }
      msId.removeMessage();
    } else {
      new MessageBox('请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1', 10000);
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

    function addThrInfo(elem) {
      // 回帖变量随即范围限制
      let start = 0;
      if (replyLen == user.fastReply.length || replyLen == user.userReplyMessage.length) { // 判断起始位置
      } else {
        start = user.userReplyMessage.length - replyLen; // 用户数组长-增加的数据长=起始位置；
        replyLen = user.userReplyMessage.length; // 结束位置
      }
      const msId = new MessageBox("...", "none");
      let count = 0; // 贴数统计
      // 遍历去除回帖用户
      for (let i = 0; i < cites.length; i += 2) {
        // 加入数组
        const touser = cites[i].innerHTML;
        const touseruid = cites[i].href.split('uid=')[1]; // href="home.php?mod=space&uid=1123445"
        const href = hrefs[i / 2].href;
        let tid = href.split('-')[1]; // 获取帖子ID
        if (tid == undefined) { // 分类页tid不同
          tid = new URLSearchParams(href).get("tid"); // 用于获取分类贴链接下的 tid
        }
        let noSkip = true; // 跳过标识
        for (let index = 0; index < elem.fidthreads.length; index++) { // 确保帖子的唯一性
          const element = elem.fidthreads[index];
          if (element.tid == tid) {
            noSkip = false;
            msId.refreshMessage(`${fid}：任务列表：${index}，thread-${tid}-1-1 ：已在任务列表，已跳过此贴！`);
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
      msId.removeMessage();
      new MessageBox(`${fid}：任务列表成功添加 ${count} 贴！`, 10000);
    }

    newFid(); // 启动
  };

  // 回帖\感谢函数
  async function replyOrThk(_this, type = 'reply') {
    let fidIndex = 0; // 当前回帖版块序号
    let thkFidIndex = 0; // 当前感谢版块序号
    // 初始化永久消息
    const mesId = new MessageBox();
    const mesIdRep = new MessageBox();
    const mesIdRepContent = new MessageBox();
    const mesIdThk = new MessageBox();

    if (!user.replyThreads.length) {
      new MessageBox('任务列表为空，请先添加任务！');
      return;
    } else if (type == 'reply') {
      mesIdRep.showMessage("开始回帖...", "none");
      mesIdRepContent.showMessage("...", "none");
    } else {
      mesIdThk.showMessage("开始感谢...", "none");
    }
    playVideo(mesId); // 防休眠

    while ((type == 'reply' && fidIndex < user.replyThreads.length) || (type == 'thk' && thkFidIndex < user.replyThreads.length)) // 分别处理感谢和回帖
    {
      const elementForum = user.replyThreads[(type == 'reply') ? fidIndex : thkFidIndex]
      const fid = elementForum.fid;
      let fidRepIndex = elementForum.fidRepIndex; // 上次回复位置
      let fidThkIndex = elementForum.fidThkIndex; // 上次感谢位置

      while ((elementForum.fidthreads.length > fidRepIndex && type == 'reply') || (elementForum.fidthreads.length > fidThkIndex && type == 'thk')) // 分别处理感谢和回帖 
      {
        switch (type) {
          case 'reply': {
            mesIdRep.refreshMessage(fid + "-版块，当前位置：" + fidRepIndex + " ，总数：" + elementForum.fidthreads.length + "，预计总耗时：" + (elementForum.fidTime / 1000 / 60).toFixed(1) + " 分钟时间", "none"); // 显示永久消息
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
              new MessageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
            } else {
              new MessageBox(data, 'none'); //其它情况直接输出
            }
            mesIdRepContent.refreshMessage("序号：" + fidRepIndex + '，随机号：' + replyIndex + '，用时：' + randomTime + "，帖子：" + tid + '，内容：' + replyParamsData.get("message")); //测试使用  
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
              new MessageBox(info, 1000);
            } else {
              new MessageBox(data, 1000); //其它情况直接输出
            }
            mesIdThk.refreshMessage(fid + "-版块，当前位置：" + fidThkIndex + " ，总数：" + elementForum.fidthreads.length + "，帖子ID：" + thkParamsData.get("tid"), "none"); // 刷新永久消息
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
      }
      GM_setValue(user.username, user);
    }
    if (type == 'thk') {
      mesIdThk.removeMessage(); // 移除永久消息
      new MessageBox("全部感谢完成！", 10000, 2);
    } else if (type == 'reply') {
      mesIdRep.removeMessage(); // 移除永久消息
      mesIdRepContent.removeMessage();
      new MessageBox("全部回帖完成！", 10000, 2);
    }
    _this.timer = 0;
    mesId.removeMessage(); // 移除永久消息
  };

  function noDisplayPic() {
    const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
    if (pcbImg.length) {
      for (let i = 0; i < pcbImg.length; i++) { //遍历图片列表
        const img = pcbImg[i];
        // 前10张
        if (img.title && img.getAttribute('file') && img.getAttribute('file').includes('mymypic.net')) {
          img.src = "https://www.jkforum.net/static/image/common/none.gif";
          // new MessageBox("屏蔽图片成功");
          // 懒加载部分
          function callback() { // 监听元素子节点属性变化，然后屏蔽链接
            if (img.src != "https://www.jkforum.net/static/image/common/none.gif") {
              observer.disconnect(); // 断开监听
              console.log("屏蔽图片成功：", img.src);
              img.src = "https://www.jkforum.net/static/image/common/none.gif";
            }
          }
          const observer = new MutationObserver(callback); // 建立监听器
          observer.observe(img, { // 开始监听
            attributes: true
          })
        }
      }
      new MessageBox("屏蔽图片完成！")
    }
  }

  function downloadImgs() {
    if (this.timer > 0) { // 防重复点击
      return;
    } else {
      this.timer = 1;
    }
    let imgsUrls = []; // 图片下载链接
    let imgsTitles = []; // 图片名称
    const folderName = document.querySelector('.title-cont h1').innerHTML.trim().replace(/\.+/g, '-');
    const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
    if (pcbImg.length) {
      for (let i = 0; i < pcbImg.length; i++) { //遍历图片列表
        const img = pcbImg[i];
        if (img.title && img.getAttribute('file') && img.getAttribute('file').includes('mymypic.net')) {
          const reg = /\./g;
          if (!reg.test(img.title)) { // 文件格式校验
            if (reg.test(img.alt)) { // 文件格式修复
              img.title = img.alt;
            } else {
              new MessageBox("获取图片名失败！");
              this.timer = 0;
              return;
            }
          }
          const imgTitles = img.title.split(".");
          const title = `${imgTitles[imgTitles.length-2]}-${i+1}.${imgTitles[imgTitles.length-1]}`; // 标题 +i.jpg，防重名！
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
        this.timer = 0
        return 0;
      }
    } else {
      new MessageBox('没有图片！');
      this.timer = 0
      return 0;
    }
  }

  // 批量下载 顺序
  function batchDownload(imgsUrls, imgsTitles, folderName, _this) {
    const zip = new JSZip();
    const promises = [];
    const mesIdH = new MessageBox("正在下载...", "none"); // 永久消息
    const mesIdP = new MessageBox("...", "none"); // 永久消息
    for (let index = 0; index < imgsUrls.length; index++) {
      const item = imgsUrls[index];
      // 包装成 promise
      const promise = () => {
        return new Promise(async (resolve) => {
          const file_name = imgsTitles[index]; // 获取文件名
          mesIdH.refreshMessage(`正在下载：第 ${index+1} 张，文件名：${file_name}，共 ${imgsUrls.length} 张`);

          await getData(item, "blob").then(data => { // 下载文件, 并存成ArrayBuffer对象 
            zip.file(file_name, data, {
              binary: true
            }) // 逐个添加文件
            mesIdP.refreshMessage(`第 ${index+1} 张，文件名：${file_name}，大小：${parseInt(data.size / 1024)} Kb，下载完成！等待压缩...`);
            resolve();

          }).catch((err) => { // 移除消息；
            if (err.responseText) {
              const domParser = new DOMParser();
              const xmlDoc = domParser.parseFromString(err.responseText, 'text/html');
              mesIdP.refreshMessage(`第 ${index+1} 张，请求错误：${xmlDoc.body.innerHTML}`);
            } else if (err.status) {
              console.error(err.status);
            } else {
              console.error(err);
            }
            resolve(-1); // 错误处理, 标记错误并返回
          })
        })
      }
      promises.push(promise);
    }
    const pool = new ConcurrencyPromisePool(user.limit);
    pool.all(promises).then(results => {
      mesIdH.removeMessage();
      _this.timer = 0;
      for (let i = 0; i < results.length; i++) {
        if (results[i] == -1) {
          // new MessageBox("文件缺失！")
          _this.timer++;
        }
      }
      if (results.length == _this.timer) {
        new MessageBox("全部图片下载失败！")
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
      mesIdP.refreshMessage("正在压缩打包，大文件请耐心等待...")
      zip.generateAsync({
        type: "blob"
      }).then(content => { // 生成二进制流
        mesIdP.removeMessage();
        saveAs(content, `${folderName} [${imgsUrls.length}P]`); // 利用file-saver保存文件，大文件需等待很久
      })
    })
  };

  /*   
    NodeJS Promise并发控制 
    https://xin-tan.com/2020-09-13-bing-fa-kong-zhi/
  */
  class ConcurrencyPromisePool {
    constructor(limit) {
      this.limit = limit;
      this.runningNum = 0;
      this.queue = [];
      this.results = [];
    }

    all(promises = []) {
      return new Promise((resolve, reject) => {
        for (const promise of promises) {
          // 发送所有 promise
          this._run(promise, resolve, reject);
        }
      });
    }

    _run(promise, resolve, reject) {
      // 超出限制的 promise 入队
      if (this.runningNum >= this.limit) {
        // console.log(">>> 达到上限，入队：", promise);
        this.queue.push(promise);
        return;
      }
      // 正在运行的 promise
      ++this.runningNum;
      promise()
        .then(res => {
          this.results.push(res);
          --this.runningNum;

          // 运行结束条件：队列长度 && 正在运行的数量
          if (this.queue.length === 0 && this.runningNum === 0) {
            // promise返回结果, 然后递归结束; 
            return resolve(this.results);
          }
          // 队列还有则，出队，然后递归调用
          if (this.queue.length) {
            this._run(this.queue.shift(), resolve, reject);
          }
        })
        .catch(reject);
    }
  }

  // GM_xmlhttpRequest GET异步通用模块
  function getData(url, type = "document", usermethod = "GET") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: usermethod,
        url: url,
        responseType: type,
        timeout: 5 * 60 * 1000,
        onload: function (response) {
          if (response.status == 200) {
            resolve(response.response);
          } else {
            reject(response);
          }
        },
        onerror: function (error) {
          new MessageBox("网络错误");
          reject(error);
        },
        ontimeout: () => {
          new MessageBox("网络超时");
          reject("timeout");
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
          if (response.status == 200) {
            resolve(turnCdata(response.response));
          } else {
            new MessageBox("请求错误：" + response.status);
            reject(response.status);
          }
        },
        onerror: function (error) {
          new MessageBox("网络错误");
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

  // promise 等待模块
  const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

  // n, m 范围随机整数生成 
  function rdNum(n, m) {
    let c = m - n + 1;
    return Math.floor(Math.random() * c + n);
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

  /**
   * 生成不重复的ID
   * @param { Number } randomLength 
   */
  function getUuiD(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
  }

  function genButton(text, foo, id) {
    let b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'margin:16px 10px 0px 0px;float:left';
    if (foo) {
      b.addEventListener('click', foo);
    }
    if (id) {
      b.id = id;
    }
    return b;
  }

  function genElem(type, id, val1, val2) {
    let b = document.createElement(type);
    b.style.cssText = 'margin:16px 10px 0px 0px;float:left'
    b.rows = val1;
    b.cols = val2;
    b.placeholder = '中文分号；分隔回帖内容';
    b.id = id;
    return b;
  }

  function genInp(type, id) {
    let b = document.createElement(type);
    b.style.cssText = 'margin:16px 10px 0px 0px;float:left;width:80px'
    b.id = id;
    const user = getUserFromName();
    if (user && user.page) {
      b.value = user.page;
    }
    b.placeholder = `版块-1-2`;
    return b;
  }

  function genVideo() {
    const video = document.createElement('video');
    video.style.cssText = 'display:none;width:0;height:0;'
    video.loop = 'true';
    video.autoplay = 'true';
    video.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAwFtZGF0AAACugYF//+23EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMiA3NTk5MjEwIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD00IHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MiBrZXlpbnQ9MjUwIGtleWludF9taW49MTAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1hYnIgbWJ0cmVlPTEgYml0cmF0ZT0zMjI0IHJhdGV0b2w9MS4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAN2WIhAAa//73wP8Cm7nIA/5tf/+mn7sUx/QF/H/9L//yM6MTo19P+P/2ftGrP+85P/Er/F20Jv8AAALvbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAGQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAhl0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAGQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAACUAAAAlAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAABkAAAAAAABAAAAAAGRbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAoAAAABABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABPG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAPxzdGJsAAAAmHN0c2QAAAAAAAAAAQAAAIhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAACUAJQBIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MB9AAU/+EAGWf0ABSRmym/GRkIAAADAAgAAAMAoHihTLABAAZo6+xEhEAAAAAYc3R0cwAAAAAAAAABAAAAAQAABAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAC+QAAAAEAAAAUc3RjbwAAAAAAAAABAAAAMAAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTcuMTkuMTAw'; // Base64 离线
    return video;
  }

  async function playVideo(msId) {
    if (document.querySelector("body > video")) {
      msId.showMessage('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', "none");
      return;
    }
    let p = 0;
    const video = genVideo();
    document.body.append(video); //添加视频到指定位置
    video.addEventListener("canplay", videoPlay, {
      once: true
    }); // 加载完

    function videoPlay() { // 播放视频，防止休眠
      // video.removeEventListener("canplay", videoPlay, false); // 循环触发，移除事件监听
      // 显示永久消息通知
      msId.showMessage('防止休眠启动，请保持本页处于激活状态，请勿遮挡、最小化本窗口以及全屏运行其它应用！', "none");
      p = 99;
    };

    // 重试10次
    while (true) {
      await waitFor(5000);
      if (p == 99) {
        break;
      } else if (p == 10) {
        new MessageBox("防休眠启动失败！");
        break;
      } else {
        console.log("第" + (p + 1) + "次重启防休眠");
      }
      video.load();
      p++;
    }
  }

  function swRePic() {
    if (user.autoRePicSw === 1) {
      user.autoRePicSw = 0;
      GM_setValue(user.username, user);
      new MessageBox("已关闭加载原图");
    } else {
      user.autoRePicSw = 1;
      GM_setValue(user.username, user);
      new MessageBox("已开启加载原图");
    }
  }

  function swPay() {
    if (user.autoPaySw === 1) {
      user.autoPaySw = 0;
      GM_setValue(user.username, user);
      new MessageBox("已关闭自动购买");
    } else {
      user.autoPaySw = 1;
      GM_setValue(user.username, user);
      new MessageBox("已开启自动购买");
    }
  }

  function swThk() {
    if (user.autoThkSw === 1) {
      user.autoThkSw = 0;
      GM_setValue(user.username, user);
      new MessageBox("已关闭自动感谢");
    } else {
      user.autoThkSw = 1;
      GM_setValue(user.username, user);
      new MessageBox("已开启自动感谢");
    }
  }

  async function update() {
    new MessageBox("正在检查更新...")
    const data = await getData(`https://greasyfork.org/zh-CN/scripts/427246`);
    let version = data.getElementsByClassName("script-show-version")[1].querySelector("span").innerHTML;
    if (user.version != version) {
      GM_openInTab(`https://greasyfork.org/scripts/427246-jkforum-%E5%8A%A9%E6%89%8B/code/JKForum%20%E5%8A%A9%E6%89%8B.user.js`);
    } else {
      new MessageBox("已是最新版本！");
    }
  }

  // 没有登录则退出
  if (!document.querySelector('.listmenu li a')) {
    return;
  }
  addDom(); // 添加DOM
  const user = await creatUser(); // 添加用户, 全局变量，每个页面只获取一次
  launch(); // 启动自动签到、投票、加载原图等

  // 油猴菜单开关  // 必须在 user 后面调用，否则 user 还没初始化就绑定函数了
  GM_registerMenuCommand("🔎 加载原图开关", swRePic);
  GM_registerMenuCommand("💰 自动购买开关", swPay);
  GM_registerMenuCommand("❤ 自动感谢开关", swThk);
  GM_registerMenuCommand("🛠 检查更新", update);

})();