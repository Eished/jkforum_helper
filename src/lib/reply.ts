import { getTid, rdNum } from '@/utils/tools';

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

function chooceReply() {
  const inpreply = document.querySelector('#inpreply'); // 获取回复内容
  if (inpreply && inpreply.value) {
    let replyLen = 0; // 统计长度，用于在 user.userReplyMessage 中定位下标
    inpreply.value.split('；').forEach((element) => {
      // 中文分号分隔字符串
      if (element) {
        user.userReplyMessage.push(element); // 存储自定义回帖内容
        replyLen++;
      }
    });
    GM_setValue(user.username, user);
    new MessageBox('已使用自定义回复');
    return replyLen;
  } else {
    if (user.fastReply.length && confirm('确认使用快速回复？否则使用历史回复')) {
      GM_setValue(user.username, user);
      new MessageBox('已使用快速回复');
      return user.fastReply.length;
    } else if (user.userReplyMessage.length && confirm('确认使用历史自定义回复？')) {
      GM_setValue(user.username, user);
      new MessageBox('已使用历史自定义回复');
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
  if (currentHref.includes('type-')) {
    thankBatch(`${fid}-${page}-${page}`, 'type');
  } else {
    thankBatch(`${fid}-${page}-${page}`);
  }
}

async function thankBatch(onePage = 0, type = null) {
  const reg = new RegExp(/^\d+-\d+-\d+$/);
  let forumPage = '';
  if (reg.test(onePage)) {
    // 如果输入了正确地址单页
    forumPage = onePage;
  } else {
    forumPage = document.querySelector('#inp_page').value;
  }
  if (reg.test(forumPage)) {
    // 如果输入了正确地址则进行批量处理
    user.page = forumPage;
    GM_setValue(user.username, user);
    let pageFrom = parseInt(forumPage.split('-')[1]); // 获取起点页码
    const pageEnd = parseInt(forumPage.split('-')[2]); // 获取终点页码
    const fid = forumPage.split('-')[0]; // 获取版块代码

    if (pageFrom > pageEnd) {
      new MessageBox('页码错误：起点页不能大于终点页！');
      return;
    }
    const msId = new MessageBox('正在添加：' + forumPage, 'none');

    let replyLen = chooceReply(); //如果输入了值则使用用户值，如果没有则使用默认值；没有默认值则返回错误
    if (replyLen <= 0) {
      new MessageBox('获取回帖内容失败！');
      msId.removeMessage();
      return '获取回帖内容失败！';
    }

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
    new MessageBox(
      '请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1',
      10000
    );
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
  };

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
    if (replyLen == user.fastReply.length || replyLen == user.userReplyMessage.length) {
      // 判断起始位置
    } else {
      start = user.userReplyMessage.length - replyLen; // 用户数组长-增加的数据长=起始位置；
      replyLen = user.userReplyMessage.length; // 结束位置
    }
    const msId = new MessageBox('...', 'none');
    let count = 0; // 贴数统计
    // 遍历去除回帖用户
    for (let i = 0; i < cites.length; i += 2) {
      // 加入数组
      const touser = cites[i].innerHTML;
      const touseruid = cites[i].href.split('uid=')[1]; // href="home.php?mod=space&uid=1123445"
      const href = hrefs[i / 2].href;
      const tid = getTid(href);
      let noSkip = true; // 跳过标识
      for (let index = 0; index < elem.fidthreads.length; index++) {
        // 确保帖子的唯一性
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
        };
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
}

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
    mesIdRep.showMessage('开始回帖...', 'none');
    mesIdRepContent.showMessage('...', 'none');
  } else {
    mesIdThk.showMessage('开始感谢...', 'none');
  }
  playVideo(mesId); // 防休眠

  while (
    (type == 'reply' && fidIndex < user.replyThreads.length) ||
    (type == 'thk' && thkFidIndex < user.replyThreads.length)
  ) {
    // 分别处理感谢和回帖
    const elementForum = user.replyThreads[type == 'reply' ? fidIndex : thkFidIndex];
    const fid = elementForum.fid;
    let fidRepIndex = elementForum.fidRepIndex; // 上次回复位置
    let fidThkIndex = elementForum.fidThkIndex; // 上次感谢位置

    while (
      (elementForum.fidthreads.length > fidRepIndex && type == 'reply') ||
      (elementForum.fidthreads.length > fidThkIndex && type == 'thk')
    ) {
      // 分别处理感谢和回帖
      switch (type) {
        case 'reply': {
          mesIdRep.refreshMessage(
            fid +
              '-版块，当前位置：' +
              fidRepIndex +
              ' ，总数：' +
              elementForum.fidthreads.length +
              '，预计总耗时：' +
              (elementForum.fidTime / 1000 / 60).toFixed(1) +
              ' 分钟时间',
            'none'
          ); // 显示永久消息
          const elementThr = elementForum.fidthreads[fidRepIndex];
          const tid = elementThr.tid;
          const replyIndex = elementThr.replyIndex;
          const replyLen = elementThr.replyLen;
          const randomTime = elementThr.randomTime;
          // 回帖链接
          const replyUrlParamsData = urlSearchParams({
            fid: fid,
            tid: tid,
            extra: 'page%3D1',
            replysubmit: 'yes',
            infloat: 'yes',
            inflohandlekeyat: 'fastpost',
            inajax: 1,
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
          replyParamsObj.subject = '';
          const replyParamsData = urlSearchParams(replyParamsObj);
          // 发送数据
          const data = await postDataCdata(user.replyUrl + replyUrlParamsData.toString(), replyParamsData.toString());
          if (checkHtml(data)) {
            // 确认html
            const info = data.querySelector('script').innerHTML.split(`, `)[1];
            new MessageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
          } else {
            new MessageBox(data, 'none'); //其它情况直接输出
          }
          mesIdRepContent.refreshMessage(
            '序号：' +
              fidRepIndex +
              '，随机号：' +
              replyIndex +
              '，用时：' +
              randomTime +
              '，帖子：' +
              tid +
              '，内容：' +
              replyParamsData.get('message')
          ); //测试使用
          elementForum.fidRepIndex = ++fidRepIndex;
          GM_setValue(user.username, user);
          _this.timer = 1; // 防止重复点击
          await waitFor(randomTime); // 等待指定时间
          break;
        }
        case 'thk': {
          const elementThr = elementForum.fidthreads[fidThkIndex];
          const thkParamsData = urlSearchParams({
            formhash: user.formhash,
            tid: elementThr.tid,
            touser: elementThr.touser,
            touseruid: elementThr.touseruid,
            handlekey: 'k_thankauthor',
            addsubmit: 'true',
          });
          const data = await postDataCdata(user.thkUrl, thkParamsData.toString()); //post感谢数据
          if (checkHtml(data)) {
            const info = data.querySelector('.alert_info').innerHTML.split('<')[0].trim(); //去除html，返回字符串
            new MessageBox(info, 1000);
          } else {
            new MessageBox(data, 1000); //其它情况直接输出
          }
          mesIdThk.refreshMessage(
            fid +
              '-版块，当前位置：' +
              fidThkIndex +
              ' ，总数：' +
              elementForum.fidthreads.length +
              '，帖子ID：' +
              thkParamsData.get('tid'),
            'none'
          ); // 刷新永久消息
          elementForum.fidThkIndex = ++fidThkIndex;
          GM_setValue(user.username, user);
          clearInterval(_this.timer);
          _this.timer = 1; // 防止重复点击
          await waitFor(user.thkDiffer); // 等待指定时间
          break;
        }

        default:
          console.log('参数不在范围');
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
    new MessageBox('全部感谢完成！', 10000, 2);
  } else if (type == 'reply') {
    mesIdRep.removeMessage(); // 移除永久消息
    mesIdRepContent.removeMessage();
    new MessageBox('全部回帖完成！', 10000, 2);
  }
  _this.timer = 0;
  mesId.removeMessage(); // 移除永久消息
}
