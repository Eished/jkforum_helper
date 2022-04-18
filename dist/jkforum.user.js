// ==UserScript==
// @name            JKForum 助手-dev
// @name:en         JKForum Helper
// @name:zh-TW      JKForum 助手
// @name:ja         JKForum 助手
// @name:ko         JKForum 조수
// @namespace       https://github.com/Eished/jkforum_helper
// @version         0.7.0
// @description     JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片，自动识别验证码，自动'现在有空'
// @description:en  JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image
// @description:zh-TWJKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片，自動識別驗證碼，自動'現在有空'
// @description:ja  JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード
// @description:ko  JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오.
// @author          Eished
// @copyright       Eished
// @license         MIT
// @match           *://*.jkforum.net/home*
// @match           *://*.jkforum.net/forum*
// @match           *://*.jkforum.net/type*
// @match           *://*.jkforum.net/thread*
// @match           *://*.jkforum.net/plugin*
// @exclude         *.jkforum.net/member*
// @run-at          document-idle
// @supportURL      https://github.com/Eished/jkforum_helper/issues
// @homepage        https://github.com/Eished/jkforum_helper
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_info
// @grant           GM_xmlhttpRequest
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_addElement
// @grant           GM_addStyle
// @grant           GM_notification
// @connect         mymypic.net
// @connect         aip.baidubce.com
// @connect         cdn.jsdelivr.net
// @connect         raw.githubusercontent.com
// @connect         github.com
// @connect         www.bing.com
// @connect         translate.google.cn
// @connect         translate.google.com
// @connect         greasyfork.org
// @connect         localhost
// @require         https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require         https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js
// @require         https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js
// @require         https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js
// @require         https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzYwNmI3NGQtODA4Zi03YjQ3LWI4NGYtYjNlZmJiMTM4NDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3MzFDMzYyRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MzFDMzYxRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MWY1NjgyLTk5OTctNDU0OS04NjIzLWZhNzY0MmVjMTM5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjNjA2Yjc0ZC04MDhmLTdiNDctYjg0Zi1iM2VmYmIxMzg0MjAiLz4g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
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]