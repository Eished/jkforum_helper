// ==UserScript==
// @name                JKForum 助手
// @name:en             JKForum Helper
// @name:zh-TW          JKForum 助手
// @name:ja             JKForum 助手
// @name:ko             JKForum 조수
// @namespace           https://github.com/Eished/jkforum_helper
// @version             0.8.0
// @description         JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片，自动识别验证码，自动现在有空，登录时跳过手机验证码
// @description:en      JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image，Skip mobile verification code when logging in
// @description:zh-TW   JKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片，自動識別驗證碼，自動現在有空，登錄時跳過手機驗證碼
// @description:ja      JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード，ログイン時にモバイル認証コードをスキップ
// @description:ko      JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오，로그인 시 모바일 인증 코드 건너뛰기
// @author              Eished
// @copyright           Eished
// @license             MIT
// @match               *://*.jkforum.net/home*
// @match               *://*.jkforum.net/forum*
// @match               *://*.jkforum.net/type*
// @match               *://*.jkforum.net/thread*
// @match               *://*.jkforum.net/plugin*
// @match               *://*.jkforum.net/member*

// @run-at              document-idle
// @supportURL          https://github.com/Eished/jkforum_helper/issues
// @homepage            https://github.com/Eished/jkforum_helper
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_info
// @grant               GM_xmlhttpRequest
// @grant               GM_openInTab
// @grant               GM_registerMenuCommand
// @grant               GM_addElement
// @grant               GM_addStyle
// @grant               GM_notification
// @connect             mymypic.net
// @connect             jkf.iknow.fun
// @connect             cdn.jsdelivr.net
// @connect             github.com
// @connect             greasyfork.org
// @connect             jkf.hare200.com
// @require             https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js
// @require             https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js
// @require             https://cdn.jsdelivr.net/npm/react-table@7.8.0/dist/react-table.production.min.js
// @require             https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzYwNmI3NGQtODA4Zi03YjQ3LWI4NGYtYjNlZmJiMTM4NDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3MzFDMzYyRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MzFDMzYxRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MWY1NjgyLTk5OTctNDU0OS04NjIzLWZhNzY0MmVjMTM5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjNjA2Yjc0ZC04MDhmLTdiNDctYjg0Zi1iM2VmYmIxMzg0MjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5urL1nAAAJJUlEQVR42uxba2wU1xX+ZnZ2vYvX4BpDCYVA6xgKkR0wlYlJnyK1iiweVlqgGFpKK6qWAuYtQgitoYANGCTqRnJIQbQ/sJoAKsESMkrTitSQpuJhUBwVHCC21QeCgh17vevd6Tkzs+uZfXgftsevHOvT7twd35lz7rnnfufcGUGWZQxnETHMZdgbQLpy5UpfX0MgjCAkExwabBpEDT4NbkIHoZ3QRviUv/Msbff0/o1ZLBbl5npL0gkZhCkavkj4gtaeqhnArilu6aYfr2YEF6GV8EgS8J/ffh9NaSlo8PlQLwr4iNBAaBUT1YCMKtkdPTJAGuF5wrcIeYQvE0b3hQs5k4CmUmAkm9Kj3Dz/NRJuEP5CWrxDfnSVPn2KRnJsBoDNCSneKUPIJywjvEj4vBnzVCClPqXJMZL9olObVgIm0udEUqTAR8p4fbjmlfGmRcApyYI7QjRDyGo3sQZBGgP8hPAB4TyhyCzlu1VAU5CngVXCDLuEPaT4NZcHx9weTAtEoB6uAvMItYTXCc8N2HCuGYNG3+mw4ceiiL9T4PxVp5fijpCYAThYHSZUE2YOmnVN8wwyRLLDildpavyZvGFqJCOI3QS4twnFg3aB1zwiyYrnaVq82+6mQC3EZoCRhD8Rvj0kmI6sxIdxkoi3yRNmBBtBDENaThBeGFJ0TzUCe/UfPZ30KUQ2wFpC4ZDkvGQEmxXPUEwoV/I/IdQAvK7uHurc3ybhh+QFXwvnAVu1+T90hUaelkf+eEX2dTE7aKRmxaBRxBqd4EQUotJWES92+pBlFVDnN8ACwqiouTOZTxC6ruyjzCRSQYUzLb10d264/+HrWK1WtLe3h5xXd5dSRXcC2R+N/nMTlIAokgG+S65Q5//tnI5cRsThw4fl+vr6APLz8yOeW1VVZTh36tSp3fa9evVqw/l37tyRCwsLld9S7JCby8h+vyNUQn52fPR7DQciRmo/b0DuqMAV7xspgqRlcF+JxYKTJ08GKRI4Tk1NjXjulClTDOc6HI6I52ZnZ+PIkSOGc86cOYNz586FH8kE3d8iGr5PpxXhaW7KjjWxcbuNfuf1eiOe29HRETIFwondbseJEycMyt+6dQsrV65EZ2dnxOwwEWmlW5K7Eignfc1mD5jRg5DSY9m/fz9mzuxKNVpbW1FUVIQnT57E3EdBFiGHlIsSF6wUYlJHqLUnQV0VstgA0/pL+fnz52P9+vWGtjVr1uD69etx9fP1TOBnC7QCWjRxacU3dcgzJa10ZbqMHz8elZWVhraKigqcPHky7r5cHq2C2B73v07kGDCuPwzAyo8b13Xp2tpabNq0ydR7oFiSzgb4nNnKb9iwAQUFBYHjBw8eYPny5SGBs88NQMyXDZBsjrXVSTdr1izs27fP8NuqVavQ0NBgvhsKcLAB7GZcy+PxKMzu+PHjSEpKCrTv3r074nrf56mBDLuoywf6VHh527FjB7KysgJtZ8+exa5du/otpSAyZJFgwvZYW1sb5s2bh23bthnajx07ht7YnLVJmh97oydC8BmrP5IZJEiSJOzdu1dhfXopKSlBTU1NCMOMV07WAu9/Av+eQUR5heJuzjNQN+A0C5hiAJvNhrS0tJD2nJwcrF27FocOHepR/x/+S0U0+dELdE1LV21AgMm7w1evXg2ZBjt37sSkSZNMub4YZrdI0pr63AtaWlqUBOfGjRtYuHAh5syZo7SPGjUKpaWlWLp0acJ9pzsJKYi6JzjSrjtHUL9KZo3+unXrFOVZNm/ejEuXLikFFpYlS5Yoy+OFCxcS6vsX36T5/T2NDndb0IG676xvM8bFvhOmuvrvnALrpby8PCRIxuzapAWvZ9EQnEbzAiRGj53GYBZrPSBY9OTHP/cfPnwYOJ4+fTo2btyYKKHpesSiOwRNEZ8PPlG3KESVsWPHGo4fP36csEc0Nzdjz549hrbt27cjIyPDPCZIE0KMPnMQCFZc5vILV2saGxt7dAOc/t68eTNw7HQ6cfDgQTOzQRcbIKbSS2FhIdLT0wPH9+7dU9ATYQLEAVEvixYtUgolJuUCrWyA/3Y3V1nmzp2LsrIyQ9v58+d7zOBYOPKfPn3a0MbEKDnZlCT1IRvA4MdMWfnJsaqqKpw6dQqXL1/GxYsXMWbMmMA5XKs/evRor90FkyPOF/ySmZmJrVu3muEBzWyAfwbT09zcXCxevFhZn2fPnh3yj8XFxbh9+3av3Qj3FUyHt2zZYiir95E0sAHq9MvctGmRa6T379/HihUrQmp54STYhYN3ioLlwIEDhpjCZXLOFm22JPj6gqmo/PdDZoJcguVyooNTU87Z8/LyMGHCBCUeuFwu3L17V2Fu1dXVePToUUz98wjqgyb3EY0qM0XW1wvYaDa6B5+rl0tlgsIBmMTU+VPif0DdIBmQkkIE8aMS4Kl0lbZlvEy++6Dr95e/A/x6OWIri2sGoFX8Y8GW8qykMcF3B7IBgqVkAS1drV3HeV+Kh85pLNaH92wi2v3JEK9D6wa85to2Z9E3ghJ5j4Z4qDPpzLmBv5v3CDcHiwcouzttOnjim/+dXjRJImqgsyNPg3IMB5EVD3iN4msrZKMj/YGLNkNaeRp9jxeNlD5X6OsB+pn083jS48GmPPMJCn4bJAv+F3jOOOi0y7yED1XXd3fiN0lWvKmvC4Qrih4hlA01/V0evGWVUCxEeVI0kJ8QXh0Kbs+D3e7G78ntl1lEYn9ybAZg4YcmXyI0DVblabnroJHfRm7/AzKAO1zVONq+ABOkXEJlnKtt/wY7WXH5Ggp4X3VYUaZUgyOUzGPZGGkm/FQzxHHC44GotEJvucjnwTu01C20WZBPI/9BgEFGkHj2Ba4RVhF+yZUrqA9Vs1FG9JfCrJjyvpAX9aR8NTVXWS14PzDicuxdJSqTob4xxg8f50B9bS69t/V10DA1lwKp6ltjrsAbY8DfCH8lP75Omrjj0oaNY7VDGD26V990486ehvrgFYOfQH9KMwo/iut/edKmeZ+oux2vFmfcGsNvIfDGwb9tEhqX5eITZxI+5ioO6dlEo+zWvzOYyC57ksMJgZ/PMVEsOuX9O9P+LUufxkL9RjCo1OJS3T3W1wJjEZFIgfDZ2+PDXP4vwABKHSZ0zSd04wAAAABJRU5ErkJggg==
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(81);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(645);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  /* 1 */\n  border-width: 0;\n  /* 2 */\n  border-style: solid;\n  /* 2 */\n  border-color: #e5e7eb;\n  /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n*/\n\nhtml {\n  line-height: 1.5;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4;\n  /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  /* 4 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0;\n  /* 1 */\n  line-height: inherit;\n  /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  border-top-width: 1px;\n  /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0;\n  /* 1 */\n  border-color: inherit;\n  /* 2 */\n  border-collapse: collapse;\n  /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: inherit;\n  /* 1 */\n  color: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  padding: 0;\n  /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button;\n  /* 1 */\n  background-color: transparent;\n  /* 2 */\n  background-image: none;\n  /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  /* 1 */\n  vertical-align: middle;\n  /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\nEnsure the default browser behavior of the `hidden` attribute.\n*/\n\n[hidden] {\n  display: none;\n}\n\n[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n  border-radius: 0px;\n  padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  border-color: #2563eb;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput::placeholder,textarea::placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-date-and-time-value {\n  min-height: 1.5em;\n}\n\n::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\nselect {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  print-color-adjust: exact;\n}\n\n[multiple] {\n  background-image: initial;\n  background-position: initial;\n  background-repeat: unset;\n  background-size: initial;\n  padding-right: 0.75rem;\n  print-color-adjust: unset;\n}\n\n[type='checkbox'],[type='radio'] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 0;\n  print-color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  color: #2563eb;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='checkbox'] {\n  border-radius: 0px;\n}\n\n[type='radio'] {\n  border-radius: 100%;\n}\n\n[type='checkbox']:focus,[type='radio']:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 2px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n\n[type='checkbox']:checked,[type='radio']:checked {\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");\n}\n\n[type='radio']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n}\n\n[type='checkbox']:checked:hover,[type='checkbox']:checked:focus,[type='radio']:checked:hover,[type='radio']:checked:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='checkbox']:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:indeterminate:hover,[type='checkbox']:indeterminate:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='file'] {\n  background: unset;\n  border-color: inherit;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n  font-size: unset;\n  line-height: inherit;\n}\n\n[type='file']:focus {\n  outline: 1px solid ButtonText;\n  outline: 1px auto -webkit-focus-ring-color;\n}\n\n*, ::before, ::after {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.pointer-events-none {\n  pointer-events: none;\n}\n\n.pointer-events-auto {\n  pointer-events: auto;\n}\n\n.static {\n  position: static;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.inset-0 {\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n\n.inset-y-0 {\n  top: 0px;\n  bottom: 0px;\n}\n\n.-left-8 {\n  left: -2rem;\n}\n\n.top-1\\/2 {\n  top: 50%;\n}\n\n.top-0 {\n  top: 0px;\n}\n\n.right-0 {\n  right: 0px;\n}\n\n.left-0 {\n  left: 0px;\n}\n\n.z-50 {\n  z-index: 50;\n}\n\n.m-2 {\n  margin: 0.5rem;\n}\n\n.-m-2 {\n  margin: -0.5rem;\n}\n\n.m-1 {\n  margin: 0.25rem;\n}\n\n.m-4 {\n  margin: 1rem;\n}\n\n.mx-1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n\n.my-1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n\n.-my-6 {\n  margin-top: -1.5rem;\n  margin-bottom: -1.5rem;\n}\n\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n\n.ml-4 {\n  margin-left: 1rem;\n}\n\n.ml-3 {\n  margin-left: 0.75rem;\n}\n\n.mt-8 {\n  margin-top: 2rem;\n}\n\n.mt-1 {\n  margin-top: 0.25rem;\n}\n\n.mt-0\\.5 {\n  margin-top: 0.125rem;\n}\n\n.mt-0 {\n  margin-top: 0px;\n}\n\n.mt-6 {\n  margin-top: 1.5rem;\n}\n\n.ml-auto {\n  margin-left: auto;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.ml-1 {\n  margin-left: 0.25rem;\n}\n\n.block {\n  display: block;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.table {\n  display: table;\n}\n\n.flow-root {\n  display: flow-root;\n}\n\n.h-12 {\n  height: 3rem;\n}\n\n.h-screen {\n  height: 100vh;\n}\n\n.h-fit {\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.h-7 {\n  height: 1.75rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-24 {\n  height: 6rem;\n}\n\n.h-5 {\n  height: 1.25rem;\n}\n\n.h-3 {\n  height: 0.75rem;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.max-h-\\[95\\%\\] {\n  max-height: 95%;\n}\n\n.w-12 {\n  width: 3rem;\n}\n\n.w-\\[800px\\] {\n  width: 800px;\n}\n\n.w-64 {\n  width: 16rem;\n}\n\n.w-screen {\n  width: 100vw;\n}\n\n.w-72 {\n  width: 18rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-24 {\n  width: 6rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.w-5 {\n  width: 1.25rem;\n}\n\n.w-3 {\n  width: 0.75rem;\n}\n\n.w-40 {\n  width: 10rem;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-8 {\n  width: 2rem;\n}\n\n.w-7 {\n  width: 1.75rem;\n}\n\n.min-w-full {\n  min-width: 100%;\n}\n\n.max-w-full {\n  max-width: 100%;\n}\n\n.max-w-md {\n  max-width: 28rem;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n\n.table-auto {\n  table-layout: auto;\n}\n\n.translate-x-full {\n  --tw-translate-x: 100%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.translate-x-0 {\n  --tw-translate-x: 0px;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.cursor-not-allowed {\n  cursor: not-allowed;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-end {\n  align-items: flex-end;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n\n.divide-y > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}\n\n.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-divide-opacity));\n}\n\n.divide-gray-100 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-divide-opacity));\n}\n\n.overflow-auto {\n  overflow: auto;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.overflow-x-hidden {\n  overflow-x: hidden;\n}\n\n.overflow-y-scroll {\n  overflow-y: scroll;\n}\n\n.overflow-ellipsis {\n  text-overflow: ellipsis;\n}\n\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n\n.rounded-md {\n  border-radius: 0.375rem;\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-t {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.rounded-b {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.border-t {\n  border-top-width: 1px;\n}\n\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n\n.border-transparent {\n  border-color: transparent;\n}\n\n.border-gray-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(156 163 175 / var(--tw-border-opacity));\n}\n\n.bg-transparent {\n  background-color: transparent;\n}\n\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.bg-indigo-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(129 140 248 / var(--tw-bg-opacity));\n}\n\n.bg-indigo-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(79 70 229 / var(--tw-bg-opacity));\n}\n\n.bg-gray-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(107 114 128 / var(--tw-bg-opacity));\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n\n.bg-gray-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity));\n}\n\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity));\n}\n\n.bg-blue-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n}\n\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.bg-gray-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(209 213 219 / var(--tw-bg-opacity));\n}\n\n.bg-opacity-75 {\n  --tw-bg-opacity: 0.75;\n}\n\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n\n.bg-cover {\n  background-size: cover;\n}\n\n.bg-center {\n  background-position: center;\n}\n\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.object-center {\n  -o-object-position: center;\n     object-position: center;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-5 {\n  padding: 1.25rem;\n}\n\n.p-1\\.5 {\n  padding: 0.375rem;\n}\n\n.p-1 {\n  padding: 0.25rem;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}\n\n.p-0 {\n  padding: 0px;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.pr-4 {\n  padding-right: 1rem;\n}\n\n.pl-10 {\n  padding-left: 2.5rem;\n}\n\n.pl-2 {\n  padding-left: 0.5rem;\n}\n\n.pl-1 {\n  padding-left: 0.25rem;\n}\n\n.pl-5 {\n  padding-left: 1.25rem;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.leading-tight {\n  line-height: 1.25;\n}\n\n.leading-6 {\n  line-height: 1.5rem;\n}\n\n.tracking-wider {\n  letter-spacing: 0.05em;\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n.text-blue-500 {\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.text-indigo-600 {\n  --tw-text-opacity: 1;\n  color: rgb(79 70 229 / var(--tw-text-opacity));\n}\n\n.text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n\n.text-blue-600 {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\n\n.opacity-0 {\n  opacity: 0;\n}\n\n.opacity-100 {\n  opacity: 1;\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-xl {\n  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n\n.transition {\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.transition-opacity {\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.delay-150 {\n  transition-delay: 150ms;\n}\n\n.duration-300 {\n  transition-duration: 300ms;\n}\n\n.duration-150 {\n  transition-duration: 150ms;\n}\n\n.duration-500 {\n  transition-duration: 500ms;\n}\n\n.duration-75 {\n  transition-duration: 75ms;\n}\n\n.ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n#jkforum-helper .toggle-bg:after {\n  content: '';\n  position: absolute;\n  top: 0.125rem;\n  left: 0.125rem;\n  height: 0.75rem;\n  width: 0.75rem;\n  border-radius: 9999px;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n#jkforum-helper input:checked + .toggle-bg:after {\n  transform: translateX(100%);\n  --tw-border-opacity: 1;\n  border-color: rgb(255 255 255 / var(--tw-border-opacity));\n}\n\n#jkforum-helper input:checked + .toggle-bg {\n  --tw-border-opacity: 1;\n  border-color: rgb(37 99 235 / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\n\n.border-b {\n  border-bottom: 1px solid lightgray;\n}\n\n/* 增加 visited 样式，图片模式已阅的帖子变灰色 */\n\n.xw0 a:visited {\n  color: grey;\n}\n\n#jkforum-helper button {\n  border: unset;\n}\n\n.focus-within\\:text-gray-400:focus-within {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.hover\\:translate-x-9:hover {\n  --tw-translate-x: 2.25rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:rotate-\\[360deg\\]:hover {\n  --tw-rotate: 360deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:scale-110:hover {\n  --tw-scale-x: 1.1;\n  --tw-scale-y: 1.1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:border-gray-200:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n\n.hover\\:bg-indigo-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(67 56 202 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-200:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.hover\\:text-gray-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.hover\\:text-indigo-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(99 102 241 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-900:hover {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n.hover\\:shadow-lg:hover {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.focus\\:border-blue-500:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity));\n}\n\n.focus\\:border-gray-100:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-border-opacity));\n}\n\n.focus\\:bg-indigo-700:focus {\n  --tw-bg-opacity: 1;\n  background-color: rgb(67 56 202 / var(--tw-bg-opacity));\n}\n\n.focus\\:shadow-lg:focus {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-0:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-indigo-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(99 102 241 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-offset-2:focus {\n  --tw-ring-offset-width: 2px;\n}\n\n.active\\:bg-indigo-800:active {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 48 163 / var(--tw-bg-opacity));\n}\n\n.active\\:shadow-lg:active {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.disabled\\:opacity-25:disabled {\n  opacity: 0.25;\n}\n\n.group:hover .group-hover\\:text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n@media (prefers-color-scheme: dark) {\n  .dark\\:border-gray-600 {\n    --tw-border-opacity: 1;\n    border-color: rgb(75 85 99 / var(--tw-border-opacity));\n  }\n\n  .dark\\:bg-gray-700 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:bg-gray-800 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:bg-blue-900 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(30 58 138 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:text-gray-300 {\n    --tw-text-opacity: 1;\n    color: rgb(209 213 219 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-white {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-gray-400 {\n    --tw-text-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-blue-200 {\n    --tw-text-opacity: 1;\n    color: rgb(191 219 254 / var(--tw-text-opacity));\n  }\n\n  .dark\\:placeholder-gray-400::-moz-placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:placeholder-gray-400:-ms-input-placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:placeholder-gray-400::placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:hover\\:bg-gray-600:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(75 85 99 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:hover\\:bg-gray-700:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:hover\\:text-white:hover {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n\n  .dark\\:focus\\:border-blue-500:focus {\n    --tw-border-opacity: 1;\n    border-color: rgb(59 130 246 / var(--tw-border-opacity));\n  }\n\n  .dark\\:focus\\:ring-blue-500:focus {\n    --tw-ring-opacity: 1;\n    --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));\n  }\n\n  .group:hover .dark\\:group-hover\\:text-white {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n}\n\n@media (min-width: 640px) {\n  .sm\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .sm\\:text-xs {\n    font-size: 0.75rem;\n    line-height: 1rem;\n  }\n\n  .sm\\:text-sm {\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n  }\n\n  .sm\\:leading-5 {\n    line-height: 1.25rem;\n  }\n\n  .sm\\:duration-700 {\n    transition-duration: 700ms;\n  }\n}\n", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 466:
/***/ (() => {

(function (workerScript) {
	if (!/MSIE 10/i.test (navigator.userAgent)) {
		try {
			var blob = new Blob (["\
var fakeIdToId = {};\
onmessage = function (event) {\
	var data = event.data,\
		name = data.name,\
		fakeId = data.fakeId,\
		time;\
	if(data.hasOwnProperty('time')) {\
		time = data.time;\
	}\
	switch (name) {\
		case 'setInterval':\
			fakeIdToId[fakeId] = setInterval(function () {\
				postMessage({fakeId: fakeId});\
			}, time);\
			break;\
		case 'clearInterval':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearInterval(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
		case 'setTimeout':\
			fakeIdToId[fakeId] = setTimeout(function () {\
				postMessage({fakeId: fakeId});\
				if (fakeIdToId.hasOwnProperty (fakeId)) {\
					delete fakeIdToId[fakeId];\
				}\
			}, time);\
			break;\
		case 'clearTimeout':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearTimeout(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
	}\
}\
"]);
			// Obtain a blob URL reference to our worker 'file'.
			workerScript = window.URL.createObjectURL(blob);
		} catch (error) {
			/* Blob is not supported, use external script instead */
		}
	}
	var worker,
		fakeIdToCallback = {},
		lastFakeId = 0,
		maxFakeId = 0x7FFFFFFF, // 2 ^ 31 - 1, 31 bit, positive values of signed 32 bit integer
		logPrefix = 'HackTimer.js by turuslan: ';
	if (typeof (Worker) !== 'undefined') {
		function getFakeId () {
			do {
				if (lastFakeId == maxFakeId) {
					lastFakeId = 0;
				} else {
					lastFakeId ++;
				}
			} while (fakeIdToCallback.hasOwnProperty (lastFakeId));
			return lastFakeId;
		}
		try {
			worker = new Worker (workerScript);
			window.setInterval = function (callback, time /* , parameters */) {
				var fakeId = getFakeId ();
				fakeIdToCallback[fakeId] = {
					callback: callback,
					parameters: Array.prototype.slice.call(arguments, 2)
				};
				worker.postMessage ({
					name: 'setInterval',
					fakeId: fakeId,
					time: time
				});
				return fakeId;
			};
			window.clearInterval = function (fakeId) {
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					delete fakeIdToCallback[fakeId];
					worker.postMessage ({
						name: 'clearInterval',
						fakeId: fakeId
					});
				}
			};
			window.setTimeout = function (callback, time /* , parameters */) {
				var fakeId = getFakeId ();
				fakeIdToCallback[fakeId] = {
					callback: callback,
					parameters: Array.prototype.slice.call(arguments, 2),
					isTimeout: true
				};
				worker.postMessage ({
					name: 'setTimeout',
					fakeId: fakeId,
					time: time
				});
				return fakeId;
			};
			window.clearTimeout = function (fakeId) {
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					delete fakeIdToCallback[fakeId];
					worker.postMessage ({
						name: 'clearTimeout',
						fakeId: fakeId
					});
				}
			};
			worker.onmessage = function (event) {
				var data = event.data,
					fakeId = data.fakeId,
					request,
					parameters,
					callback;
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					request = fakeIdToCallback[fakeId];
					callback = request.callback;
					parameters = request.parameters;
					if (request.hasOwnProperty ('isTimeout') && request.isTimeout) {
						delete fakeIdToCallback[fakeId];
					}
				}
				if (typeof (callback) === 'string') {
					try {
						callback = new Function (callback);
					} catch (error) {
						console.log (logPrefix + 'Error parsing callback code string: ', error);
					}
				}
				if (typeof (callback) === 'function') {
					callback.apply (window, parameters);
				}
			};
			worker.onerror = function (event) {
				console.log (event);
			};
		} catch (error) {
			console.log (logPrefix + 'Initialisation failed');
			console.error (error);
		}
	} else {
		console.log (logPrefix + 'Initialisation failed - HTML5 Web Worker is not supported');
	}
}) ('HackTimerWorker.js');


