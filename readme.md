# 油猴脚本：捷克论坛助手

## 自动签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OGYyNTM1MDItNTBjZi1mZTQxLWExN2QtYTZhZjk5NjZhOTRiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEwOERDMDgwRUExQTExRUI4MzZCRjdFM0NFRUNDMTM1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEwOERDMDdGRUExQTExRUI4MzZCRjdFM0NFRUNDMTM1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRiZmQyZjYxLTQ3MmYtYzg0My1iYjY4LTI4ODA3MjhhYWEyNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4ZjI1MzUwMi01MGNmLWZlNDEtYTE3ZC1hNmFmOTk2NmE5NGIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7BjYFQAAADDUlEQVR42sRXX0hTURj/net1GoOICgmighF7KFokLWjRQ0JMehqCsHAPFtlKxZGCIuSTewhEBdmExWogRNJLvhSOYPRk0EPRioiRQrWXWVDQtKnT23eObGzuz93u5vzBx/nuuR/n+53vft+532GKokAN1y8wFv2NfSgB50+g7kEbwIANXbeSULNn+QhYTzNd6AscyS3Y6NFCcghlQPGl1TWST1sKgutJ+Bp7lO+qBHQy69zYxBiph6ERGQQysUmuHtHa9ygyq6lJKYsNY9NkEKjEeRHUMYbbOhnvE152NIcAOffQcBe7D2NjPV6vTbMDaQIU9g4aelA7nGyQ8Vhs/NoZyC8/4gfpR6q1eoEcyMFaEhelV5/RUU3n5YCiMMjH55x0psRiMYXDbren57jOwd9l2hqNRmVxcVG8m5+fF3MUAeXD/ew1d8qzW8IuLtND805mTU1NYlxeXk7PpfTUuxQCgQAMBgOWlpbQ19eXd6c9l3Pn9m8fa3q5kvCPjIzAYrFgZWUFXV1diEQiee08jsJr8CrQaXHe0tKCoaEhoft8PoRCIU2bkLTufnJyEnq9HsFgEAMDA5oTURMBv98Pk8kkvntra2tFlaCJAFVE1UpREwGedFx49o+Pj6vaM2eupCBrIeByuWA2m9Hf3w+n0ymSsFAFFCrDigjMzs4KsdlsIgpTU1NFc0GtDLN/VUZjWo9Go0WJTExMbDcwVqvmvJB2OnW73emTr1hYObxeLxYWFoQ+PDysnQB3Go/HhbS3t2+HzeMp+TTkCcnLspSEzEdgPZXZ/GAJh8Po7e3F6Oio6v+Bg5+APB84HA5HVjRLATWv+EZyvJq/Wd4PhKnDOOtW7w94FbyrNgEO07GSGpNVqb4Oc9g7BKWrp/CElNheeKe7wpj0IqwkSR/cA/9zdD94I8qQuqkZGmZq6PwrNaQ3sk5CuxmdvLeogfNIYgNXGrqVP1kEnr4VfeUdWcJNevy1C4751ewhffdzdEeMlnM5vURysGaX03xoa2bSz79oLPN6nqQk+6dm/1+AAQCsGkq3B8nCEQAAAABJRU5ErkJggg==) 