/***/ }),

/***/ 733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!

JSZip v3.9.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if(true)module.exports=t();else {}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e=undefined;if(!t&&e)return require(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/Crc32Probe"),a=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new s).pipe(new a("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.9.1",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var u=t("./utils"),n=t("./external"),i=t("./utf8"),s=t("./zipEntries"),a=t("./stream/Crc32Probe"),l=t("./nodejsUtils");function f(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new a);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:i.utf8decode}),l.isNode&&l.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",t,!0,o.optimizedBinaryString,o.base64).then(function(t){var e=new s(o);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(o.checkCRC32)for(var i=0;i<r.length;i++)e.push(f(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i],s=n.fileNameStr,a=u.resolve(n.fileNameStr);h.file(a,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:o.createFolders}),n.dir||(h.file(a).unsafeOriginalName=s)}return e.zipComment.length&&(h.comment=e.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i)},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.resolve=function(t){for(var e=t.split("/"),r=[],i=0;i<e.length;i++){var n=e[i];"."===n||""===n&&0!==i&&i!==e.length-1||(".."===n?r.pop():r.push(n))}return r.join("/")},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index+4<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i};t.setIndex(n)},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});

/***/ }),

/***/ 745:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(533);
if (true) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else { var i; }


/***/ }),

/***/ 600:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


        var result = __webpack_require__(529);

        if (result && result.__esModule) {
            result = result.default;
        }

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 632:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const lib_1 = __webpack_require__(915);
const Home_1 = __webpack_require__(818);
const react_1 = __importStar(__webpack_require__(995));
const commonMeta = __webpack_require__(419);
const App = ({ username, formhash }) => {
    const [user, setUser] = (0, react_1.useState)();
    const [showHome, setShowHome] = (0, react_1.useState)(false);
    const [counter, setCounter] = (0, react_1.useState)({
        signBtn: 0,
        playBtn: 0,
        playFlag: 0,
        downloadBtn: 0,
        replyBtn: 0,
        thkBtn: 0,
    }); // 防止按钮重复点击
    (0, react_1.useEffect)(() => {
        (0, lib_1.creatUser)(username, formhash)
            .then((user) => {
            setUser(user);
            return user;
        })
            .then((user) => {
            (0, lib_1.launch)(user, counter); // 启动自动签到、投票、加载原图等
        });
    }, [username, formhash, counter]);
    return (react_1.default.createElement("div", { className: "fixed z-50" }, showHome ? (user && (react_1.default.createElement(Home_1.Home, { setShowHome: () => {
            setShowHome(!showHome);
        }, user: user, counter: counter, setCounter: setCounter }))) : (react_1.default.createElement("button", { className: "h-12 w-12 fixed -left-8 top-1/2 block text-white bg-transparent vertical transition ease-in-out delay-150 hover:translate-x-9 hover:scale-110 duration-300 bg-cover bg-center hover:rotate-[360deg]", style: { backgroundImage: `url(${commonMeta.icon})` }, onClick: () => {
            if (user) {
                setShowHome(!showHome);
            }
            else {
                new lib_1.MessageBox('未获取到用户，请稍后再试');
            }
        } }))));
};
exports["default"] = App;


/***/ }),

/***/ 321:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mood = void 0;
var Mood;
(function (Mood) {
    Mood["kaixin"] = "kx";
    Mood["nanguo"] = "ng";
    Mood["yumen"] = "ym";
    Mood["wuliao"] = "wl";
    Mood["fennu"] = "nu";
    Mood["cahan"] = "ch";
    Mood["fendou"] = "fd";
    Mood["yonglan"] = "yl";
    Mood["shuai"] = "shuai";
})(Mood = exports.Mood || (exports.Mood = {}));


/***/ }),

/***/ 237:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Button = ({ text, title = '', onClick, disabled }) => {
    return (react_1.default.createElement("button", { title: title, type: "button", "data-mdb-ripple": "true", "data-mdb-ripple-color": "light", disabled: disabled, className: `mx-1 my-1 px-2 py-1 text-xs font-medium text-center text-white inline-block leading-tight uppercase rounded shadow-md ${disabled
            ? ' cursor-not-allowed bg-indigo-400 '
            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`, onClick: onClick }, text));
};
exports.Button = Button;


/***/ }),

/***/ 84:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Input = ({ label, placeholder, autoComplete, onChange, value, type = 'text' }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("label", { htmlFor: 'input' + label, className: "block m-1 text-xs font-medium text-gray-900 dark:text-gray-300" }, label),
        react_1.default.createElement("input", { autoComplete: autoComplete, type: type, id: 'input' + label, placeholder: placeholder, value: value, onChange: (e) => {
                onChange(e.target.value);
            }, className: "py-1 pl-2 block w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" })));
};
exports.Input = Input;


/***/ }),

/***/ 653:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Modal = ({ header, footer, children, width, height, onClose }) => {
    return (react_1.default.createElement("div", { className: "fixed top-0 right-0 h-full w-full left-0 z-50 overflow-y-auto overflow-x-hidden items-center justify-center flex bg-gray-900 bg-opacity-50" },
        react_1.default.createElement("div", { className: `relative rounded-lg bg-white shadow dark:bg-gray-700 m-4 flex flex-col ${width} ${height}` },
            react_1.default.createElement("div", { className: "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5" },
                react_1.default.createElement("h3", { className: "text-xl font-medium text-gray-900 dark:text-white" }, header),
                react_1.default.createElement("button", { "aria-label": "Close", className: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white", type: "button", onClick: onClose },
                    react_1.default.createElement("svg", { stroke: "currentColor", fill: "none", strokeWidth: "0", viewBox: "0 0 24 24", "aria-hidden": "true", className: "h-5 w-5", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })))),
            react_1.default.createElement("div", { className: "p-6 h-full overflow-auto" }, children),
            react_1.default.createElement("div", { className: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t" }, footer))));
};
exports.Modal = Modal;


/***/ }),

/***/ 414:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Panel = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Panel = ({ title, children }) => {
    return (react_1.default.createElement("div", { className: "border-b py-1" },
        react_1.default.createElement("p", { className: "text-center font-bold" }, title),
        react_1.default.createElement("div", { className: "flex flex-wrap" }, children)));
};
exports.Panel = Panel;


/***/ }),

/***/ 420:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AutoClickManage_1 = __webpack_require__(699);
const react_1 = __importStar(__webpack_require__(995));
const react_table_1 = __webpack_require__(282);
const Button_1 = __webpack_require__(237);
const Toggle_1 = __webpack_require__(219);
const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData, // This is a custom function that we supplied to our table instance
 }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };
    // If the initialValue is changed external, sync it up with our state
    (0, react_1.useEffect)(() => {
        setValue(initialValue);
    }, [initialValue]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { className: "w-12 mx-2", value: value, onChange: onChange, onBlur: onBlur }),
        "\u5206\u949F/\u70B9\u51FB"));
};
const ToggleCell = ({ value, row: { index }, column: { id }, updateMyData, // This is a custom function that we supplied to our table instance
 }) => {
    const update = () => {
        updateMyData(index, id, value === AutoClickManage_1.Status.online ? AutoClickManage_1.Status.offline : AutoClickManage_1.Status.online);
    };
    return react_1.default.createElement(Toggle_1.Toggle, { mykey: `${id}-${index}-${value}`, label: value, onClick: update, checked: value === AutoClickManage_1.Status.online });
};
const DeleteCell = ({ row: { index }, deleteData, // This is a custom function that we supplied to our table instance
 }) => {
    return react_1.default.createElement(Button_1.Button, { text: '删除', onClick: () => deleteData(index) });
};
function ReactTableCard({ title, data, updateMyData, deleteData, skipPageReset = true, searchBar = true, }) {
    const colHeader = (headerItem) => {
        if (headerItem === 'title') {
            return {
                Header: '标题',
                accessor: headerItem,
                Cell: (props) => {
                    return (react_1.default.createElement("strong", { title: props.value, className: "block w-40 whitespace-nowrap overflow-hidden overflow-ellipsis" }, props.value));
                },
            };
        }
        else if (headerItem === 'status') {
            return {
                Header: '运行状态',
                accessor: headerItem,
                Cell: ToggleCell,
            };
        }
        else if (headerItem === 'cycle') {
            return {
                Header: '点击间隔时间',
                accessor: headerItem,
                Cell: EditableCell,
            };
        }
        else if (headerItem === 'delete') {
            return {
                Header: '操作',
                accessor: headerItem,
                Cell: DeleteCell,
            };
        }
        else if (headerItem === 'url') {
            return {
                Header: '地址',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return (react_1.default.createElement("a", { className: "border-b block w-40 whitespace-nowrap overflow-hidden overflow-ellipsis", title: value, href: value }, value));
                },
            };
        }
        else if (headerItem === 'times') {
            return {
                Header: '点击次数',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return react_1.default.createElement("span", null, value + ' 次');
                },
            };
        }
        else {
            return {
                Header: headerItem,
                accessor: headerItem,
            };
        }
    };
    const memoColumns = (0, react_1.useMemo)(() => {
        const headers = Object.keys(data[0]).map(colHeader);
        // push columns
        return headers;
    }, [data]);
    const memoData = (0, react_1.useMemo)(() => data, [data]);
    const memoTitle = (0, react_1.useMemo)(() => title, [title]);
    const defaultSort = () => {
        const headers = Object.keys(data[0]).map(colHeader);
        return headers.filter((col) => (col.Header === 'name' ? { id: 'total', desc: true } : { id: 'sum', desc: true }));
    };
    const defaultColumn = {
        Cell: EditableCell,
    };
    const tableInstance = (0, react_table_1.useTable)({
        columns: memoColumns,
        data: memoData,
        initialState: {
            // sortBy: [defaultSort()],
            pageSize: 5,
        },
        // defaultColumn,
        autoResetPage: !skipPageReset,
        disableSortRemove: true,
        updateMyData,
        deleteData,
    }, react_table_1.useGlobalFilter, react_table_1.useSortBy, react_table_1.usePagination);
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, setGlobalFilter, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize, globalFilter }, } = tableInstance;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "bg-white px-2 py-4 border-b border-gray-200" },
            react_1.default.createElement("h3", { className: "text-lg px-2 py-2 leading-6 font-medium text-gray-900" }, memoTitle),
            searchBar ? (react_1.default.createElement("div", { className: "mx-2 flex-1 relative text-gray-500 focus-within:text-gray-400" },
                react_1.default.createElement("div", { className: "absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none" },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4", height: "25", width: "25" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }))),
                react_1.default.createElement("input", { className: "pl-5 block shadow-sm border-2 transition text-gray-900 disabled:opacity-25 focus:border-gray-100 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm", type: "text", value: globalFilter || '', onChange: (e) => setGlobalFilter(e.target.value) }))) : (''),
            react_1.default.createElement("table", Object.assign({}, getTableProps(), { className: "mb-4 min-w-full divide-y divide-gray-100 table-auto" }),
                react_1.default.createElement("thead", null, headerGroups.map((headerGroup) => (react_1.default.createElement("tr", Object.assign({}, headerGroup.getHeaderGroupProps()), headerGroup.headers.map((column) => (react_1.default.createElement("th", Object.assign({}, column.getHeaderProps(column.getSortByToggleProps()), { className: "px-2 py-3 text-left text-xs text-gray-500 uppercase tracking-wider" }),
                    react_1.default.createElement("div", { className: "flex" },
                        column.render('Header'),
                        column.isSorted ? (column.isSortedDesc ? (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", height: "16", width: "16" },
                            react_1.default.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }))) : (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", height: "16", width: "16" },
                            react_1.default.createElement("path", { fillRule: "evenodd", d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z", clipRule: "evenodd" })))) : (''))))))))),
                react_1.default.createElement("tbody", Object.assign({}, getTableBodyProps()),
                    page.map((row) => {
                        prepareRow(row);
                        return (react_1.default.createElement("tr", Object.assign({}, row.getRowProps(), { className: "hover:bg-gray-200" }), row.cells.map((cell) => {
                            return (react_1.default.createElement("td", Object.assign({}, cell.getCellProps(), { className: "text-xs p-0 h-8 overflow-hidden" }), cell.render('Cell')));
                        })));
                    }),
                    pageSize - page.length > 0 && react_1.default.createElement("tr", { style: { height: (pageSize - page.length) * 32 } }))),
            react_1.default.createElement("div", { className: "flex justify-center bg-gray-100" },
                react_1.default.createElement("div", { className: "px-2 text-left text-xs text-gray-500 tracking-wider" },
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => gotoPage(0), disabled: !canPreviousPage }, '<<'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => previousPage(), disabled: !canPreviousPage }, '<'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => nextPage(), disabled: !canNextPage }, '>'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => gotoPage(pageCount - 1), disabled: !canNextPage }, '>>'),
                    ' ',
                    react_1.default.createElement("span", null,
                        "| Page",
                        ' ',
                        react_1.default.createElement("strong", null,
                            pageIndex + 1,
                            " of ",
                            pageOptions.length),
                        ' '),
                    react_1.default.createElement("span", null,
                        "| Go to page:",
                        ' ',
                        react_1.default.createElement("input", { className: "w-8 bg-gray-100 hover:bg-gray-200", type: "number", defaultValue: pageIndex + 1, onChange: (e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            } })),
                    ' ',
                    react_1.default.createElement("select", { className: "bg-gray-100 hover:bg-gray-200", value: pageSize, onChange: (e) => {
                            setPageSize(Number(e.target.value));
                        } }, [5, 10, 20, 30].map((pageSize) => (react_1.default.createElement("option", { key: pageSize, value: pageSize },
                        "Show ",
                        pageSize)))))))));
}
exports["default"] = ReactTableCard;


/***/ }),

/***/ 815:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextArea = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const TextArea = ({ label, placeholder, onChange, value, rows = 3, cols }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("label", { htmlFor: 'textarea' + label, className: "block m-1 text-xs font-medium text-gray-900 dark:text-gray-300" }, label),
        react_1.default.createElement("textarea", { className: "px-2 block w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", id: 'textarea' + label, rows: rows, cols: cols, placeholder: placeholder, onChange: (e) => {
                onChange(e.target.value);
            }, value: value })));
};
exports.TextArea = TextArea;


/***/ }),

/***/ 219:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Toggle = void 0;
const react_1 = __importStar(__webpack_require__(995));
const Toggle = ({ label, checked, mykey = '-', onClick }) => {
    const [selected, setSelected] = (0, react_1.useState)(checked);
    (0, react_1.useEffect)(() => {
        setSelected(checked);
    }, [checked]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("label", { key: label + mykey, htmlFor: 'toggle-' + mykey + label, className: "mx-1 my-1 flex items-center cursor-pointer relative" },
            react_1.default.createElement("input", { type: "checkbox", id: 'toggle-' + mykey + label, className: "sr-only", checked: selected, onClick: () => {
                    onClick(!selected);
                    setSelected(!selected);
                }, onChange: () => {
                    return;
                } }),
            react_1.default.createElement("div", { className: "toggle-bg bg-gray-300 border-2 border-gray-200 h-4 w-7 rounded-full" }),
            react_1.default.createElement("span", { className: "ml-1 text-gray-900 text-xs" }, label))));
};
exports.Toggle = Toggle;


/***/ }),

/***/ 740:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Toggle = exports.TextArea = exports.Panel = exports.Input = exports.Button = void 0;
var Button_1 = __webpack_require__(237);
Object.defineProperty(exports, "Button", ({ enumerable: true, get: function () { return Button_1.Button; } }));
var Input_1 = __webpack_require__(84);
Object.defineProperty(exports, "Input", ({ enumerable: true, get: function () { return Input_1.Input; } }));
var Panel_1 = __webpack_require__(414);
Object.defineProperty(exports, "Panel", ({ enumerable: true, get: function () { return Panel_1.Panel; } }));
var TextArea_1 = __webpack_require__(815);
Object.defineProperty(exports, "TextArea", ({ enumerable: true, get: function () { return TextArea_1.TextArea; } }));
var Toggle_1 = __webpack_require__(219);
Object.defineProperty(exports, "Toggle", ({ enumerable: true, get: function () { return Toggle_1.Toggle; } }));


/***/ }),

/***/ 629:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_1 = __importDefault(__webpack_require__(632));
const lib_1 = __webpack_require__(915);
__webpack_require__(466); // 定时器不会因为窗口隐藏而降频
const react_1 = __importDefault(__webpack_require__(995));
const client_1 = __webpack_require__(745);
const start = () => {
    (0, lib_1.skipPhoneValidate)();
    const username = (0, lib_1.getUserName)();
    const formhash = (0, lib_1.getFormhash)();
    if (username && formhash) {
        Promise.resolve().then(() => __importStar(__webpack_require__(19)));
        // 初始化消息盒子
        lib_1.MessageBox.generate();
        // 添加根元素
        const rootDiv = document.createElement('div');
        rootDiv.id = 'jkforum-helper';
        document.body.prepend(rootDiv);
        const root = (0, client_1.createRoot)(rootDiv); // createRoot(container!) if you use TypeScript
        root.render(react_1.default.createElement(app_1.default, { username: username, formhash: formhash }));
    }
};
if (true) {
    start();
}
else {}


/***/ }),

/***/ 516:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postData = exports.postDataCdata = exports.getData = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// GM_xmlhttpRequest GET异步通用模块
function getData(url, type = "document" /* DOCUMENT */, usermethod = "GET" /* GET */) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: usermethod,
            url: url,
            responseType: type,
            timeout: 5 * 60 * 1000,
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve(response.response);
                }
                else {
                    reject(response);
                }
            },
            onerror: function (error) {
                new _1.MessageBox('网络错误');
                reject(error);
            },
            ontimeout: () => {
                new _1.MessageBox('网络超时', 'none', 2 /* LOG_POP_GM */);
                reject('timeout');
            },
        });
    });
}
exports.getData = getData;
function postDataCdata(url, postData, responseType = "document" /* DOCUMENT */, usermethod = "POST" /* POST */, contentType = "application/x-www-form-urlencoded" /* FORM */) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: usermethod,
            url: url,
            headers: {
                'Content-Type': contentType,
            },
            data: postData,
            responseType: responseType,
            timeout: 1 * 60 * 1000,
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve((0, tools_1.turnCdata)(response.response));
                }
                else {
                    new _1.MessageBox('请求错误：' + response.status);
                    reject(response.status);
                }
            },
            onerror: function (error) {
                new _1.MessageBox('网络错误');
                reject(error);
            },
            ontimeout: () => {
                new _1.MessageBox('网络超时', 'none', 2 /* LOG_POP_GM */);
                reject('timeout');
            },
        });
    });
}
exports.postDataCdata = postDataCdata;
// 正常的post
function postData(url, data, { responseType = "document" /* DOCUMENT */, usermethod = "POST" /* POST */, contentType = "application/x-www-form-urlencoded" /* FORM */, authorization, cookie, } = {
    responseType: "document" /* DOCUMENT */,
    usermethod: "POST" /* POST */,
    contentType: "application/x-www-form-urlencoded" /* FORM */,
}) {
    const headers = {
        'content-type': contentType,
    };
    if (authorization) {
        headers.authorization = authorization;
    }
    if (cookie) {
        headers.cookie = cookie;
    }
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: usermethod,
            url,
            headers,
            data,
            responseType: responseType,
            timeout: 1 * 60 * 1000,
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve(response.response);
                }
                else {
                    reject(response);
                }
            },
            onerror: function (error) {
                reject(error);
            },
            ontimeout: () => {
                new _1.MessageBox('网络超时', 'none', 2 /* LOG_POP_GM */);
                reject('timeout');
            },
        });
    });
}
exports.postData = postData;


/***/ }),

/***/ 134:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadImgs = exports.noDisplayPic = void 0;
const ConcurrencyPromisePool_1 = __webpack_require__(287);
const file_saver_1 = __webpack_require__(581);
const jszip_1 = __importDefault(__webpack_require__(733));
const _1 = __webpack_require__(915);
function downloadImgs(user, counter, setCounter) {
    var _a;
    // 防重复点击
    setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 1 }));
    const imgsUrls = []; // 图片下载链接
    const imgsTitles = []; // 图片名称
    const foName = document.querySelector('.title-cont h1');
    if (!foName) {
        new _1.MessageBox('没有帖子标题！');
        return setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
    }
    const folderName = foName.innerHTML.trim().replace(/\.+/g, '-');
    const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
    if (pcbImg.length) {
        for (let i = 0; i < pcbImg.length; i++) {
            //遍历图片列表
            const img = pcbImg[i];
            if (img.title && img.getAttribute('file') && ((_a = img.getAttribute('file')) === null || _a === void 0 ? void 0 : _a.includes('mymypic.net'))) {
                const reg = /\./g;
                if (!reg.test(img.title)) {
                    // 文件格式校验
                    if (reg.test(img.alt)) {
                        // 文件格式修复
                        img.title = img.alt;
                    }
                    else {
                        new _1.MessageBox('获取图片名失败！');
                        setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
                        return;
                    }
                }
                const imgTitles = img.title.split('.');
                const title = `${imgTitles[imgTitles.length - 2]}-${i + 1}.${imgTitles[imgTitles.length - 1]}`; // 标题 +i.jpg，防重名！
                imgsTitles.push(title); // 保存下载名称到数组
                const imgAtrrFile = img.getAttribute('file');
                imgAtrrFile && imgsUrls.push(imgAtrrFile.split('.thumb.')[0]); // 保存下载链接到数组
            }
            else if (!img.getAttribute('file') && img.src.includes('mymypic.net')) {
                const nameSrc = img.src.split('/');
                imgsTitles.push(nameSrc[nameSrc.length - 1]); // 保存下载名称到数组
                imgsUrls.push(img.src.split('.thumb.')[0]); // 保存下载链接到数组
            }
            else {
                // console.log(img.src, '跨域请求，不可下载外链图片！');
                // new MessageBox('跨域请求，不可下载外链图片！');
            }
        }
        if (imgsUrls.length && imgsTitles.length) {
            batchDownload(imgsUrls, imgsTitles, folderName, user, counter, setCounter);
        }
        else {
            new _1.MessageBox('没有可下载的图片！');
            setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
            return 0;
        }
    }
    else {
        new _1.MessageBox('没有图片！');
        setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
        return 0;
    }
}
exports.downloadImgs = downloadImgs;
// 批量下载 顺序
function batchDownload(imgsUrls, imgsTitles, folderName, user, counter, setCounter) {
    const zip = new jszip_1.default();
    const promises = [];
    const mesIdH = new _1.MessageBox('正在下载...', 'none'); // 永久消息
    const mesIdP = new _1.MessageBox('...', 'none'); // 永久消息
    for (let index = 0; index < imgsUrls.length; index++) {
        const item = imgsUrls[index];
        // 包装成 promise
        const promise = () => {
            const file_name = imgsTitles[index]; // 获取文件名
            mesIdH.refresh(`正在下载：第 ${index + 1} / ${imgsUrls.length} 张，文件名：${file_name}`);
            return (0, _1.getData)(item, "blob" /* BLOB */)
                .then((blob) => {
                const data = blob;
                // 下载文件, 并存成ArrayBuffer对象
                zip.file(file_name, data, {
                    binary: true,
                }); // 逐个添加文件
                mesIdP.refresh(`第 ${index + 1} 张，文件名：${file_name}，大小：${(data.size / 1024).toFixed(0)} Kb，下载完成！等待压缩...`);
            })
                .catch((err) => {
                // 移除消息；
                if (err.responseText) {
                    const domParser = new DOMParser();
                    const xmlDoc = domParser.parseFromString(err.responseText, 'text/html');
                    mesIdP.refresh(`第 ${index + 1} 张，请求错误：${xmlDoc.body.innerHTML}`);
                }
                else if (err.status) {
                    console.error(err.status);
                }
                else {
                    console.error(err);
                }
                return -1; // 错误处理, 标记错误并返回
            });
        };
        promises.push(promise);
    }
    const pool = new ConcurrencyPromisePool_1.ConcurrencyPromisePool(user.limit);
    pool.all(promises).then((results) => {
        mesIdH.remove();
        counter.downloadBtn = 0;
        for (let i = 0; i < results.length; i++) {
            if (results[i] == -1) {
                // new MessageBox("文件缺失！")
                counter.downloadBtn++;
            }
        }
        if (results.length == counter.downloadBtn) {
            new _1.MessageBox('全部图片下载失败！');
            mesIdP.remove();
            setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
            return;
        }
        if (counter.downloadBtn) {
            if (!confirm(`检测到文件缺失 ${counter.downloadBtn} 张，是否继续压缩？`)) {
                mesIdP.remove();
                setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
                return;
            }
        }
        mesIdP.refresh('正在压缩打包，大文件请耐心等待...');
        zip
            .generateAsync({
            type: 'blob',
        })
            .then((content) => {
            // 生成二进制流
            mesIdP.remove();
            setCounter(Object.assign(Object.assign({}, counter), { downloadBtn: 0 }));
            (0, file_saver_1.saveAs)(content, `${folderName} [${imgsUrls.length}P]`); // 利用file-saver保存文件，大文件需等待很久
        });
    });
}
function noDisplayPic() {
    var _a;
    const pcbImg = document.querySelectorAll('.pcb img'); // 所有帖子楼层的图片，逐个过滤
    if (pcbImg.length) {
        for (let i = 0; i < pcbImg.length; i++) {
            //遍历图片列表
            const img = pcbImg[i];
            // 前10张
            if (img.title && img.getAttribute('file') && ((_a = img.getAttribute('file')) === null || _a === void 0 ? void 0 : _a.includes('mymypic.net'))) {
                img.src = 'https://www.jkforum.net/static/image/common/none.gif';
                // new MessageBox("屏蔽图片成功");
                // 懒加载部分
                const observer = new MutationObserver(() => {
                    // 监听元素子节点属性变化，然后屏蔽链接
                    if (img.src != 'https://www.jkforum.net/static/image/common/none.gif') {
                        observer.disconnect(); // 断开监听
                        console.log('屏蔽图片成功：', img.src);
                        img.src = 'https://www.jkforum.net/static/image/common/none.gif';
                    }
                }); // 建立监听器
                observer.observe(img, {
                    // 开始监听
                    attributes: true,
                });
            }
        }
        new _1.MessageBox('屏蔽图片完成！');
    }
    else {
        new _1.MessageBox('没有图片！');
    }
}
exports.noDisplayPic = noDisplayPic;