[安装地址](https://greasyfork.org/zh-CN/scripts/427246-jkforum-helper)：`https://greasyfork.org/zh-CN/scripts/427246-jkforum-helper`

[项目地址](https://github.com/Eished/jkforum_helper)：`https://github.com/Eished/jkforum_helper`

## 功能：

- [x] **自动签到、定时签到**：自定义签到和定时签到参数；
- [x] **自动完成投票任务**：自定义投票参数；
- [x] **一键批量回帖、批量感谢**：
   - [x] 自动获取快速回帖内容；可输入回帖内容，回帖历史记录存储；
   - [x] 回帖任务管理、随机内容回帖、回帖进度存储；
   - [x] 自定义回帖基础间隔时间和随机间隔时间范围；
   - [x] 一键添加当前页面的帖子到任务列表，自动跳过已添加贴和已回复贴；
   - [x] 输入 `版块-页码起点-页码终点`，大批量添加任务，页码存储；
   - [x] 自动启动防止浏览器降频休眠功能。
- [x] **自动加载原图**，移除图片上的下载提示；
- [x] **自动感谢** ` 感谢可见` 的贴，自动感谢浏览的贴；
- [x] **自动支付**购买主题 `购买可见` 的贴；
- [x] 移除标题高亮，**已阅的帖子，标题变成灰色**，防止重复点击。
- [x] 版本更新时保留用户数据。
- [x] **一键打包下载帖子图片**。
- [x] **自动播放图片。**
- [x] **油猴菜单栏**：可关闭不需要的功能。
- [ ] 任务列表功能，用于管理批量回帖、感谢任务。

## 使用说明：

- 登录后脚本开始运行。
  
  - 只兼容油猴 Tampermonkey 。
  - 图片不显示、下载返回404时，需更换代理。
  
- 【**油猴菜单栏**】

   - 点击浏览器扩展 油猴插件图标 即可看到

     ![pic_46.png](https://github.com/Eished/jkforum_helper/raw/main/readme.assets/pic_46.png)

     

- 【**定时签到**】按钮：
  
  - 在[签到页面](https://www.jkforum.net/plugin/?id=dsu_paulsign:sign)找到【定时签到】按钮；
  - 在**零点前提前运行定时签到**，在控制台查看进度。
  
- 【**添加本页**】按钮：
  - 在 `https://www.jkforum.net/forum-` URL 开头的**版块页面**激活；

  - 功能为添加本页列表所有帖子到任务列表；

  - 帖子重复添加检测，自动跳过重复贴；

  - 可输入批量回帖内容，可粘贴带有格式的文本，空则使用内置随机回复；输入多条内容时使用**中文分号**分隔 `；`，将每次随机选择一条用于回帖；

  - 回帖内容获取顺序：

    1. 用户当前输入内容；

    2. 内置快速回复（前者为空时，弹窗提示使用）；

    3. 历史自定义输入过的内容（没有获取到前两者时，弹窗提示使用）；

    **注意**：内置的获取快速回复，需要用户有浏览权限（見習騎士），否则需手动输入回复。每次版本更新后自动重新获取。

- 【**添加任务**】按钮：
   - 在首页激活；
   - 功能为添加指定范围所有帖子到任务列表，其它功能和【**添加本页**】按钮相同。
   - 在【版块-1-2】输入框 输入，格式：**`版块代码-起点页-终点页`** ；例如：`640-1-2` ；版块代码见版块URL中间数字：`forum-640-1`
   - 可任意添加不同版块帖子，按添加顺序执行。
   
- 【**回帖**】按钮 、【**感谢**】按钮：

   - 在首页激活；
   - 顺序回复、感谢任务列表里所有帖子。
   - 进度记忆，刷新页面可以继续上次回帖、感谢。
   - 两个按钮可以同时使用。
   - 详细运行进度在控制台查看。

- 【**下载图片**】按钮：

   - 在帖子页面激活；
   - 功能为打包下载本页所有图片。
   - 顺序依次下载，文件夹按帖子标题+图片数量命名，图片按图片标题命名。
   - 会检测文件名是否正确，以及文件缺失时提示。

- 【**自动播放**】按钮：

   - 浏览大图时激活，图片右上角黄色长方形播放按钮；

   - 可设置播放间隔时间；

   - 离开页面自动暂停播放。

     ![图片_36](https://github.com/Eished/jkforum_helper/raw/main/readme.assets/%E5%9B%BE%E7%89%87_36.jpg)

   

- **参数自定义**：

  - 先打开网页运行一次，就可以在脚本看到存储页面：

    ![image-20210611163109214](https://github.com/Eished/jkforum_helper/raw/main/readme.assets/image-20210611163109214.png)

  - 可自定义的值：

    ```javascript
    version: '',
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
    ```
  
  - 如果参数改错了或出现异常，删掉 `"version": "x.x.x",` 和错误参数右边双引号内的内容，运行脚本会自动初始化缺失的参数。
  
  

**注意：保持脚本页面前台运行，否则浏览器会休眠！建议单开一个浏览器窗口跑脚本。**



## 觉得好用就好评吧！你的支持是我前进的动力！