/***/ }),

/***/ 662:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setFastReply = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
function setFastReply(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // 设置快速回复
        try {
            const htmlData = yield (0, _1.getData)(user.fastReplyUrl);
            const options = htmlData.querySelectorAll('#rqcss select option');
            const fastReply = []; //返回数组
            if (options.length) {
                options.forEach((option) => {
                    if (option.value) {
                        //去掉空值
                        fastReply.push((0, tools_1.replaceHtml)(option.value)); //去掉需要转义的内容
                    }
                });
            }
            else {
                new _1.MessageBox('获取快速回复失败！');
                return user;
            }
            if (fastReply.length) {
                user.fastReply = fastReply;
                new _1.MessageBox('获取快速回复成功！');
            }
            else {
                new _1.MessageBox('获取快速回复失败！');
            }
            return user;
        }
        catch (e) {
            console.error(e);
            return user;
        }
    });
}
exports.setFastReply = setFastReply;


/***/ }),

/***/ 825:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skipPhoneValidate = void 0;
const _1 = __webpack_require__(915);
const AccessTokenUrl = 'https://jkf.hare200.com/gapi/pan.general.member.MemberServiceV2/AccessToken';
const SigninUrl = 'https://www.jkforum.net/api/pan/sso_signin.php';
const genButton = (text, foo) => {
    const b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'margin:16px 10px 0px 0px;float:left';
    if (foo) {
        b.addEventListener('click', foo);
    }
    return b;
};
const skipPhoneValidate = () => {
    var _a;
    if (location.href.includes('https://www.jkforum.net/member.php')) {
        (_a = document.querySelector('.status_loginned')) === null || _a === void 0 ? void 0 : _a.append(genButton('登录前点击按钮跳过手机验证', hackLogin));
    }
};
exports.skipPhoneValidate = skipPhoneValidate;
const hackLogin = () => {
    const xhrSend = XMLHttpRequest.prototype.send;
    let isAuthMethod = 0;
    XMLHttpRequest.prototype.send = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isAuthMethod) {
                const authBase64 = args[0];
                const response = yield (0, _1.postData)(AccessTokenUrl, authBase64, {
                    contentType: "application/grpc-web-text" /* GRCP */,
                    responseType: "application/grpc-web-text" /* GRCP */,
                    usermethod: "POST" /* POST */,
                });
                const reg = /[ey].*�/;
                const results = response.match(reg);
                if (results) {
                    const jwt = results[0].replace(/�/, '');
                    yield (0, _1.postData)(SigninUrl, undefined, {
                        contentType: "application/grpc-web-text" /* GRCP */,
                        authorization: 'Bearer ' + jwt,
                        responseType: "application/grpc-web-text" /* GRCP */,
                    });
                    window.location.reload();
                }
            }
            return xhrSend.apply(this, args);
        });
    };
    const xhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (url === AccessTokenUrl) {
            isAuthMethod = 1;
        }
        else {
            isAuthMethod = 0;
        }
        return xhrOpen.apply(this, [method, url, true]);
    };
};


/***/ }),

/***/ 915:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setTimeoutWorker = exports.setIntervalWorker = exports.autoVoted = exports.User = exports.getUserName = exports.getUserFromName = exports.getFormhash = exports.creatUser = exports.autoThk = exports.timeControl = exports.sign = exports.resetReplyData = exports.replyOrThk = exports.addPageBatch = exports.addOnePage = exports.autoPlay = exports.addPlayEvent = exports.autoPay = exports.loadOriginImage = exports.autofillCaptcha = exports.MessageBox = exports.update = exports.swThk = exports.swRePic = exports.swPay = exports.launch = exports.skipPhoneValidate = exports.setFastReply = exports.noDisplayPic = exports.downloadImgs = exports.postDataCdata = exports.postData = exports.getData = void 0;
var ajax_1 = __webpack_require__(516);
Object.defineProperty(exports, "getData", ({ enumerable: true, get: function () { return ajax_1.getData; } }));
Object.defineProperty(exports, "postData", ({ enumerable: true, get: function () { return ajax_1.postData; } }));
Object.defineProperty(exports, "postDataCdata", ({ enumerable: true, get: function () { return ajax_1.postDataCdata; } }));
var downloadPicture_1 = __webpack_require__(134);
Object.defineProperty(exports, "downloadImgs", ({ enumerable: true, get: function () { return downloadPicture_1.downloadImgs; } }));
Object.defineProperty(exports, "noDisplayPic", ({ enumerable: true, get: function () { return downloadPicture_1.noDisplayPic; } }));
var fastReply_1 = __webpack_require__(662);
Object.defineProperty(exports, "setFastReply", ({ enumerable: true, get: function () { return fastReply_1.setFastReply; } }));
var hackLogin_1 = __webpack_require__(825);
Object.defineProperty(exports, "skipPhoneValidate", ({ enumerable: true, get: function () { return hackLogin_1.skipPhoneValidate; } }));
var launch_1 = __webpack_require__(450);
Object.defineProperty(exports, "launch", ({ enumerable: true, get: function () { return launch_1.launch; } }));
var menuCommand_1 = __webpack_require__(817);
Object.defineProperty(exports, "swPay", ({ enumerable: true, get: function () { return menuCommand_1.swPay; } }));
Object.defineProperty(exports, "swRePic", ({ enumerable: true, get: function () { return menuCommand_1.swRePic; } }));
Object.defineProperty(exports, "swThk", ({ enumerable: true, get: function () { return menuCommand_1.swThk; } }));
Object.defineProperty(exports, "update", ({ enumerable: true, get: function () { return menuCommand_1.update; } }));
var message_1 = __webpack_require__(244);
Object.defineProperty(exports, "MessageBox", ({ enumerable: true, get: function () { return message_1.MessageBox; } }));
var ocr_1 = __webpack_require__(2);
Object.defineProperty(exports, "autofillCaptcha", ({ enumerable: true, get: function () { return ocr_1.autofillCaptcha; } }));
var originImage_1 = __webpack_require__(87);
Object.defineProperty(exports, "loadOriginImage", ({ enumerable: true, get: function () { return originImage_1.loadOriginImage; } }));
var pay_1 = __webpack_require__(363);
Object.defineProperty(exports, "autoPay", ({ enumerable: true, get: function () { return pay_1.autoPay; } }));
var play_1 = __webpack_require__(687);
Object.defineProperty(exports, "addPlayEvent", ({ enumerable: true, get: function () { return play_1.addPlayEvent; } }));
Object.defineProperty(exports, "autoPlay", ({ enumerable: true, get: function () { return play_1.autoPlay; } }));
var replyAndThank_1 = __webpack_require__(872);
Object.defineProperty(exports, "addOnePage", ({ enumerable: true, get: function () { return replyAndThank_1.addOnePage; } }));
Object.defineProperty(exports, "addPageBatch", ({ enumerable: true, get: function () { return replyAndThank_1.addPageBatch; } }));
Object.defineProperty(exports, "replyOrThk", ({ enumerable: true, get: function () { return replyAndThank_1.replyOrThk; } }));
var resetReplyData_1 = __webpack_require__(821);
Object.defineProperty(exports, "resetReplyData", ({ enumerable: true, get: function () { return resetReplyData_1.resetReplyData; } }));
var sign_1 = __webpack_require__(943);
Object.defineProperty(exports, "sign", ({ enumerable: true, get: function () { return sign_1.sign; } }));
Object.defineProperty(exports, "timeControl", ({ enumerable: true, get: function () { return sign_1.timeControl; } }));
var thank_1 = __webpack_require__(226);
Object.defineProperty(exports, "autoThk", ({ enumerable: true, get: function () { return thank_1.autoThk; } }));
var user_1 = __webpack_require__(506);
Object.defineProperty(exports, "creatUser", ({ enumerable: true, get: function () { return user_1.creatUser; } }));
Object.defineProperty(exports, "getFormhash", ({ enumerable: true, get: function () { return user_1.getFormhash; } }));
Object.defineProperty(exports, "getUserFromName", ({ enumerable: true, get: function () { return user_1.getUserFromName; } }));
Object.defineProperty(exports, "getUserName", ({ enumerable: true, get: function () { return user_1.getUserName; } }));
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_1.User; } }));
var vote_1 = __webpack_require__(608);
Object.defineProperty(exports, "autoVoted", ({ enumerable: true, get: function () { return vote_1.autoVoted; } }));
var webWorker_1 = __webpack_require__(67);
Object.defineProperty(exports, "setIntervalWorker", ({ enumerable: true, get: function () { return webWorker_1.setIntervalWorker; } }));
Object.defineProperty(exports, "setTimeoutWorker", ({ enumerable: true, get: function () { return webWorker_1.setTimeoutWorker; } }));


/***/ }),

/***/ 450:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.launch = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// 启动
function launch(user, counter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 增加路由地址判断，只执行对应函数
            const localUrl = location.href;
            if (location.href.includes('thread')) {
                if (user.autoThkSw) {
                    // 自动感谢当前贴
                    yield (0, _1.autoThk)(user);
                }
                if (user.autoPaySw) {
                    // 自动购买当前贴
                    yield (0, _1.autoPay)(user);
                }
                if (user.autoRePicSw) {
                    // 自动加载原图；
                    (0, _1.loadOriginImage)();
                }
                // 自动播放图片
                (0, _1.addPlayEvent)(counter, user);
            }
            else if (localUrl.includes('/forum-') ||
                localUrl.includes('/type-')
            // || localUrl.includes('forum.php?mod=forumdisplay') //  图片模式只有一个页面，不需要
            ) {
                // 去掉高亮标题
                const hightLightTitles = document.querySelectorAll('[style="color: #2B65B7"]');
                if (hightLightTitles.length) {
                    hightLightTitles.forEach((e) => {
                        e.style.color = '';
                    });
                }
            }
            // 天变动则签到\投票
            const now = new tools_1.NowTime();
            if (user.today != now.day) {
                user.today = now.day;
                (0, _1.sign)(user); // 签到
                yield (0, _1.autoVoted)(user);
            }
        }
        catch (e) {
            GM_setValue(user.username, user); //保存当天日// today 初始化
            console.error(e);
        }
    });
}
exports.launch = launch;


/***/ }),

/***/ 817:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swRePic = exports.swPay = exports.swThk = exports.update = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
function swRePic(user) {
    if (user.autoRePicSw) {
        user.autoRePicSw = false;
        GM_setValue(user.username, user);
        new _1.MessageBox('已关闭加载原图');
    }
    else {
        user.autoRePicSw = true;
        GM_setValue(user.username, user);
        new _1.MessageBox('已开启加载原图');
    }
}
exports.swRePic = swRePic;
function swPay(user) {
    if (user.autoPaySw) {
        user.autoPaySw = false;
        GM_setValue(user.username, user);
        new _1.MessageBox('已关闭自动购买');
    }
    else {
        user.autoPaySw = true;
        GM_setValue(user.username, user);
        new _1.MessageBox('已开启自动购买');
    }
}
exports.swPay = swPay;
function swThk(user) {
    if (user.autoThkSw) {
        user.autoThkSw = false;
        GM_setValue(user.username, user);
        new _1.MessageBox('已关闭自动感谢');
    }
    else {
        user.autoThkSw = true;
        GM_setValue(user.username, user);
        new _1.MessageBox('已开启自动感谢');
    }
}
exports.swThk = swThk;
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        new _1.MessageBox('正在检查更新...');
        const data = yield (0, _1.getData)(user.greasyforkUrl);
        const version = data.querySelectorAll('.script-show-version span')[1].innerHTML;
        if ((0, tools_1.getVersionNum)(user.version) < (0, tools_1.getVersionNum)(version)) {
            GM_openInTab(`${user.greasyforkUrl}-jkforum-%E5%8A%A9%E6%89%8B/code/JKForum%20%E5%8A%A9%E6%89%8B.user.js`);
        }
        else {
            new _1.MessageBox('已是最新版本！');
        }
    });
}
exports.update = update;


/***/ }),

/***/ 244:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageBox = void 0;
/**
 * 消息通知类：不依赖框架
 * @param text string | undefined
 * @param setTime number | string = 5000,
 * @param importance number = 1
 * @example
 * 0.先在入口文件中调用静态方法 generate() 方法初始化消息弹出窗口；
 * 1. new MessageBox('hello')
 * 2.空初始化时调用 show() 显示消息；
 * 3.setTime：ms，非数字时为永久消息，需手动调用 refresh() 刷新消息，remove() 移除消息；
 * 4.importance：1： log + 自定义弹窗；2： log + 自定义弹窗 + GM系统提示；其它值：自定义弹窗；
 */
class MessageBox {
    constructor(text, setTime = 5000, importance = 1 /* LOG_POP */) {
        this._msg = null; // 永久显示标记，和元素地址
        this._text = text;
        this._setTime = setTime;
        this._importance = importance;
        this._timer = 0; // 计数器
        // 非空初始化，立即执行；
        if (text !== undefined && text !== null) {
            this.show();
        }
    }
    // 静态方法，初始化消息盒子，先调用本方法初始化消息弹出窗口
    static generate() {
        // 添加样式
        GM_addStyle(`
      #messageBox {
        width: 222px; 
        position: fixed; 
        right: 5%; 
        bottom: 20px; 
        z-index: 999
      }
      #messageBox div {
        width: 100%; 
        background-color: #64ce83; 
        float: left; 
        padding: 5px 10px; 
        margin-top: 10px; 
        border-radius: 10px; 
        color: #fff; 
        box-shadow: 0px 0px 1px 3px #ffffff
      }
      `);
        this._msgBox = document.createElement('div'); // 创建类型为div的DOM对象
        this._msgBox.id = 'messageBox';
        document.body.append(this._msgBox); // 消息盒子添加到body
    }
    // 显示消息
    show(text = this._text, setTime = this._setTime, importance = this._importance) {
        if (this._msg !== null) {
            throw new Error('先移除上条消息，才可再次添加！');
        }
        if (text === undefined || text === null) {
            throw new Error('未输入消息');
        }
        this._text = text;
        this._setTime = setTime;
        this._importance = importance;
        this._msg = document.createElement('div');
        this._msg.textContent = text;
        MessageBox._msgBox.append(this._msg); // 显示消息
        switch (importance) {
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
        if (setTime && !isNaN(Number(setTime))) {
            // 默认5秒删掉消息，可设置时间，none一直显示
            setTimeout(() => {
                this.remove();
            }, Number(setTime));
        }
    }
    refresh(text) {
        if (isNaN(Number(this._setTime)) && this._msg) {
            this._msg.textContent = text;
            switch (this._importance) {
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
        }
        else {
            throw new Error('只有弹窗永久消息支持刷新内容：' + this._setTime);
        }
    }
    // 移除方法，没有元素则等待setTime 5秒再试5次
    remove() {
        if (this._msg) {
            this._msg.remove();
            this._msg = null; // 清除标志位
        }
        else {
            // 空初始化时，消息异步发送，导致先执行移除而获取不到元素，默认 setTime=5000
            // 消息发出后，box 非空，可以移除，不会执行 setTime="none"
            if (this._timer == 4) {
                throw new Error('移除的元素不存在：' + this._msg);
            }
            this._timer++;
            setTimeout(() => {
                this.remove();
            }, Number(this._setTime));
        }
    }
}
exports.MessageBox = MessageBox;


/***/ }),

/***/ 2:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autofillCaptcha = exports.RETRY = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
/**
 * OCR
 */
exports.RETRY = 'retry';
function captcha(url, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.id = 'captcha';
            image.src = '/captcha/code.php' + '?' + new Date().getMilliseconds();
            image.width = 120;
            document.body.append(image);
            image.onload = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    //文件的Base64字符串获取验证码
                    const code = yield readImage(getBase64Image(image), user);
                    if (image.parentNode) {
                        image.parentNode.removeChild(image);
                    }
                    if (typeof code === 'object') {
                        // 令牌错误不重试，使用空格通配
                        if (code.error_code === 100 || code.error_code === 111 || code.error_code === 110) {
                            new _1.MessageBox(code.error_msg + '：令牌错误，需要令牌请登录 jkf.iknow.fun 或发送邮件到 kished@outlook.com ', 10000, 2 /* LOG_POP_GM */);
                        }
                        else {
                            new _1.MessageBox(code.error_msg + ' 未处理的错误，请手动重试或联系管理员', 10000, 2 /* LOG_POP_GM */);
                        }
                        return reject(code.error_msg);
                    }
                    const result = yield (0, _1.postData)(url, (0, tools_1.urlSearchParams)({ captcha_input: code }).toString())
                        .then((response) => (0, tools_1.turnCdata)(response))
                        .catch((e) => {
                        console.log(e);
                        return exports.RETRY;
                    });
                    if (result === exports.RETRY) {
                        new _1.MessageBox('验证码发送失败，正在重试...');
                        return reject(exports.RETRY);
                    }
                    else if (result === '更新完成！若狀態仍沒更新，請嘗試刷新頁面') {
                        new _1.MessageBox('更新完成！自動‘現在有空’中，請不要刷新頁面！', user.freeTime);
                        return resolve(result);
                    }
                    else {
                        new _1.MessageBox('验证码错误，正在重试...');
                        return reject(exports.RETRY);
                    }
                });
            };
            image.onerror = function (error) {
                console.log(error);
                if (image.parentNode) {
                    image.parentNode.removeChild(image);
                }
                new _1.MessageBox('验证码图片加载失败，正在重试...');
                return reject(exports.RETRY);
            };
        });
    });
}
/**
 * 图像转Base64
 */
function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx && ctx.drawImage(img, 0, 0, img.width, img.height);
    const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
    const dataURL = canvas.toDataURL('image/' + ext);
    return dataURL;
}
function readImage(base64, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = (0, tools_1.urlSearchParams)({ image: base64, token: user.token }).toString();
        const response = yield (0, _1.postData)(user.ocrUrl, body, {
            responseType: "json" /* JSON */,
            usermethod: "POST" /* POST */,
            contentType: "application/x-www-form-urlencoded" /* FORM */,
        }).catch((e) => {
            var _a;
            return { error_msg: (_a = e.response) === null || _a === void 0 ? void 0 : _a.message, error_code: 100 };
        });
        const ocrResults = response;
        if ('words_result_num' in ocrResults) {
            if (ocrResults.words_result_num === 1 && ocrResults.words_result[0].words.length === 4) {
                return ocrResults.words_result[0].words;
            }
        }
        if ('error_msg' in ocrResults) {
            return ocrResults;
        }
        return String((0, tools_1.rdNum)(1000, 10000));
    });
}
function autofillCaptcha(t, user, saveTimesData, saveStatusData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `${user.votedUrl}id=topthreads:setstatus&tid=${(0, tools_1.getTid)(t.url)}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;
            const result = yield captcha(url, user);
            // 调用计数
            saveTimesData(t);
            setTimeout(() => {
                autofillCaptcha(t, user, saveTimesData, saveStatusData);
            }, Number(t.cycle) * 60 * 1000);
        }
        catch (e) {
            if (e === exports.RETRY) {
                // 调用计数
                saveTimesData(t);
                setTimeout(() => {
                    autofillCaptcha(t, user, saveTimesData, saveStatusData);
                }, 2000 + (0, tools_1.rdNum)(1000, 4000)); // 重试频率限制
            }
            else {
                // 错误则改变状态
                saveStatusData(t);
            }
        }
    });
}
exports.autofillCaptcha = autofillCaptcha;


/***/ }),

/***/ 87:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadOriginImage = void 0;
const _1 = __webpack_require__(915);
// 加载原图，自动播放
function loadOriginImage() {
    return __awaiter(this, void 0, void 0, function* () {
        const tfImg = document.querySelectorAll('.t_f ignore_js_op img'); //获取图片列表，附件也是ignore_js_op
        if (tfImg) {
            // 加载原图开关
            let count = 0;
            for (let i = 0; i < tfImg.length; i++) {
                //遍历图片列表
                const img = tfImg[i];
                img.setAttribute('onmouseover', ''); // 去掉下载原图提示
                const file = img.getAttribute('file');
                if (img.src.includes('.thumb.') && file) {
                    // 去掉缩略图 加载部分
                    img.src = file.split('.thumb.')[0];
                    console.log('加载原图成功 thumb：', img.src);
                    count++;
                }
                else if (img.src.includes('static/image/common/none.gif') && img.getAttribute('file')) {
                    // 懒加载部分
                    if (file === null || file === void 0 ? void 0 : file.includes('.thumb.')) {
                        img.setAttribute('file', file.split('.thumb.')[0]); // 网站自带forum_viewthread.js  attachimgshow(pid, onlyinpost) 从file延迟加载
                        console.log('加载原图成功 none.gif:', img.getAttribute('file'));
                        count++;
                    }
                }
            }
            if (count) {
                new _1.MessageBox(`加载原图成功 ${count} 张！`);
            }
        }
    });
}
exports.loadOriginImage = loadOriginImage;


/***/ }),

/***/ 363:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoPay = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// 自动支付
function autoPay(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (document.querySelector('.viewpay')) {
            const url = user.payUrl;
            const referer = location.href;
            const pData = `formhash=${user.formhash}&referer=${(0, tools_1.turnUrl)(referer)}&tid=${(0, tools_1.getTid)(referer)}&handlekey=pay`;
            const stringOrHtml = yield (0, _1.postDataCdata)(url, pData);
            if ((0, tools_1.checkHtml)(stringOrHtml)) {
                // 确认html
                const info = (_a = stringOrHtml.querySelector('script')) === null || _a === void 0 ? void 0 : _a.innerHTML.split(`', `)[1].slice(1);
                new _1.MessageBox(info);
                location.reload();
            }
            else {
                new _1.MessageBox(stringOrHtml); //其它情况直接输出
            }
        }
    });
}
exports.autoPay = autoPay;


/***/ }),

/***/ 687:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addPlayEvent = exports.autoPlay = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
const addPlayEvent = (counter, user) => {
    const zoomimgs = document.querySelectorAll(`img[zoomfile]`); //获取图片列表
    if (zoomimgs) {
        // 自动播放
        for (let i = 0; i < zoomimgs.length; i++) {
            //遍历图片列表
            zoomimgs[i].addEventListener('click', () => {
                autoPlay(counter, user);
            }, {
                once: true,
            });
        }
    }
    const onclickzoomimgs = document.querySelectorAll(`img[onclick="zoom(this, this.src, 0, 0, 0)"]`); //获取图片列表
    if (onclickzoomimgs) {
        // 自动播放
        for (let i = 0; i < onclickzoomimgs.length; i++) {
            //遍历图片列表
            onclickzoomimgs[i].addEventListener('click', () => {
                autoPlay(counter, user);
            }, {
                once: true,
            });
        }
    }
};
exports.addPlayEvent = addPlayEvent;
// 自动播放图片
function autoPlay(counter, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const append_parent = document.querySelector('#append_parent'); // 监听子节点
        if (counter.playBtn || !append_parent) {
            // 防重复点击、添加
            return;
        }
        counter.playBtn = 1; // 已添加标志
        const observer = new MutationObserver(() => {
            // 监听元素子节点变化，然后添加节点
            const imgzoom_y = document.querySelector('#imgzoom .y');
            if (imgzoom_y) {
                // 按钮也是延迟加载，监听是否有 .y
                observer.disconnect(); // 断开监听
                addAutoPlay(counter, user); // 添加按钮
            }
        }); // 建立监听器
        observer.observe(append_parent, {
            // 开始监听 append_parent
            childList: true,
        });
    });
}
exports.autoPlay = autoPlay;
// 添加播放图片按钮、事件
function addAutoPlay(counter, user) {
    var _a;
    const append_parent = document.querySelector('#append_parent');
    if (!append_parent)
        return;
    const imgzoom = append_parent.querySelector('#imgzoom');
    const imgzoom_cover = append_parent.querySelector('#imgzoom_cover');
    if (!imgzoom)
        return;
    const y = imgzoom.querySelector('.y');
    const a = document.createElement('a');
    a.title = '自动播放/停止播放';
    a.innerHTML = '自动播放/停止播放';
    a.href = 'javascript:void(0);';
    a.addEventListener('click', play); // 添加监听播放事件
    a.style.cssText = `background: url(../../template/yibai_city1/style/common/arw_l.gif) rgb(241, 196, 15) center no-repeat;transform: rotate(180deg);width: 60px;height: 18px;overflow: hidden;`;
    if (!y)
        return;
    y.prepend(a); // 添加按钮
    // 遮挡暂停
    window.onblur = function () {
        counter.playFlag = 0;
    };
    // 点击背景层暂停
    imgzoom_cover === null || imgzoom_cover === void 0 ? void 0 : imgzoom_cover.addEventListener('click', () => {
        counter.playFlag = 0;
    });
    // 关闭按钮暂停
    (_a = y.querySelector('.imgclose')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        counter.playFlag = 0;
    });
    function play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!counter.playFlag && !counter.playObserver) {
                // 再次点击暂停，只运行一个监听器
                counter.playFlag = 1;
                const imgzoom_waiting = append_parent === null || append_parent === void 0 ? void 0 : append_parent.querySelector('#imgzoom_waiting');
                const zimg_next = imgzoom === null || imgzoom === void 0 ? void 0 : imgzoom.querySelector('.zimg_next'); // 是否有下一张
                if (!zimg_next || !imgzoom_waiting) {
                    counter.playFlag = 0;
                    new _1.MessageBox('只有一张图！');
                    return;
                }
                counter.playObserver = new MutationObserver(() => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const display = imgzoom_waiting.style.display;
                    if (display == 'none') {
                        yield (0, tools_1.waitFor)(user.autoPlayDiff); // 延迟，然后判断是否停止
                        if (counter.playFlag == 0 && counter.playObserver) {
                            counter.playObserver.disconnect();
                            counter.playObserver = undefined; // disconnect()并没有清空监听器
                            return;
                        }
                        (_a = imgzoom === null || imgzoom === void 0 ? void 0 : imgzoom.querySelector('.zimg_next')) === null || _a === void 0 ? void 0 : _a.click(); // 刷新NodeList
                    }
                }));
                counter.playObserver.observe(imgzoom_waiting, {
                    attributes: true,
                });
                // 开始点击下一张
                yield (0, tools_1.waitFor)(user.autoPlayDiff);
                zimg_next.click();
            }
            else {
                counter.playFlag = 0;
            }
        });
    }
}


/***/ }),

/***/ 872:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addOnePage = exports.addPageBatch = exports.replyOrThk = void 0;
const lib_1 = __webpack_require__(915);
const tools_1 = __webpack_require__(633);
function chooceReply(user, value) {
    if (value) {
        let replyLen = 0; // 统计长度，用于在 user.userReplyMessage 中定位下标
        value.split('；').forEach((element) => {
            // 中文分号分隔字符串
            if (element) {
                user.userReplyMessage.push(element); // 存储自定义回帖内容
                replyLen++;
            }
        });
        GM_setValue(user.username, user);
        new lib_1.MessageBox('已使用自定义回复');
        return replyLen;
    }
    else {
        if (user.fastReply.length && confirm('确认使用快速回复？否则使用历史回复')) {
            GM_setValue(user.username, user);
            new lib_1.MessageBox('已使用快速回复');
            return user.fastReply.length;
        }
        else if (user.userReplyMessage.length && confirm('确认使用历史自定义回复？')) {
            GM_setValue(user.username, user);
            new lib_1.MessageBox('已使用历史自定义回复');
            return user.userReplyMessage.length;
        }
        else {
            alert('没有获取到任何回复，请确认有浏览可快速回贴的版块的权限！否则需要手动输入回帖内容！');
            return -1;
        }
    }
}
function addOnePage(user, inputValue) {
    const currentHref = location.href; // 获取当前页地址
    const reg = /(type-)|(forum-)/;
    // const reg = /(forum-)/;
    if (!reg.test(currentHref)) {
        new lib_1.MessageBox('不支持的页面，仅支持在地址为 forum-x-x 和 type-x-x 的板块页面使用');
        return;
    }
    const fid = currentHref.split('-')[1]; // 获取板块fid
    const page = currentHref.split('-')[2].split('.')[0]; // 获取页码
    if (currentHref.includes('type-')) {
        addPageBatch(user, `${fid}-${page}-${page}`, inputValue, 'type');
        new lib_1.MessageBox('type-x-x 地址板块仅支持添加第一页');
    }
    else {
        addPageBatch(user, `${fid}-${page}-${page}`, inputValue);
    }
}
exports.addOnePage = addOnePage;
function addPageBatch(user, pageCode, inputValue, type = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const reg = new RegExp(/^\d+-\d+-\d+$/);
        let forumPage = '';
        if (reg.test(pageCode)) {
            // 如果输入了正确地址单页
            forumPage = pageCode;
        }
        else {
            new lib_1.MessageBox('未获取到页码');
            return;
        }
        if (reg.test(forumPage)) {
            // 如果输入了正确地址则进行批量处理
            user.page = forumPage;
            GM_setValue(user.username, user);
            let pageFrom = parseInt(forumPage.split('-')[1]); // 获取起点页码
            const pageEnd = parseInt(forumPage.split('-')[2]); // 获取终点页码
            const fid = forumPage.split('-')[0]; // 获取版块代码
            if (pageFrom > pageEnd) {
                new lib_1.MessageBox('页码错误：起点页不能大于终点页！');
                return;
            }
            const msId = new lib_1.MessageBox('正在添加：' + forumPage, 'none');
            const replyLen = chooceReply(user, inputValue); //如果输入了值则使用用户值，如果没有则使用默认值；没有默认值则返回错误
            if (replyLen <= 0) {
                new lib_1.MessageBox('获取回帖内容失败！');
                msId.remove();
                return '获取回帖内容失败！';
            }
            while (pageFrom <= pageEnd) {
                let currentHref = '';
                if (type != null) {
                    currentHref = 'https://www.jkforum.net/' + type + '-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
                }
                else {
                    currentHref = 'https://www.jkforum.net/forum-' + fid + '-' + pageFrom + '.html'; //生成帖子列表地址
                }
                new lib_1.MessageBox('当前地址：' + currentHref + '，页码：' + pageFrom);
                let data = yield (0, lib_1.getData)(currentHref);
                // 判断是否需要切换到列表模式。
                while (data.querySelector(`[class="chked"]`)) {
                    yield (0, lib_1.getData)('https://www.jkforum.net/forum.php?mod=forumdisplay&fid=' + fid + '&forumdefstyle=yes'); // 切换到列表模式，同步请求。
                    new lib_1.MessageBox('已切换到列表模式');
                    data = yield (0, lib_1.getData)(currentHref);
                }
                // 添加回帖任务
                setThreadsTask(user, data, fid, replyLen); // 设置任务列表
                pageFrom++;
            }
            msId.remove();
        }
        else {
            new lib_1.MessageBox('请输入回帖列表页码，格式：版块代码-起点页-终点页 ；例如：640-1-2 ；版块代码见版块URL中间数字：forum-640-1', 10000);
        }
    });
}
exports.addPageBatch = addPageBatch;
// 添加任务列表
function setThreadsTask(user, htmlData, fid, replyLen) {
    //帖子类名 40个a标签数组
    const hrefs = htmlData.querySelectorAll('.s');
    // 获取作者昵称和 UID
    const cites = htmlData.querySelectorAll('cite a');
    // 以 fid 创建对象，如果fid存在则写入fid的数组的fidthreads属性的数组内；否则创建新的 fidthreads，自我调用
    const fidthreads = {
        fid: fid,
        fidTime: 0,
        fidRepIndex: 0,
        fidThkIndex: 0,
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
        }
        else {
            user.replyThreads.push(fidthreads); // 初始化threads
            newFid();
        }
    }
    function addThrInfo(elem) {
        // 回帖变量随即范围限制
        let start = 0;
        if (replyLen == user.fastReply.length || replyLen == user.userReplyMessage.length) {
            // 判断起始位置
        }
        else {
            start = user.userReplyMessage.length - replyLen; // 用户数组长-增加的数据长=起始位置；
            replyLen = user.userReplyMessage.length; // 结束位置
        }
        const msId = new lib_1.MessageBox('...', 'none');
        let count = 0; // 贴数统计
        // 遍历去除回帖用户
        for (let i = 0; i < cites.length; i += 2) {
            // 加入数组
            const touser = cites[i].innerHTML;
            const touseruid = cites[i].href.split('uid=')[1]; // href="home.php?mod=space&uid=1123445"
            const href = hrefs[i / 2].href;
            const tid = (0, tools_1.getTid)(href);
            let noSkip = true; // 跳过标识
            for (let index = 0; index < elem.fidthreads.length; index++) {
                // 确保帖子的唯一性
                const element = elem.fidthreads[index];
                if (element.tid == tid) {
                    noSkip = false;
                    msId.refresh(`${fid}：任务列表：${index}，thread-${tid}-1-1 ：已在任务列表，已跳过此贴！`);
                    break;
                }
            }
            if (noSkip) {
                const replyIndex = (0, tools_1.rdNum)(start, replyLen - 1); // 从返回的输入长度获取随机值
                const randomTime = (0, tools_1.rdNum)(user.interval, user.differ + user.interval);
                const thread = {
                    tid: tid,
                    touseruid: touseruid,
                    touser: touser,
                    replyIndex: replyIndex,
                    replyLen: replyLen,
                    randomTime: randomTime, // 回帖时间随机数
                };
                fidTime += randomTime;
                elem.fidthreads.push(thread); // 给对象数组添加
                count++;
            }
        }
        GM_setValue(user.username, user);
        msId.remove();
        new lib_1.MessageBox(`${fid}：任务列表成功添加 ${count} 贴！`, 10000);
    }
    newFid(); // 启动
}
// 回帖\感谢函数
function replyOrThk(counter, user, type = "reply" /* REPLY */, setCounter) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let fidIndex = 0; // 当前回帖版块序号
        let thkFidIndex = 0; // 当前感谢版块序号
        // 初始化永久消息
        const mesIdRep = new lib_1.MessageBox();
        const mesIdRepContent = new lib_1.MessageBox();
        const mesIdThk = new lib_1.MessageBox();
        if (!user.replyThreads.length) {
            new lib_1.MessageBox('任务列表为空，请先添加任务！');
            return;
        }
        else if (type == "reply" /* REPLY */) {
            setCounter(Object.assign(Object.assign({}, counter), { replyBtn: 1 }));
            mesIdRep.show('开始回帖...', 'none');
            mesIdRepContent.show('...', 'none');
        }
        else {
            setCounter(Object.assign(Object.assign({}, counter), { thkBtn: 1 })); // 防止重复点击
            mesIdThk.show('开始感谢...', 'none');
        }
        while ((type == "reply" /* REPLY */ && fidIndex < user.replyThreads.length) ||
            (type == "thk" /* THANK */ && thkFidIndex < user.replyThreads.length)) {
            // 分别处理感谢和回帖
            const elementForum = user.replyThreads[type == "reply" /* REPLY */ ? fidIndex : thkFidIndex];
            const fid = elementForum.fid;
            let fidRepIndex = elementForum.fidRepIndex; // 上次回复位置
            let fidThkIndex = elementForum.fidThkIndex; // 上次感谢位置
            while ((elementForum.fidthreads.length > fidRepIndex && type == "reply" /* REPLY */) ||
                (elementForum.fidthreads.length > fidThkIndex && type == "thk" /* THANK */)) {
                // 分别处理感谢和回帖
                switch (type) {
                    case "reply" /* REPLY */: {
                        mesIdRep.refresh(fid +
                            '-版块，当前位置：' +
                            fidRepIndex +
                            ' ，总数：' +
                            elementForum.fidthreads.length +
                            '，预计总耗时：' +
                            (elementForum.fidTime / 1000 / 60).toFixed(1) +
                            ' 分钟时间'); // 显示永久消息
                        const elementThr = elementForum.fidthreads[fidRepIndex];
                        const tid = elementThr.tid;
                        const replyIndex = elementThr.replyIndex;
                        const replyLen = elementThr.replyLen;
                        const randomTime = elementThr.randomTime;
                        // 回帖链接
                        const replyUrlParamsData = (0, tools_1.urlSearchParams)({
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
                        const posttime = (date.getTime() / 1000).toFixed(0); // 生产时间戳
                        const replyParamsObj = {
                            message: '',
                            posttime: posttime,
                            formhash: user.formhash,
                            usesig: 1,
                            subject: '',
                        }; // 回帖数据对象
                        if (replyLen == user.fastReply.length) {
                            replyParamsObj.message = user.fastReply[replyIndex];
                        }
                        else if (replyLen <= user.userReplyMessage.length + 1) {
                            replyParamsObj.message = user.userReplyMessage[replyIndex];
                        }
                        else {
                            new lib_1.MessageBox('回帖数据错误，请重置回帖数据', 'none');
                            return;
                        }
                        const replyParamsData = (0, tools_1.urlSearchParams)(replyParamsObj);
                        // 发送数据
                        const data = yield (0, lib_1.postDataCdata)(user.replyUrl + replyUrlParamsData.toString(), replyParamsData.toString());
                        if ((0, tools_1.checkHtml)(data)) {
                            // 确认html
                            const info = (_a = data.querySelector('script')) === null || _a === void 0 ? void 0 : _a.innerHTML.split(`, `)[1];
                            if (!info) {
                                throw new Error("querySelector('script') 错误：" + info);
                            }
                            new lib_1.MessageBox(info.split('，')[0].slice(1) + '，' + info.split('，')[1] + '！'); // 返回html成功消息
                        }
                        else {
                            new lib_1.MessageBox(data, 'none'); //其它情况直接输出
                        }
                        mesIdRepContent.refresh('序号：' +
                            fidRepIndex +
                            '，随机号：' +
                            replyIndex +
                            '，用时：' +
                            randomTime +
                            '，帖子：' +
                            tid +
                            '，内容：' +
                            replyParamsData.get('message')); //测试使用
                        elementForum.fidRepIndex = ++fidRepIndex;
                        GM_setValue(user.username, user);
                        yield (0, tools_1.waitFor)(randomTime); // 等待指定时间
                        break;
                    }
                    case "thk" /* THANK */: {
                        const elementThr = elementForum.fidthreads[fidThkIndex];
                        const thkParamsData = (0, tools_1.urlSearchParams)({
                            formhash: user.formhash,
                            tid: elementThr.tid,
                            touser: elementThr.touser,
                            touseruid: elementThr.touseruid,
                            handlekey: 'k_thankauthor',
                            addsubmit: 'true',
                        });
                        const data = yield (0, lib_1.postDataCdata)(user.thkUrl, thkParamsData.toString()); //post感谢数据
                        if ((0, tools_1.checkHtml)(data)) {
                            const info = (_b = data.querySelector('.alert_info')) === null || _b === void 0 ? void 0 : _b.innerHTML.split('<')[0].trim(); //去除html，返回字符串
                            new lib_1.MessageBox(info, 1000);
                        }
                        else {
                            new lib_1.MessageBox(data, 1000); //其它情况直接输出
                        }
                        mesIdThk.refresh(fid +
                            '-版块，当前位置：' +
                            fidThkIndex +
                            ' ，总数：' +
                            elementForum.fidthreads.length +
                            '，帖子ID：' +
                            thkParamsData.get('tid')); // 刷新永久消息
                        elementForum.fidThkIndex = ++fidThkIndex;
                        GM_setValue(user.username, user);
                        yield (0, tools_1.waitFor)(user.thkDiffer); // 等待指定时间
                        break;
                    }
                    default:
                        console.log('参数不在范围');
                        break;
                }
            }
            if (type == "thk" /* THANK */) {
                thkFidIndex++; // 翻页
            }
            else if (type == "reply" /* REPLY */) {
                fidIndex++; // 翻页
            }
            GM_setValue(user.username, user);
        }
        if (type == "thk" /* THANK */) {
            mesIdThk.remove(); // 移除永久消息
            new lib_1.MessageBox('全部感谢完成！', 10000, 2 /* LOG_POP_GM */);
            setCounter(Object.assign(Object.assign({}, counter), { thkBtn: 0 }));
        }
        else if (type == "reply" /* REPLY */) {
            mesIdRep.remove(); // 移除永久消息
            mesIdRepContent.remove();
            new lib_1.MessageBox('全部回帖完成！', 10000, 2 /* LOG_POP_GM */);
            setCounter(Object.assign(Object.assign({}, counter), { replyBtn: 0 }));
        }
    });
}
exports.replyOrThk = replyOrThk;


/***/ }),

/***/ 821:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetReplyData = void 0;
const message_1 = __webpack_require__(244);
const resetReplyData = (user) => {
    user.replyThreads = [];
    user.fastReply = [];
    user.userReplyMessage = [];
    GM_setValue(user.username, user);
    new message_1.MessageBox('重置回帖数据成功');
};
exports.resetReplyData = resetReplyData;


/***/ }),

/***/ 943:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sign = exports.timeControl = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// 定时签到
function timeControl(counter, setCounter, user) {
    const signtime = user.signtime; // 设定签到时间
    // 初始化永久消息通知
    const msIdSig = new _1.MessageBox();
    const msIdTime = new _1.MessageBox();
    let timer = 0;
    function control() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new tools_1.NowTime(); // 获取当前时间，到秒
            if (now.seconds == signtime) {
                clearInterval(timer); // timer=1 未知原因
                setCounter(Object.assign(Object.assign({}, counter), { signBtn: 0 }));
                // 移除永久消息通知
                msIdSig.remove();
                msIdTime.refresh('执行中....');
                for (let i = 0; i < user.signNum; i++) {
                    //重试次数
                    sign(user);
                    msIdTime.refresh('执行第' + (i + 1) + '次');
                    yield (0, tools_1.waitFor)(user.interTime); //重试间隔
                }
                msIdTime.remove();
            }
            else {
                msIdTime.refresh('时间没有到：' + signtime + '，目前时间：' + now.seconds);
            }
        });
    }
    if (!counter.signBtn) {
        // 防重复点击
        msIdSig.show('定时签到中，请勿退出...', 'none');
        msIdTime.show('...', 'none'); // 占位消息，给刷新用
        timer = window.setInterval(control, 500);
        setCounter(Object.assign(Object.assign({}, counter), { signBtn: timer })); // 运行自动签到}
    }
}
exports.timeControl = timeControl;
function sign(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const signParamsData = (0, tools_1.urlSearchParams)({
            formhash: user.formhash,
            qdxq: user.mood,
            qdmode: 1,
            todaysay: user.todaysay,
            fastreply: 1,
        }).toString();
        const stringOrHtml = yield (0, _1.postDataCdata)(user.signUrl, signParamsData); // 直接post签到数据
        if ((0, tools_1.checkHtml)(stringOrHtml)) {
            // 确认html
            const info = (_a = stringOrHtml.querySelector('.c')) === null || _a === void 0 ? void 0 : _a.innerHTML.split('<')[0].trim(); // 解析html，返回字符串
            new _1.MessageBox(info);
        }
        else {
            new _1.MessageBox(stringOrHtml); //其它情况直接输出
        }
    });
}
exports.sign = sign;


/***/ }),

/***/ 226:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoThk = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// 自动感谢
function autoThk(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const forms = document.forms;
        if (!(forms === null || forms === void 0 ? void 0 : forms.thankform)) {
            return;
        }
        const thankform = forms.thankform;
        const thkParamsData = (0, tools_1.urlSearchParams)({
            formhash: user.formhash,
            tid: thankform.tid.value,
            touser: thankform.touser.value,
            touseruid: thankform.touseruid.value,
            handlekey: 'k_thankauthor',
            addsubmit: 'true',
        }).toString();
        const xmlData = yield (0, _1.postDataCdata)(user.thkUrl, thkParamsData); //post感谢数据
        if (xmlData && (0, tools_1.checkHtml)(xmlData)) {
            const info = (_a = xmlData.querySelector('.alert_info')) === null || _a === void 0 ? void 0 : _a.innerHTML.split('<')[0].trim(); //去除html，返回字符串
            new _1.MessageBox(info);
        }
        else {
            new _1.MessageBox(xmlData); //其它情况直接输出
        }
        if (document.querySelectorAll('#k_thankauthor').length == 2) {
            //感谢可见
            location.reload();
        }
    });
}
exports.autoThk = autoThk;


/***/ }),

/***/ 506:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.creatUser = exports.getFormhash = exports.getUserFromName = exports.getUserName = exports.User = void 0;
const commonType_1 = __webpack_require__(321);
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
class User {
    constructor(username, formhash) {
        this.version = GM_info.script.version;
        this.today = ''; // 签到日期
        this.signtime = '23:59:59'; // 定时签到时间
        this.signNum = 10; // 定时签到重试次数
        this.interTime = 200; // 定时签到重试间隔时间ms
        this.todaysay = '簽到'; // 签到输入内容
        this.mood = commonType_1.Mood.fendou; // 签到心情
        this.autoPlayDiff = 2000; // 自动播放图片间隔时间ms
        this.autoPaySw = true; // 自动支付开关
        this.autoThkSw = true; // 自动感谢开关
        this.autoRePicSw = true; // 自动加载原图开关
        this.differ = 10000; // 回帖随机间隔时间ms
        this.interval = 20000; // 回帖基础间隔时间ms
        this.thkDiffer = 1000; // 批量感谢间隔时间ms
        this.limit = 2; // 并发下载图片数量限制
        this.page = ''; // 批量回帖页码
        this.token = ''; // OCR token
        this.freeTime = 3300000; // 现在有空间隔
        this.freeTid = ''; // 自动现在有空 帖子ID，一个账号一个贴子
        this.freeData = [];
        this.votedMessage = '+1'; // 投票输入内容
        this.ocrUrl = 'https://jkf.iknow.fun/api/ocr/numbers';
        this.votedUrl = 'https://www.jkforum.net/plugin.php?';
        this.applyVotedUrl = 'https://www.jkforum.net/home.php?mod=task&do=apply&id=59';
        this.taskDoneUrl = 'https://www.jkforum.net/home.php?mod=task&do=draw&id=59';
        this.signUrl = 'https://www.jkforum.net/plugin/?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1';
        this.thkUrl = 'https://www.jkforum.net/plugin/?id=thankauthor:thank&inajax=1';
        this.payUrl = 'https://www.jkforum.net/forum.php?mod=misc&action=pay&paysubmit=yes&infloat=yes&inajax=1';
        this.fastReplyUrl = 'https://www.jkforum.net/thread-8364615-1-1.html';
        this.replyUrl = 'https://www.jkforum.net/forum.php?mod=post&action=reply&';
        this.greasyforkUrl = 'https://greasyfork.org/zh-CN/scripts/427246';
        this.userReplyMessage = []; // 用户保存的回复，历史回帖内容
        this.fastReply = []; // 保存的快速回复，快速回帖内容
        this.replyThreads = []; // 回帖任务数据
        this.username = username;
        this.formhash = formhash;
    }
}
exports.User = User;
const getUserName = () => {
    var _a;
    return (_a = document.querySelector('.avatar_info a')) === null || _a === void 0 ? void 0 : _a.innerHTML;
};
exports.getUserName = getUserName;
const getUserFromName = () => {
    const userName = getUserName();
    return userName ? GM_getValue(userName) : null;
};
exports.getUserFromName = getUserFromName;
const getFormhash = () => {
    var _a;
    return new URLSearchParams((_a = document.querySelector('.listmenu li a')) === null || _a === void 0 ? void 0 : _a.href).get('formhash');
};
exports.getFormhash = getFormhash;
const creatUser = (username, formhash) => __awaiter(void 0, void 0, void 0, function* () {
    let user = GM_getValue(username);
    const userMod = new User(username, formhash);
    if (!user) {
        // 空则写入，或版本变动写入
        user = userMod;
        user = yield (0, _1.setFastReply)(user); // 设置快速回复
        GM_setValue(username, user);
        new _1.MessageBox('添加用户成功！');
    }
    else if (user.version !== GM_info.script.version) {
        const compa = (0, tools_1.isSameObjKey)(userMod, user); // 比较key
        // 更新所有 Url 参数
        user = (0, tools_1.updateUserUrl)(user, userMod); // new对User赋值
        // key相同 只改变版本
        user.version = GM_info.script.version; // 记录新版本
        if (!compa) {
            // key不同
            user = (0, tools_1.mergeObjValue)(userMod, user); // new对User赋值
            new _1.MessageBox('数据更新成功！');
        }
        user = yield (0, _1.setFastReply)(user); // 设置快速回复
        GM_setValue(username, user);
        new _1.MessageBox('版本更新成功！请阅读使用说明。');
    }
    if (user.formhash !== formhash) {
        // formhash 变动存储
        user.formhash = formhash;
        GM_setValue(username, user);
    }
    return user;
});
exports.creatUser = creatUser;


/***/ }),

/***/ 608:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoVoted = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
function autoVoted(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, _1.getData)(user.applyVotedUrl); // 申请任务
        const msId = new _1.MessageBox('申请投票任务执行成功！正在投票请勿退出页面...', 'none');
        // 投票请求链接
        const votedUrlParams = (0, tools_1.urlSearchParams)({
            id: 'voted',
        }).toString();
        const htmlData = yield (0, _1.getData)(user.votedUrl + votedUrlParams);
        const vidUrl = (_a = htmlData.querySelector('.voted a')) === null || _a === void 0 ? void 0 : _a.href; // 找到链接
        const vid = vidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接
        const hrefHtmlData = yield (0, _1.getData)(vidUrl);
        const aidUrl = hrefHtmlData.querySelector('.hp_s_c a').href; // 找到链接
        const aid = aidUrl.split('&')[2].split('=')[1]; // 纯数字// 分解链接
        // 投票请求链接数据
        const votedParams = (0, tools_1.urlSearchParams)({
            id: 'voted',
            ac: 'dian',
            aid: aid,
            vid: vid,
            qr: '',
            inajax: 1,
        }).toString();
        // Post 数据
        const votedParamsData = (0, tools_1.urlSearchParams)({
            formhash: user.formhash,
            inajax: 1,
            handlekey: 'dian',
            sid: 0,
            message: user.votedMessage,
        }).toString();
        // 投票
        const votedMessage = yield (0, _1.postDataCdata)(user.votedUrl + votedParams, votedParamsData);
        if ((0, tools_1.checkHtml)(votedMessage)) {
            const votedDom = votedMessage;
            let info = '';
            const alertInfo = votedDom.querySelector('.alert_info');
            const script = votedDom.querySelector('script');
            if (alertInfo) {
                info = alertInfo.innerHTML; // 解析html，返回字符串，失败警告
                new _1.MessageBox(info);
            }
            else if (script) {
                info = script.innerHTML.split(`', `)[1].slice(1); // 解析html，获取字符串，成功消息
                new _1.MessageBox(info);
                yield (0, _1.getData)(user.taskDoneUrl); // 执行领奖励
                new _1.MessageBox('领取投票奖励成功！');
            }
        }
        else {
            new _1.MessageBox(votedMessage); //其它情况直接输出
        }
        msId.remove();
        GM_setValue(user.username, user); //保存当天日// today 初始化
    });
}
exports.autoVoted = autoVoted;


/***/ }),

/***/ 67:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setTimeoutWorker = exports.setIntervalWorker = void 0;
function setIntervalWorker(callback, interval) {
    const workerBlob = new Blob([`setInterval(() => { postMessage('') }, ${interval})`]);
    const workerURL = URL.createObjectURL(workerBlob);
    const worker = new Worker(workerURL);
    worker.onmessage = () => {
        callback();
    };
    return worker;
}
exports.setIntervalWorker = setIntervalWorker;
function setTimeoutWorker(callback, timeout) {
    const workerBlob = new Blob([`setTimeout(() => { postMessage('') }, ${timeout})`]);
    const workerURL = URL.createObjectURL(workerBlob);
    const worker = new Worker(workerURL);
    worker.onmessage = () => {
        callback();
        worker.terminate();
    };
    return worker;
}
exports.setTimeoutWorker = setTimeoutWorker;


/***/ }),

/***/ 287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
/*
    NodeJS Promise并发控制
    https://xin-tan.com/2020-09-13-bing-fa-kong-zhi/
  */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcurrencyPromisePool = void 0;
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
            .then((res) => {
            this.results.push(res);
            --this.runningNum;
            // 运行结束条件：队列长度 && 正在运行的数量
            if (this.queue.length === 0 && this.runningNum === 0) {
                // promise返回结果, 然后递归结束;
                return resolve(this.results);
            }
            // 队列还有则，出队，然后递归调用
            if (this.queue.length) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this._run(this.queue.shift(), resolve, reject);
            }
        })
            .catch(reject);
    }
}
exports.ConcurrencyPromisePool = ConcurrencyPromisePool;


/***/ }),

/***/ 19:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tailwindStyles = __webpack_require__(600);
// 导出的是 GM_addStyle 的值
// delete css conflicts
exports["default"] = GM_addStyle(tailwindStyles
    .replace(/\nimg,\nvideo {\n {2}max-width: 100%;\n {2}height: auto;\n}\n/, '')
    .replace(/\*,\n::before,\n::after \{\n {2}box-sizing: border-box;\n {2}\/\* 1 \*\/\n {2}border-width: 0;\n {2}\/\* 2 \*\/\n {2}border-style: solid;\n {2}\/\* 2 \*\/\n {2}border-color: #e5e7eb;\n {2}\/\* 2 \*\/\n}/, '')
    .replace(/-webkit-appearance: button;\n {2}\/\* 1 \*\/\n {2}background-color: transparent;\n {2}\/\* 2 \*\/\n {2}background-image: none;\n {2}\/\* 2 \*\//, '')
    .replace(/display: block;\n {2}\/\* 1 \*\//, '')
    .replace(/padding-top: 0.5rem;\n {2}padding-right: 0.75rem;\n {2}padding-bottom: 0.5rem;\n {2}padding-left: 0.75rem;/, '')
    .replace(/font-size: inherit;\n {2}font-weight: inherit;/, ''));


/***/ }),

/***/ 633:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateUserUrl = exports.getTid = exports.getVersionNum = exports.getUuiD = exports.mergeObjValue = exports.isSameObjKey = exports.NowTime = exports.rdNum = exports.waitFor = exports.replaceHtml = exports.checkHtml = exports.turnUrl = exports.urlSearchParams = exports.turnCdata = void 0;
const lib_1 = __webpack_require__(915);
// POST返回 xml数据类型转换成 字符串或html 模块
function turnCdata(xmlRepo) {
    var _a;
    const data = (_a = xmlRepo.querySelector('root')) === null || _a === void 0 ? void 0 : _a.textContent;
    if (!data)
        return '';
    // 如果判断去掉html是否还有文字，否则返回html
    if (replaceHtml(data)) {
        return replaceHtml(data); // 去掉html内容，返回文字
    }
    else {
        const domParser = new DOMParser();
        const htmlData = domParser.parseFromString(data, 'text/html');
        return htmlData;
    }
}
exports.turnCdata = turnCdata;
// URL 参数添加器
function urlSearchParams(object) {
    const searchParamsData = new URLSearchParams();
    for (const key in object) {
        searchParamsData.append(key, String(object[key]));
    }
    return searchParamsData;
}
exports.urlSearchParams = urlSearchParams;
// 编码统一资源定位符模块
function turnUrl(data, type) {
    if (type) {
        return decodeURI(data);
    }
    else {
        return encodeURI(data);
    }
}
exports.turnUrl = turnUrl;
// 判断html和字符串是不是html
function checkHtml(htmlStr) {
    if (htmlStr instanceof Document) {
        return true;
    }
    else {
        const reg = /<[^>]+>/g;
        return reg.test(htmlStr);
    }
}
exports.checkHtml = checkHtml;
// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt) {
    const reg3 = /[\r|\n|\b|\f|\t|\v]+/g; //去掉特殊符号
    const reg = /<.+>/g; //去掉所有<>内内容
    // 先reg3,\n特殊符号会影响reg的匹配
    return txt.replace(reg3, '').replace(reg, '').trim();
}
exports.replaceHtml = replaceHtml;
// promise 等待模块
const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
exports.waitFor = waitFor;
// n, m 范围随机整数生成
function rdNum(n, m) {
    const c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}
exports.rdNum = rdNum;
class NowTime {
    constructor() {
        const date = new Date();
        this.day = date.toLocaleDateString();
        this.seconds = date.toTimeString().split(' ')[0];
        this.date = date;
    }
}
exports.NowTime = NowTime;
// 比较键
function isSameObjKey(source, target) {
    if (Object.keys(target).length === Object.keys(source).length) {
        // 用户数据匹配
        for (const key of Object.keys(source)) {
            // https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isSameObjKey = isSameObjKey;
// 赋值对象的值
function mergeObjValue(target, source) {
    Object.keys(source).forEach((key) => {
        if (source[key] && Object.prototype.hasOwnProperty.call(target, key)) {
            target[key] = source[key];
        }
    });
    return target;
}
exports.mergeObjValue = mergeObjValue;
// 更新User对象的URL值，自动有空间隔时间
function updateUserUrl(target, source) {
    Object.keys(source).forEach((key) => {
        if (key.includes('Url') || key === 'freeTime') {
            target[key] = source[key];
        }
    });
    return target;
}
exports.updateUserUrl = updateUserUrl;
/**
 * 生成不重复的ID
 * @param { Number } randomLength
 */
function getUuiD(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}
exports.getUuiD = getUuiD;
const getVersionNum = (ver) => {
    return Number(ver.replace(/\./g, ''));
};
exports.getVersionNum = getVersionNum;
const getTid = (url) => {
    let tid = url.split('-')[1];
    if (!tid) {
        tid = new URLSearchParams(url).get('tid'); // 用于获取分类贴链接下的 tid
        if (!tid) {
            new lib_1.MessageBox('没有找到Tid: ' + url);
            throw new Error('没有找到Tid: ' + url);
        }
    }
    return tid;
};
exports.getTid = getTid;


/***/ }),

/***/ 699:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoClickManage = exports.Status = void 0;
const components_1 = __webpack_require__(740);
const Modal_1 = __webpack_require__(653);
const Table_1 = __importDefault(__webpack_require__(420));
const lib_1 = __webpack_require__(915);
const react_1 = __importStar(__webpack_require__(995));
var Status;
(function (Status) {
    Status["online"] = "online";
    Status["offline"] = "offline";
})(Status = exports.Status || (exports.Status = {}));
const AutoClickManage = ({ onClose, user }) => {
    const [data, setData] = (0, react_1.useState)(user.freeData ? [...user.freeData] : []);
    const [token, setToken] = (0, react_1.useState)(user.token);
    const [threadUrl, setThreadUrl] = (0, react_1.useState)('');
    const [skipPageReset, setSkipPageReset] = (0, react_1.useState)(false);
    const [running, setRunning] = (0, react_1.useState)(false);
    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData((old) => old.map((row, index) => {
            if (index === rowIndex) {
                return Object.assign(Object.assign({}, old[rowIndex]), { [columnId]: value });
            }
            return row;
        }));
    };
    const deleteData = (rowId) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData((old) => {
            old.splice(rowId, 1);
            return [...old];
        });
    };
    const addThread = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (!threadUrl) {
            return alert('请输入帖子链接');
        }
        if (data.some((t) => t.url.includes(threadUrl))) {
            return alert('帖子已存在！');
        }
        if (!threadUrl.includes('https://www.jkforum.net/thread-')) {
            return alert(`帖子地址错误：${threadUrl}`);
        }
        const docu = yield (0, lib_1.getData)(threadUrl);
        const topthreadStatus = docu.querySelector('#topthread_status');
        if (!topthreadStatus) {
            return alert('未找到帖子的自动有空元素，请检查帖子');
        }
        const titleCont = docu.querySelector('.title-cont');
        if (!titleCont) {
            return alert('未找到帖子标题');
        }
        const title = ((_b = (_a = titleCont.querySelector('.z')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '') + ((_d = (_c = titleCont.querySelector('h1')) === null || _c === void 0 ? void 0 : _c.textContent) !== null && _d !== void 0 ? _d : '');
        if (!title) {
            return alert('未找到帖子标题');
        }
        setData([
            ...data,
            {
                status: Status.offline,
                title,
                url: threadUrl,
                cycle: '55',
                times: 0,
                delete: '',
            },
        ]);
    });
    const saveData = (0, react_1.useCallback)(() => {
        user.freeData = data;
        if (token && token.length === 36) {
            user.token !== token ? (user.token = token) : null;
        }
        else {
            new lib_1.MessageBox('没有输入令牌 or 令牌无效', 1000);
        }
        GM_setValue(user.username, user);
        new lib_1.MessageBox('保存成功', 500);
    }, [data, token, user]);
    const saveTimesData = (t) => {
        setData((old) => old.map((row) => {
            if (row.url === t.url) {
                return Object.assign(Object.assign({}, row), { times: row.times + 1 });
            }
            return row;
        }));
    };
    const saveStatusData = (t) => {
        setData((old) => old.map((row) => {
            if (row.url === t.url) {
                return Object.assign(Object.assign({}, row), { status: Status.offline });
            }
            return row;
        }));
    };
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!token) {
            return alert('请输入令牌');
        }
        const onThreads = data.filter((t) => t.status === 'online');
        if (!onThreads.length) {
            return alert('请将需要执行的帖子运行状态设为 online');
        }
        onThreads.map((t) => (0, lib_1.autofillCaptcha)(t, user, saveTimesData, saveStatusData));
        setRunning(true);
    });
    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    (0, react_1.useEffect)(() => {
        setSkipPageReset(false);
        saveData();
        if (running && data.every((t) => t.status === 'offline')) {
            setRunning(false);
        }
    }, [data, running, saveData]);
    return (react_1.default.createElement(Modal_1.Modal, { width: "w-[800px]", height: "max-h-[95%]", header: react_1.default.createElement(react_1.default.Fragment, null, "\u81EA\u52A8\u70B9\u51FB\u73B0\u5728\u6709\u7A7A\u7BA1\u7406\u9875\u9762"), footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(components_1.Button, { text: '开始执行', onClick: start, disabled: running }),
            react_1.default.createElement(components_1.Button, { title: "\u505C\u6B62\u73B0\u5728\u6709\u7A7A\u8BF7\u5237\u65B0\u9875\u9762", text: '关闭页面', onClick: onClose })), onClose: onClose },
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "text-red-500" },
                "\u76EE\u524D\u672C\u9875\u9762\u4EC5\u652F\u6301\u7BA1\u7406\u4E00\u4E2A\u8D26\u53F7\u7684\u591A\u4E2A\u5E16\u5B50\uFF0C\u591A\u4E2A\u8D26\u53F7\u8BF7",
                react_1.default.createElement("a", { className: "text-blue-500 border-b", target: "_blank", href: "https://roro4ever.github.io/2019/11/28/%E5%88%A9%E7%94%A8Chrome%E5%90%8C%E6%97%B6%E7%99%BB%E5%BD%95%E7%BD%91%E7%AB%99%E7%9A%84%E5%A4%9A%E4%B8%AA%E8%B4%A6%E5%8F%B7/%E5%88%A9%E7%94%A8chrome%E5%90%8C%E6%97%B6%E7%99%BB%E5%BD%95%E7%BD%91%E7%AB%99%E7%9A%84%E5%A4%9A%E4%B8%AA%E8%B4%A6%E5%8F%B7/", rel: "noreferrer" }, "\u591A\u5F00\u6D4F\u89C8\u5668"),
                "\u3002"),
            react_1.default.createElement("div", { className: "flex items-end" },
                react_1.default.createElement("div", { className: "w-64 pr-4" },
                    react_1.default.createElement(components_1.Input, { autoComplete: "off", label: "\u8F93\u5165\u4EE4\u724C\uFF1A", type: "password", onChange: setToken, placeholder: "\u8BF7\u8F93\u5165\u4EE4\u724C", value: token })),
                react_1.default.createElement("span", null, "\u8FD8\u6CA1\u6709\u4EE4\u724C\uFF1F"),
                react_1.default.createElement(components_1.Button, { title: "https://jkf.iknow.fun", text: '获取令牌', onClick: () => window.open('https://jkf.iknow.fun') })),
            react_1.default.createElement("div", { className: "flex items-end" },
                react_1.default.createElement("div", { className: "w-64" },
                    react_1.default.createElement(components_1.Input, { label: "\u5E16\u5B50\u94FE\u63A5\uFF1A", onChange: setThreadUrl, placeholder: "\u8BF7\u8F93\u5165\u5E16\u5B50\u94FE\u63A5", value: threadUrl })),
                react_1.default.createElement("div", { className: "ml-4" },
                    react_1.default.createElement(components_1.Button, { text: '添加', onClick: addThread }))),
            react_1.default.createElement("div", { className: "overflow-auto" }, data.length ? (react_1.default.createElement(Table_1.default, { searchBar: false, title: '帖子管理', data: data, skipPageReset: skipPageReset, updateMyData: updateMyData, deleteData: deleteData })) : ('')))));
};
exports.AutoClickManage = AutoClickManage;


/***/ }),

/***/ 818:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Home = void 0;
const components_1 = __webpack_require__(740);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const lib_1 = __webpack_require__(915);
const react_1 = __importStar(__webpack_require__(995));
const AutoClickManage_1 = __webpack_require__(699);
const Home = ({ user, setShowHome, counter, setCounter }) => {
    const mask = (0, react_1.useRef)(null);
    const [replyValue, setReplyValue] = (0, react_1.useState)('');
    const [pageValue, setPageValue] = (0, react_1.useState)('');
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", { ref: mask, className: "fixed top-0 w-screen h-screen flex flex-col justify-center", onClick: (e) => {
            if (mask.current && mask.current === e.target) {
                setShowHome();
            }
        } },
        react_1.default.createElement("div", { className: "h-fit w-72 p-2 m-2 bg-gray-50 shadow-md rounded-md flex flex-col border" },
            react_1.default.createElement("h3", { className: "text-sm text-center font-bold border-b" }, "JKForum Helper"),
            react_1.default.createElement(components_1.Panel, { title: "\u901A\u7528\u8BBE\u7F6E" },
                react_1.default.createElement(components_1.Toggle, { label: '自动感谢', onClick: () => {
                        (0, lib_1.swThk)(user);
                    }, checked: user.autoThkSw }),
                react_1.default.createElement(components_1.Toggle, { label: '自动购买', onClick: () => {
                        (0, lib_1.swPay)(user);
                    }, checked: user.autoPaySw }),
                react_1.default.createElement(components_1.Toggle, { label: '加载原图', onClick: () => {
                        (0, lib_1.swRePic)(user);
                    }, checked: user.autoRePicSw })),
            react_1.default.createElement(components_1.Panel, { title: "\u6279\u5904\u7406" },
                react_1.default.createElement(components_1.TextArea, { label: '输入回复:', placeholder: '中文分号 ；分隔每条回帖内容，可输入论坛的富文本格式', onChange: setReplyValue, value: replyValue, rows: 2 }),
                react_1.default.createElement(components_1.Input, { label: '输入页码:', placeholder: '板块号-起始页-终止页', onChange: setPageValue, value: pageValue }),
                react_1.default.createElement(components_1.Button, { text: '添加当前页', onClick: () => {
                        (0, lib_1.addOnePage)(user, replyValue);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '添加页码页', onClick: () => {
                        (0, lib_1.addPageBatch)(user, pageValue, replyValue);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '获取快速回复', onClick: () => {
                        (0, lib_1.setFastReply)(user);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '重置回帖数据', onClick: () => {
                        (0, lib_1.resetReplyData)(user);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '一键回帖', disabled: !!counter.replyBtn, onClick: () => {
                        (0, lib_1.replyOrThk)(counter, user, "reply" /* REPLY */, setCounter);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '一键感谢', disabled: !!counter.thkBtn, onClick: () => {
                        (0, lib_1.replyOrThk)(counter, user, "thk" /* THANK */, setCounter);
                    } })),
            react_1.default.createElement(components_1.Panel, { title: "\u9AD8\u7EA7\u529F\u80FD" },
                react_1.default.createElement(components_1.Button, { text: '定时签到', disabled: !!counter.signBtn, onClick: () => {
                        (0, lib_1.timeControl)(counter, setCounter, user);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '下载图片', disabled: !!counter.downloadBtn, onClick: () => {
                        (0, lib_1.downloadImgs)(user, counter, setCounter);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '屏蔽图片', onClick: () => {
                        (0, lib_1.noDisplayPic)();
                    } }),
                react_1.default.createElement(components_1.Button, { text: '现在有空', onClick: () => {
                        setShowModal(true);
                        // autofillCaptcha(user);
                    } }),
                react_1.default.createElement(components_1.Button, { text: '检查更新', onClick: () => {
                        (0, lib_1.update)(user);
                    } })),
            react_1.default.createElement("br", null),
            react_1.default.createElement(components_1.Button, { text: 'close', onClick: setShowHome }),
            showModal ? react_1.default.createElement(AutoClickManage_1.AutoClickManage, { user: user, onClose: () => setShowModal(false) }) : '')));
};
exports.Home = Home;


/***/ }),

/***/ 995:
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ 533:
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

/***/ }),

/***/ 282:
/***/ ((module) => {

"use strict";
module.exports = ReactTable;

/***/ }),

/***/ 581:
/***/ ((module) => {

"use strict";
module.exports = saveAs;

/***/ }),

/***/ 419:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"JKForum 助手","name:en":"JKForum Helper","name:zh-TW":"JKForum 助手","name:ja":"JKForum 助手","name:ko":"JKForum 조수","namespace":"https://github.com/Eished/jkforum_helper","version":"0.8.0","description":"JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片，自动识别验证码，自动现在有空，登录时跳过手机验证码","description:en":"JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image，Skip mobile verification code when logging in","description:zh-TW":"JKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片，自動識別驗證碼，自動現在有空，登錄時跳過手機驗證碼","description:ja":"JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード，ログイン時にモバイル認証コードをスキップ","description:ko":"JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오，로그인 시 모바일 인증 코드 건너뛰기","author":"Eished","copyright":"Eished","license":"MIT","match":["*://*.jkforum.net/home*","*://*.jkforum.net/forum*","*://*.jkforum.net/type*","*://*.jkforum.net/thread*","*://*.jkforum.net/plugin*","*://*.jkforum.net/member*"],"exclude":[],"run-at":"document-idle","supportURL":"https://github.com/Eished/jkforum_helper/issues","homepage":"https://github.com/Eished/jkforum_helper","grant":["GM_getValue","GM_setValue","GM_deleteValue","GM_info","GM_xmlhttpRequest","GM_openInTab","GM_registerMenuCommand","GM_addElement","GM_addStyle","GM_notification"],"connect":["mymypic.net","jkf.iknow.fun","cdn.jsdelivr.net","github.com","greasyfork.org","jkf.hare200.com"],"require":["https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js","https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js","https://cdn.jsdelivr.net/npm/react-table@7.8.0/dist/react-table.production.min.js","https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"],"icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzYwNmI3NGQtODA4Zi03YjQ3LWI4NGYtYjNlZmJiMTM4NDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3MzFDMzYyRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MzFDMzYxRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MWY1NjgyLTk5OTctNDU0OS04NjIzLWZhNzY0MmVjMTM5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjNjA2Yjc0ZC04MDhmLTdiNDctYjg0Zi1iM2VmYmIxMzg0MjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5urL1nAAAJJUlEQVR42uxba2wU1xX+ZnZ2vYvX4BpDCYVA6xgKkR0wlYlJnyK1iiweVlqgGFpKK6qWAuYtQgitoYANGCTqRnJIQbQ/sJoAKsESMkrTitSQpuJhUBwVHCC21QeCgh17vevd6Tkzs+uZfXgftsevHOvT7twd35lz7rnnfufcGUGWZQxnETHMZdgbQLpy5UpfX0MgjCAkExwabBpEDT4NbkIHoZ3QRviUv/Msbff0/o1ZLBbl5npL0gkZhCkavkj4gtaeqhnArilu6aYfr2YEF6GV8EgS8J/ffh9NaSlo8PlQLwr4iNBAaBUT1YCMKtkdPTJAGuF5wrcIeYQvE0b3hQs5k4CmUmAkm9Kj3Dz/NRJuEP5CWrxDfnSVPn2KRnJsBoDNCSneKUPIJywjvEj4vBnzVCClPqXJMZL9olObVgIm0udEUqTAR8p4fbjmlfGmRcApyYI7QjRDyGo3sQZBGgP8hPAB4TyhyCzlu1VAU5CngVXCDLuEPaT4NZcHx9weTAtEoB6uAvMItYTXCc8N2HCuGYNG3+mw4ceiiL9T4PxVp5fijpCYAThYHSZUE2YOmnVN8wwyRLLDildpavyZvGFqJCOI3QS4twnFg3aB1zwiyYrnaVq82+6mQC3EZoCRhD8Rvj0kmI6sxIdxkoi3yRNmBBtBDENaThBeGFJ0TzUCe/UfPZ30KUQ2wFpC4ZDkvGQEmxXPUEwoV/I/IdQAvK7uHurc3ybhh+QFXwvnAVu1+T90hUaelkf+eEX2dTE7aKRmxaBRxBqd4EQUotJWES92+pBlFVDnN8ACwqiouTOZTxC6ruyjzCRSQYUzLb10d264/+HrWK1WtLe3h5xXd5dSRXcC2R+N/nMTlIAokgG+S65Q5//tnI5cRsThw4fl+vr6APLz8yOeW1VVZTh36tSp3fa9evVqw/l37tyRCwsLld9S7JCby8h+vyNUQn52fPR7DQciRmo/b0DuqMAV7xspgqRlcF+JxYKTJ08GKRI4Tk1NjXjulClTDOc6HI6I52ZnZ+PIkSOGc86cOYNz586FH8kE3d8iGr5PpxXhaW7KjjWxcbuNfuf1eiOe29HRETIFwondbseJEycMyt+6dQsrV65EZ2dnxOwwEWmlW5K7Eignfc1mD5jRg5DSY9m/fz9mzuxKNVpbW1FUVIQnT57E3EdBFiGHlIsSF6wUYlJHqLUnQV0VstgA0/pL+fnz52P9+vWGtjVr1uD69etx9fP1TOBnC7QCWjRxacU3dcgzJa10ZbqMHz8elZWVhraKigqcPHky7r5cHq2C2B73v07kGDCuPwzAyo8b13Xp2tpabNq0ydR7oFiSzgb4nNnKb9iwAQUFBYHjBw8eYPny5SGBs88NQMyXDZBsjrXVSTdr1izs27fP8NuqVavQ0NBgvhsKcLAB7GZcy+PxKMzu+PHjSEpKCrTv3r074nrf56mBDLuoywf6VHh527FjB7KysgJtZ8+exa5du/otpSAyZJFgwvZYW1sb5s2bh23bthnajx07ht7YnLVJmh97oydC8BmrP5IZJEiSJOzdu1dhfXopKSlBTU1NCMOMV07WAu9/Av+eQUR5heJuzjNQN+A0C5hiAJvNhrS0tJD2nJwcrF27FocOHepR/x/+S0U0+dELdE1LV21AgMm7w1evXg2ZBjt37sSkSZNMub4YZrdI0pr63AtaWlqUBOfGjRtYuHAh5syZo7SPGjUKpaWlWLp0acJ9pzsJKYi6JzjSrjtHUL9KZo3+unXrFOVZNm/ejEuXLikFFpYlS5Yoy+OFCxcS6vsX36T5/T2NDndb0IG676xvM8bFvhOmuvrvnALrpby8PCRIxuzapAWvZ9EQnEbzAiRGj53GYBZrPSBY9OTHP/cfPnwYOJ4+fTo2btyYKKHpesSiOwRNEZ8PPlG3KESVsWPHGo4fP36csEc0Nzdjz549hrbt27cjIyPDPCZIE0KMPnMQCFZc5vILV2saGxt7dAOc/t68eTNw7HQ6cfDgQTOzQRcbIKbSS2FhIdLT0wPH9+7dU9ATYQLEAVEvixYtUgolJuUCrWyA/3Y3V1nmzp2LsrIyQ9v58+d7zOBYOPKfPn3a0MbEKDnZlCT1IRvA4MdMWfnJsaqqKpw6dQqXL1/GxYsXMWbMmMA5XKs/evRor90FkyPOF/ySmZmJrVu3muEBzWyAfwbT09zcXCxevFhZn2fPnh3yj8XFxbh9+3av3Qj3FUyHt2zZYiir95E0sAHq9MvctGmRa6T379/HihUrQmp54STYhYN3ioLlwIEDhpjCZXLOFm22JPj6gqmo/PdDZoJcguVyooNTU87Z8/LyMGHCBCUeuFwu3L17V2Fu1dXVePToUUz98wjqgyb3EY0qM0XW1wvYaDa6B5+rl0tlgsIBmMTU+VPif0DdIBmQkkIE8aMS4Kl0lbZlvEy++6Dr95e/A/x6OWIri2sGoFX8Y8GW8qykMcF3B7IBgqVkAS1drV3HeV+Kh85pLNaH92wi2v3JEK9D6wa85to2Z9E3ghJ5j4Z4qDPpzLmBv5v3CDcHiwcouzttOnjim/+dXjRJImqgsyNPg3IMB5EVD3iN4msrZKMj/YGLNkNaeRp9jxeNlD5X6OsB+pn083jS48GmPPMJCn4bJAv+F3jOOOi0y7yED1XXd3fiN0lWvKmvC4Qrih4hlA01/V0evGWVUCxEeVI0kJ8QXh0Kbs+D3e7G78ntl1lEYn9ybAZg4YcmXyI0DVblabnroJHfRm7/AzKAO1zVONq+ABOkXEJlnKtt/wY7WXH5Ggp4X3VYUaZUgyOUzGPZGGkm/FQzxHHC44GotEJvucjnwTu01C20WZBPI/9BgEFGkHj2Ba4RVhF+yZUrqA9Vs1FG9JfCrJjyvpAX9aR8NTVXWS14PzDicuxdJSqTob4xxg8f50B9bS69t/V10DA1lwKp6ltjrsAbY8DfCH8lP75Omrjj0oaNY7VDGD26V990486ehvrgFYOfQH9KMwo/iut/edKmeZ+oux2vFmfcGsNvIfDGwb9tEhqX5eITZxI+5ioO6dlEo+zWvzOYyC57ksMJgZ/PMVEsOuX9O9P+LUufxkL9RjCo1OJS3T3W1wJjEZFIgfDZ2+PDXP4vwABKHSZ0zSd04wAAAABJRU5ErkJggg=="}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(629);
/******/ 	
/******/ })()
;