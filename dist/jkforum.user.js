// ==UserScript==
// @name                JKForum 助手
// @name:en             JKForum Helper
// @name:zh-TW          JKForum 助手
// @name:ja             JKForum 助手
// @name:ko             JKForum 조수
// @namespace           https://github.com/Eished/jkforum_helper
// @version             0.8.9
// @description         JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片，自动识别验证码，自动现在有空，自动点击置顶广告，登录时跳过绑定手机号验证码
// @description:en      JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image，Skip mobile verification code when logging in
// @description:zh-TW   JKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片，自動識別驗證碼，自動現在有空，自動點擊置頂廣告，登錄時跳過綁定手機號驗證碼
// @description:ja      JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード，ログイン時にモバイル認証コードをスキップ
// @description:ko      JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오，로그인 시 모바일 인증 코드 건너뛰기
// @author              Eished
// @copyright           Eished
// @license             MIT
// @match               *://*.jkforum.net/*
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
// @grant               GM_addValueChangeListener
// @connect             mymypic.net
// @connect             jkf.iknow.fun
// @connect             cdn.jsdelivr.net
// @connect             github.com
// @connect             greasyfork.org
// @connect             jkf.hare200.com
// @require             https://cdn.jsdelivr.net/npm/react@18.1.0/umd/react.production.min.js
// @require             https://cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.production.min.js
// @require             https://cdn.jsdelivr.net/npm/react-table@7.8.0/dist/react-table.production.min.js
// @require             https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require             https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js
// @require             https://cdn.jsdelivr.net/npm/react-copy-to-clipboard@5.1.0/build/react-copy-to-clipboard.min.js
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
___CSS_LOADER_EXPORT___.push([module.id, "/*\n! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  /* 1 */\n  border-width: 0;\n  /* 2 */\n  border-style: solid;\n  /* 2 */\n  border-color: #e5e7eb;\n  /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n*/\n\nhtml {\n  line-height: 1.5;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4;\n  /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  /* 4 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0;\n  /* 1 */\n  line-height: inherit;\n  /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  border-top-width: 1px;\n  /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0;\n  /* 1 */\n  border-color: inherit;\n  /* 2 */\n  border-collapse: collapse;\n  /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: inherit;\n  /* 1 */\n  color: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  padding: 0;\n  /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button;\n  /* 1 */\n  background-color: transparent;\n  /* 2 */\n  background-image: none;\n  /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  /* 1 */\n  vertical-align: middle;\n  /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\nEnsure the default browser behavior of the `hidden` attribute.\n*/\n\n[hidden] {\n  display: none;\n}\n\n[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n  border-radius: 0px;\n  padding-top: 0.5rem;\n  padding-right: 0.75rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='text']:focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  border-color: #2563eb;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\ninput::placeholder,textarea::placeholder {\n  color: #6b7280;\n  opacity: 1;\n}\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-date-and-time-value {\n  min-height: 1.5em;\n}\n\n::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\nselect {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.5rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  print-color-adjust: exact;\n}\n\n[multiple] {\n  background-image: initial;\n  background-position: initial;\n  background-repeat: unset;\n  background-size: initial;\n  padding-right: 0.75rem;\n  print-color-adjust: unset;\n}\n\n[type='checkbox'],[type='radio'] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 0;\n  print-color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  color: #2563eb;\n  background-color: #fff;\n  border-color: #6b7280;\n  border-width: 1px;\n  --tw-shadow: 0 0 #0000;\n}\n\n[type='checkbox'] {\n  border-radius: 0px;\n}\n\n[type='radio'] {\n  border-radius: 100%;\n}\n\n[type='checkbox']:focus,[type='radio']:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 2px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: #2563eb;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n}\n\n[type='checkbox']:checked,[type='radio']:checked {\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");\n}\n\n[type='radio']:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n}\n\n[type='checkbox']:checked:hover,[type='checkbox']:checked:focus,[type='radio']:checked:hover,[type='radio']:checked:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='checkbox']:indeterminate {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n[type='checkbox']:indeterminate:hover,[type='checkbox']:indeterminate:focus {\n  border-color: transparent;\n  background-color: currentColor;\n}\n\n[type='file'] {\n  background: unset;\n  border-color: inherit;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n  font-size: unset;\n  line-height: inherit;\n}\n\n[type='file']:focus {\n  outline: 1px solid ButtonText;\n  outline: 1px auto -webkit-focus-ring-color;\n}\n\n*, ::before, ::after {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.pointer-events-none {\n  pointer-events: none;\n}\n\n.pointer-events-auto {\n  pointer-events: auto;\n}\n\n.static {\n  position: static;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.inset-0 {\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n}\n\n.inset-y-0 {\n  top: 0px;\n  bottom: 0px;\n}\n\n.-left-8 {\n  left: -2rem;\n}\n\n.top-1\\/2 {\n  top: 50%;\n}\n\n.top-0 {\n  top: 0px;\n}\n\n.right-0 {\n  right: 0px;\n}\n\n.left-0 {\n  left: 0px;\n}\n\n.z-50 {\n  z-index: 50;\n}\n\n.m-2 {\n  margin: 0.5rem;\n}\n\n.-m-2 {\n  margin: -0.5rem;\n}\n\n.m-1 {\n  margin: 0.25rem;\n}\n\n.m-4 {\n  margin: 1rem;\n}\n\n.mx-1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n\n.my-1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n\n.-my-6 {\n  margin-top: -1.5rem;\n  margin-bottom: -1.5rem;\n}\n\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n\n.ml-4 {\n  margin-left: 1rem;\n}\n\n.mt-2 {\n  margin-top: 0.5rem;\n}\n\n.ml-3 {\n  margin-left: 0.75rem;\n}\n\n.mt-8 {\n  margin-top: 2rem;\n}\n\n.mt-1 {\n  margin-top: 0.25rem;\n}\n\n.mt-0\\.5 {\n  margin-top: 0.125rem;\n}\n\n.mt-0 {\n  margin-top: 0px;\n}\n\n.mt-6 {\n  margin-top: 1.5rem;\n}\n\n.ml-auto {\n  margin-left: auto;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.ml-1 {\n  margin-left: 0.25rem;\n}\n\n.block {\n  display: block;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.table {\n  display: table;\n}\n\n.flow-root {\n  display: flow-root;\n}\n\n.h-12 {\n  height: 3rem;\n}\n\n.h-screen {\n  height: 100vh;\n}\n\n.h-fit {\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n.h-20 {\n  height: 5rem;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.h-7 {\n  height: 1.75rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-24 {\n  height: 6rem;\n}\n\n.h-5 {\n  height: 1.25rem;\n}\n\n.h-3 {\n  height: 0.75rem;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.max-h-\\[95\\%\\] {\n  max-height: 95%;\n}\n\n.w-12 {\n  width: 3rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.w-64 {\n  width: 16rem;\n}\n\n.w-80 {\n  width: 20rem;\n}\n\n.w-8 {\n  width: 2rem;\n}\n\n.w-screen {\n  width: 100vw;\n}\n\n.w-72 {\n  width: 18rem;\n}\n\n.w-40 {\n  width: 10rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-24 {\n  width: 6rem;\n}\n\n.w-5 {\n  width: 1.25rem;\n}\n\n.w-3 {\n  width: 0.75rem;\n}\n\n.w-16 {\n  width: 4rem;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-7 {\n  width: 1.75rem;\n}\n\n.min-w-full {\n  min-width: 100%;\n}\n\n.max-w-full {\n  max-width: 100%;\n}\n\n.max-w-md {\n  max-width: 28rem;\n}\n\n.max-w-\\[150px\\] {\n  max-width: 150px;\n}\n\n.flex-1 {\n  flex: 1 1 0%;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n\n.table-auto {\n  table-layout: auto;\n}\n\n.translate-x-full {\n  --tw-translate-x: 100%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.translate-x-0 {\n  --tw-translate-x: 0px;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.cursor-help {\n  cursor: help;\n}\n\n.cursor-not-allowed {\n  cursor: not-allowed;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-end {\n  align-items: flex-end;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.justify-evenly {\n  justify-content: space-evenly;\n}\n\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n\n.divide-y > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}\n\n.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-divide-opacity));\n}\n\n.divide-gray-100 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-divide-opacity));\n}\n\n.overflow-auto {\n  overflow: auto;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.overflow-x-hidden {\n  overflow-x: hidden;\n}\n\n.overflow-y-scroll {\n  overflow-y: scroll;\n}\n\n.overflow-ellipsis {\n  text-overflow: ellipsis;\n}\n\n.text-ellipsis {\n  text-overflow: ellipsis;\n}\n\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n\n.rounded-md {\n  border-radius: 0.375rem;\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-t {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.rounded-b {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-0 {\n  border-width: 0px;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.border-t {\n  border-top-width: 1px;\n}\n\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n\n.border-transparent {\n  border-color: transparent;\n}\n\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n\n.border-gray-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(156 163 175 / var(--tw-border-opacity));\n}\n\n.bg-transparent {\n  background-color: transparent;\n}\n\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.bg-indigo-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(129 140 248 / var(--tw-bg-opacity));\n}\n\n.bg-indigo-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(79 70 229 / var(--tw-bg-opacity));\n}\n\n.bg-gray-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(107 114 128 / var(--tw-bg-opacity));\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n\n.bg-gray-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity));\n}\n\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity));\n}\n\n.bg-blue-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(191 219 254 / var(--tw-bg-opacity));\n}\n\n.bg-green-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(74 222 128 / var(--tw-bg-opacity));\n}\n\n.bg-gray-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(156 163 175 / var(--tw-bg-opacity));\n}\n\n.bg-red-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 113 113 / var(--tw-bg-opacity));\n}\n\n.bg-blue-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(96 165 250 / var(--tw-bg-opacity));\n}\n\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.bg-gray-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(209 213 219 / var(--tw-bg-opacity));\n}\n\n.bg-opacity-75 {\n  --tw-bg-opacity: 0.75;\n}\n\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n\n.bg-cover {\n  background-size: cover;\n}\n\n.bg-center {\n  background-position: center;\n}\n\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.object-center {\n  -o-object-position: center;\n     object-position: center;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-5 {\n  padding: 1.25rem;\n}\n\n.p-1\\.5 {\n  padding: 0.375rem;\n}\n\n.p-1 {\n  padding: 0.25rem;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}\n\n.p-0 {\n  padding: 0px;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.pr-4 {\n  padding-right: 1rem;\n}\n\n.pl-2 {\n  padding-left: 0.5rem;\n}\n\n.pl-10 {\n  padding-left: 2.5rem;\n}\n\n.pl-1 {\n  padding-left: 0.25rem;\n}\n\n.pl-5 {\n  padding-left: 1.25rem;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.leading-tight {\n  line-height: 1.25;\n}\n\n.leading-6 {\n  line-height: 1.5rem;\n}\n\n.tracking-wider {\n  letter-spacing: 0.05em;\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n.text-blue-500 {\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.text-indigo-600 {\n  --tw-text-opacity: 1;\n  color: rgb(79 70 229 / var(--tw-text-opacity));\n}\n\n.text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n\n.text-blue-600 {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\n\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity));\n}\n\n.opacity-0 {\n  opacity: 0;\n}\n\n.opacity-100 {\n  opacity: 1;\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-xl {\n  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n\n.transition {\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.transition-opacity {\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.delay-150 {\n  transition-delay: 150ms;\n}\n\n.duration-300 {\n  transition-duration: 300ms;\n}\n\n.duration-150 {\n  transition-duration: 150ms;\n}\n\n.duration-500 {\n  transition-duration: 500ms;\n}\n\n.duration-75 {\n  transition-duration: 75ms;\n}\n\n.ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n#jkforum-helper .toggle-bg:after {\n  content: '';\n  position: absolute;\n  top: 0.125rem;\n  left: 0.125rem;\n  height: 0.75rem;\n  width: 0.75rem;\n  border-radius: 9999px;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n#jkforum-helper input:checked + .toggle-bg:after {\n  transform: translateX(100%);\n  --tw-border-opacity: 1;\n  border-color: rgb(255 255 255 / var(--tw-border-opacity));\n}\n\n#jkforum-helper input:checked + .toggle-bg {\n  --tw-border-opacity: 1;\n  border-color: rgb(37 99 235 / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity));\n}\n\n.border-b {\n  border-bottom: 1px solid lightgray;\n}\n\n/* 增加 visited 样式，图片模式已阅的帖子变灰色 */\n\n.xw0 a:visited {\n  color: grey;\n}\n\n#jkforum-helper button {\n  border: unset;\n}\n\n.focus-within\\:text-gray-400:focus-within {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.hover\\:translate-x-9:hover {\n  --tw-translate-x: 2.25rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:rotate-\\[360deg\\]:hover {\n  --tw-rotate: 360deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:scale-110:hover {\n  --tw-scale-x: 1.1;\n  --tw-scale-y: 1.1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.hover\\:border-gray-200:hover {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n\n.hover\\:bg-indigo-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(67 56 202 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-200:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.hover\\:text-gray-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\n\n.hover\\:text-indigo-500:hover {\n  --tw-text-opacity: 1;\n  color: rgb(99 102 241 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-900:hover {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n.hover\\:shadow-lg:hover {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.focus\\:border-blue-500:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity));\n}\n\n.focus\\:border-gray-100:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-border-opacity));\n}\n\n.focus\\:bg-indigo-700:focus {\n  --tw-bg-opacity: 1;\n  background-color: rgb(67 56 202 / var(--tw-bg-opacity));\n}\n\n.focus\\:shadow-lg:focus {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-0:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n\n.focus\\:ring-indigo-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(99 102 241 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-blue-500:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));\n}\n\n.focus\\:ring-offset-2:focus {\n  --tw-ring-offset-width: 2px;\n}\n\n.active\\:bg-indigo-800:active {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 48 163 / var(--tw-bg-opacity));\n}\n\n.active\\:shadow-lg:active {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.disabled\\:opacity-25:disabled {\n  opacity: 0.25;\n}\n\n.group:hover .group-hover\\:text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\n\n@media (prefers-color-scheme: dark) {\n  .dark\\:border-gray-600 {\n    --tw-border-opacity: 1;\n    border-color: rgb(75 85 99 / var(--tw-border-opacity));\n  }\n\n  .dark\\:border-gray-700 {\n    --tw-border-opacity: 1;\n    border-color: rgb(55 65 81 / var(--tw-border-opacity));\n  }\n\n  .dark\\:bg-gray-700 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:bg-gray-800 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:bg-blue-900 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(30 58 138 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:text-gray-300 {\n    --tw-text-opacity: 1;\n    color: rgb(209 213 219 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-white {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-gray-400 {\n    --tw-text-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-text-opacity));\n  }\n\n  .dark\\:text-blue-200 {\n    --tw-text-opacity: 1;\n    color: rgb(191 219 254 / var(--tw-text-opacity));\n  }\n\n  .dark\\:placeholder-gray-400::-moz-placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:placeholder-gray-400:-ms-input-placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:placeholder-gray-400::placeholder {\n    --tw-placeholder-opacity: 1;\n    color: rgb(156 163 175 / var(--tw-placeholder-opacity));\n  }\n\n  .dark\\:hover\\:bg-gray-600:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(75 85 99 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:hover\\:bg-gray-700:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(55 65 81 / var(--tw-bg-opacity));\n  }\n\n  .dark\\:hover\\:text-white:hover {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n\n  .dark\\:focus\\:border-blue-500:focus {\n    --tw-border-opacity: 1;\n    border-color: rgb(59 130 246 / var(--tw-border-opacity));\n  }\n\n  .dark\\:focus\\:ring-blue-500:focus {\n    --tw-ring-opacity: 1;\n    --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));\n  }\n\n  .group:hover .dark\\:group-hover\\:text-white {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n}\n\n@media (min-width: 640px) {\n  .sm\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .sm\\:text-xs {\n    font-size: 0.75rem;\n    line-height: 1rem;\n  }\n\n  .sm\\:text-sm {\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n  }\n\n  .sm\\:leading-5 {\n    line-height: 1.25rem;\n  }\n\n  .sm\\:duration-700 {\n    transition-duration: 700ms;\n  }\n}\n", ""]);
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
        downloadBtn: 0,
        replyBtn: 0,
        thkBtn: 0,
    }); // 防止按钮重复点击
    (0, react_1.useEffect)(() => {
        if (!user) {
            (0, lib_1.creatUser)(username, formhash).then((user) => {
                (0, lib_1.launch)(user); // 启动自动签到、投票、加载原图等
                setUser(user);
            });
        }
    }, [username, formhash, user]);
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
exports.Status = exports.RunStatus = exports.Mood = void 0;
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
var Status;
(function (Status) {
    Status["online"] = "online";
    Status["offline"] = "offline";
})(Status || (Status = {}));
exports.Status = Status;
var RunStatus;
(function (RunStatus) {
    RunStatus["NotRunning"] = "\u672A\u8FD0\u884C";
    RunStatus["Waiting"] = "\u7B49\u5F85\u4E2D";
    RunStatus["Running"] = "\u8FD0\u884C\u4E2D";
    RunStatus["Error"] = "\u9519\u8BEF";
})(RunStatus || (RunStatus = {}));
exports.RunStatus = RunStatus;


/***/ }),

/***/ 237:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Button = (_a) => {
    var { text, title = '', onClick, disabled } = _a, rest = __rest(_a, ["text", "title", "onClick", "disabled"]);
    return (react_1.default.createElement("button", Object.assign({}, rest, { title: title, type: "button", "data-mdb-ripple": "true", "data-mdb-ripple-color": "light", disabled: disabled, className: `mx-1 my-1 px-2 py-1 text-xs font-medium text-center text-white inline-block leading-tight uppercase rounded shadow-md ${disabled
            ? ' cursor-not-allowed bg-indigo-400 '
            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`, onClick: onClick }), text));
};
exports.Button = Button;


/***/ }),

/***/ 84:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const react_1 = __importDefault(__webpack_require__(995));
const Input = (_a) => {
    var { label, placeholder, autoComplete, value, type = 'text' } = _a, args = __rest(_a, ["label", "placeholder", "autoComplete", "value", "type"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label ? (react_1.default.createElement("label", { htmlFor: 'input' + label, className: "block m-1 text-xs font-medium text-gray-900 dark:text-gray-300" }, label)) : (''),
        react_1.default.createElement("input", Object.assign({}, args, { autoComplete: autoComplete, type: type, id: label ? 'input' + label : '', placeholder: placeholder, value: value, className: "py-1 pl-2 block w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" }))));
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
const Modal = ({ header, footer, children, width, height, isShow = false, onClose }) => {
    if (!isShow) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: "fixed top-0 right-0 h-full w-full left-0 z-50 overflow-y-auto overflow-x-hidden items-center justify-center flex bg-gray-900 bg-opacity-50" },
        react_1.default.createElement("div", { className: `relative rounded-lg bg-white shadow dark:bg-gray-700 m-4 flex flex-col ${width} ${height}` },
            react_1.default.createElement("div", { className: "flex items-start justify-between rounded-t dark:border-gray-600  border-gray-300 border-solid border-0 border-b p-5" },
                react_1.default.createElement("h3", { className: "text-xl font-medium text-gray-900 dark:text-white" }, header),
                react_1.default.createElement("button", { "aria-label": "Close", className: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white", type: "button", onClick: onClose },
                    react_1.default.createElement("svg", { stroke: "currentColor", fill: "none", strokeWidth: "0", viewBox: "0 0 24 24", "aria-hidden": "true", className: "h-5 w-5", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })))),
            react_1.default.createElement("div", { className: "p-6 h-full overflow-auto" }, children),
            react_1.default.createElement("div", { className: "flex items-center rounded-b p-6 dark:border-gray-600 border-gray-300 border-solid border-0 border-t" }, footer))));
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
/* eslint-disable react/jsx-key */
const commonType_1 = __webpack_require__(321);
const tools_1 = __webpack_require__(633);
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
        react_1.default.createElement("input", { className: "w-6 mx-1", value: value, onChange: onChange, onBlur: onBlur }),
        "\u5206\u949F/\u70B9\u51FB"));
};
const ToggleCell = ({ value, row: { index }, column: { id }, updateMyData, // This is a custom function that we supplied to our table instance
 }) => {
    const update = () => {
        updateMyData(index, id, value === commonType_1.Status.online ? commonType_1.Status.offline : commonType_1.Status.online);
    };
    return (react_1.default.createElement(Toggle_1.Toggle, { mykey: `${id}-${index}-${value}`, label: value === commonType_1.Status.online ? '已启用' : '未启用', onClick: update, checked: value === commonType_1.Status.online }));
};
const LightCell = ({ value }) => {
    const getLightColor = (value) => {
        switch (true) {
            case value === commonType_1.RunStatus.Running:
                return 'bg-green-400';
            case value === commonType_1.RunStatus.NotRunning:
                return 'bg-gray-400';
            case value === commonType_1.RunStatus.Error:
                return 'bg-red-400';
            case value === commonType_1.RunStatus.Waiting:
                return 'bg-blue-400';
            default:
                break;
        }
    };
    return (react_1.default.createElement("div", { title: "\u72B6\u6001\u4E3A\u2018\u7B49\u5F85\u4E2D\u2019\u65F6\u4E3A\u672A\u5230\u6267\u884C\u65F6\u95F4\u6BB5\uFF0C\u72B6\u6001\u4E3A\u2018\u9519\u8BEF\u2019\u65F6\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u65B0\u8FD0\u884C", className: `flex items-center w-16 cursor-help` },
        react_1.default.createElement("span", { className: `rounded-md px-2 py-1 font-bold text-white ${getLightColor(value)}` }, value)));
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
                    return (react_1.default.createElement("strong", { title: props.value, className: "block whitespace-nowrap overflow-hidden overflow-ellipsis mx-1" }, props.value));
                },
            };
        }
        else if (headerItem === 'status') {
            return {
                Header: '启用状态',
                accessor: headerItem,
                Cell: ToggleCell,
            };
        }
        else if (headerItem === 'runStatus') {
            return {
                Header: '运行状态',
                accessor: headerItem,
                Cell: LightCell,
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
                Header: '帖子ID',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return (react_1.default.createElement("a", { className: "border-b", title: value, target: "_blank", href: value, rel: "noreferrer" }, (0, tools_1.getTid)(value)));
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
        else if (headerItem === 'nextClickTime') {
            return {
                Header: '下次点击',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return react_1.default.createElement("span", null, new Date(value).toLocaleString());
                },
            };
        }
        else if (headerItem === 'retry') {
            return {
                Header: '重试次数',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return react_1.default.createElement("span", null, value);
                },
            };
        }
        else if (headerItem === 'runTime') {
            return {
                Header: '运行时段',
                accessor: headerItem,
                Cell: ({ value }) => {
                    return react_1.default.createElement("span", null, value ? value.startTime + ':00~' + value.endTime + ':59' : '24h');
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
            pageSize: 20,
        },
        // defaultColumn,
        autoResetPage: !skipPageReset,
        disableSortRemove: true,
        updateMyData,
        deleteData,
    }, react_table_1.useGlobalFilter, react_table_1.useSortBy, react_table_1.usePagination);
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, setGlobalFilter, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize, globalFilter }, } = tableInstance;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "bg-white px-2 py-4" },
            react_1.default.createElement("h3", { className: "text-lg px-2 py-2 leading-6 font-medium text-gray-900" }, memoTitle),
            searchBar ? (react_1.default.createElement("div", { className: "mx-2 flex-1 relative text-gray-500 focus-within:text-gray-400" },
                react_1.default.createElement("div", { className: "absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none" },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-4 w-4", height: "25", width: "25" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }))),
                react_1.default.createElement("input", { className: "pl-5 block shadow-sm border-2 transition text-gray-900 disabled:opacity-25 focus:border-gray-100 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5", type: "text", value: globalFilter || '', onChange: (e) => setGlobalFilter(e.target.value) }))) : (''),
            react_1.default.createElement("table", Object.assign({}, getTableProps(), { className: "mb-4 min-w-full divide-y divide-gray-100 table-auto" }),
                react_1.default.createElement("thead", { className: "bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400" }, headerGroups.map((headerGroup) => (react_1.default.createElement("tr", Object.assign({}, headerGroup.getHeaderGroupProps()), headerGroup.headers.map((column) => (react_1.default.createElement("th", Object.assign({}, column.getHeaderProps(column.getSortByToggleProps()), { className: "px-2 py-3 text-left text-xs text-gray-500 uppercase tracking-wider" }),
                    react_1.default.createElement("div", { className: "flex" },
                        column.render('Header'),
                        column.isSorted ? (column.isSortedDesc ? (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", height: "16", width: "16" },
                            react_1.default.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }))) : (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", height: "16", width: "16" },
                            react_1.default.createElement("path", { fillRule: "evenodd", d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z", clipRule: "evenodd" })))) : (''))))))))),
                react_1.default.createElement("tbody", Object.assign({ className: "w-full divide-y text-left text-sm text-gray-500 dark:text-gray-400", role: "table" }, getTableBodyProps()), page.map((row) => {
                    prepareRow(row);
                    return (react_1.default.createElement("tr", Object.assign({}, row.getRowProps(), { className: "hover:bg-gray-200 dark:hover:bg-gray-600 bg-white dark:border-gray-700 dark:bg-gray-800" }), row.cells.map((cell) => {
                        return (react_1.default.createElement("td", Object.assign({}, cell.getCellProps(), { className: "text-xs p-0 h-8 whitespace-nowrap font-medium text-gray-900 dark:text-white max-w-[150px] overflow-hidden text-ellipsis" }), cell.render('Cell')));
                    })));
                }))),
            react_1.default.createElement("div", { className: "flex justify-center bg-gray-100" },
                react_1.default.createElement("div", { className: "px-2 text-left text-xs text-gray-500 tracking-wider" },
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => gotoPage(0), disabled: !canPreviousPage }, '<< 第一页'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => previousPage(), disabled: !canPreviousPage }, '< 上一页'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => nextPage(), disabled: !canNextPage }, '下一页 >'),
                    ' ',
                    react_1.default.createElement("button", { className: "bg-gray-200 hover:bg-gray-100 font-bold py-1 px-2 border-b-2 border-gray-400 hover:border-gray-200 rounded", onClick: () => gotoPage(pageCount - 1), disabled: !canNextPage }, '最后一页 >>'),
                    ' ',
                    react_1.default.createElement("span", null,
                        "| \u7B2C",
                        ' ',
                        react_1.default.createElement("strong", null,
                            pageIndex + 1,
                            " \u9875\uFF0C\u5171 ",
                            pageOptions.length,
                            " \u9875"),
                        ' '),
                    react_1.default.createElement("span", null,
                        "| \u8DF3\u8F6C\u5230\u7B2C",
                        ' ',
                        react_1.default.createElement("input", { className: "w-8 bg-gray-100 hover:bg-gray-200", type: "number", defaultValue: pageIndex + 1, onChange: (e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            } }),
                        ' ',
                        "\u9875"),
                    ' ',
                    react_1.default.createElement("select", { className: "bg-gray-100 hover:bg-gray-200 pl-1", value: pageSize, onChange: (e) => {
                            setPageSize(Number(e.target.value));
                        } }, [10, 20, 50].map((pageSize) => (react_1.default.createElement("option", { key: pageSize, value: pageSize },
                        "\u663E\u793A",
                        pageSize,
                        "\u6761")))))))));
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
const Toggle = ({ label, checked, title, mykey = '-', onClick }) => {
    const [selected, setSelected] = (0, react_1.useState)(checked);
    (0, react_1.useEffect)(() => {
        setSelected(checked);
    }, [checked]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("label", { key: label + mykey, title: title, htmlFor: 'toggle-' + mykey + label, className: "mx-1 my-1 flex items-center cursor-pointer relative" },
            react_1.default.createElement("input", { type: "checkbox", id: 'toggle-' + mykey + label, className: "sr-only", checked: selected, onClick: () => {
                    setSelected(!selected);
                }, onChange: (e) => {
                    onClick(e.target.checked);
                } }),
            react_1.default.createElement("div", { className: "toggle-bg bg-gray-300 border-2 border-gray-200 h-4 w-7 rounded-full" }),
            react_1.default.createElement("span", { className: "ml-1 text-gray-900 text-xs" }, label))));
};
exports.Toggle = Toggle;


/***/ }),

/***/ 740:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Toggle = exports.TextArea = exports.ReactTableCard = exports.Panel = exports.Modal = exports.Input = exports.Button = void 0;
var Button_1 = __webpack_require__(237);
Object.defineProperty(exports, "Button", ({ enumerable: true, get: function () { return Button_1.Button; } }));
var Input_1 = __webpack_require__(84);
Object.defineProperty(exports, "Input", ({ enumerable: true, get: function () { return Input_1.Input; } }));
var Modal_1 = __webpack_require__(653);
Object.defineProperty(exports, "Modal", ({ enumerable: true, get: function () { return Modal_1.Modal; } }));
var Panel_1 = __webpack_require__(414);
Object.defineProperty(exports, "Panel", ({ enumerable: true, get: function () { return Panel_1.Panel; } }));
var Table_1 = __webpack_require__(420);
Object.defineProperty(exports, "ReactTableCard", ({ enumerable: true, get: function () { return __importDefault(Table_1).default; } }));
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
exports.postDataCdata = exports.postData = exports.getData = void 0;
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
                new _1.MessageBox('网络超时', 'none', "LOG_POP_GM" /* LOG_POP_GM */);
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
                new _1.MessageBox('网络超时', 'none', "LOG_POP_GM" /* LOG_POP_GM */);
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
                new _1.MessageBox('网络超时', 'none', "LOG_POP_GM" /* LOG_POP_GM */);
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
exports.noDisplayPic = exports.downloadImgs = void 0;
const ConcurrencyPromisePool_1 = __webpack_require__(287);
const file_saver_1 = __webpack_require__(581);
const jszip_1 = __importDefault(__webpack_require__(583));
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
            mesIdH.update(`正在下载：第 ${index + 1} / ${imgsUrls.length} 张，文件名：${file_name}`);
            return (0, _1.getData)(item, "blob" /* BLOB */)
                .then((blob) => {
                const data = blob;
                // 下载文件, 并存成ArrayBuffer对象
                zip.file(file_name, data, {
                    binary: true,
                }); // 逐个添加文件
                mesIdP.update(`第 ${index + 1} 张，文件名：${file_name}，大小：${(data.size / 1024).toFixed(0)} Kb，下载完成！等待压缩...`);
            })
                .catch((err) => {
                // 移除消息；
                if (err.responseText) {
                    const domParser = new DOMParser();
                    const xmlDoc = domParser.parseFromString(err.responseText, 'text/html');
                    mesIdP.update(`第 ${index + 1} 张，请求错误：${xmlDoc.body.innerHTML}`);
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
        mesIdP.update('正在压缩打包，大文件请耐心等待...');
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
    let isAuthMethod = false;
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
            isAuthMethod = true;
        }
        else {
            isAuthMethod = false;
        }
        return xhrOpen.apply(this, [method, url, true]);
    };
};


/***/ }),

/***/ 915:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setTimeoutWorker = exports.setIntervalWorker = exports.autoVoted = exports.getUserName = exports.getUserFromName = exports.getFormhash = exports.creatUser = exports.User = exports.autoThk = exports.timeControl = exports.sign = exports.resetReplyData = exports.replyOrThk = exports.addPageBatch = exports.addOnePage = exports.autoPlay = exports.addPlayEvent = exports.autoPay = exports.loadOriginImage = exports.autofillCaptcha = exports.MessageBox = exports.swThk = exports.swRePic = exports.swPay = exports.swDailyTask = exports.checkUpdate = exports.launch = exports.autoDailyTasks = exports.skipPhoneValidate = exports.setFastReply = exports.noDisplayPic = exports.downloadImgs = exports.postDataCdata = exports.postData = exports.getData = void 0;
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
Object.defineProperty(exports, "autoDailyTasks", ({ enumerable: true, get: function () { return launch_1.autoDailyTasks; } }));
Object.defineProperty(exports, "launch", ({ enumerable: true, get: function () { return launch_1.launch; } }));
var menuCommand_1 = __webpack_require__(817);
Object.defineProperty(exports, "checkUpdate", ({ enumerable: true, get: function () { return menuCommand_1.checkUpdate; } }));
Object.defineProperty(exports, "swDailyTask", ({ enumerable: true, get: function () { return menuCommand_1.swDailyTask; } }));
Object.defineProperty(exports, "swPay", ({ enumerable: true, get: function () { return menuCommand_1.swPay; } }));
Object.defineProperty(exports, "swRePic", ({ enumerable: true, get: function () { return menuCommand_1.swRePic; } }));
Object.defineProperty(exports, "swThk", ({ enumerable: true, get: function () { return menuCommand_1.swThk; } }));
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
Object.defineProperty(exports, "User", ({ enumerable: true, get: function () { return user_1.User; } }));
Object.defineProperty(exports, "creatUser", ({ enumerable: true, get: function () { return user_1.creatUser; } }));
Object.defineProperty(exports, "getFormhash", ({ enumerable: true, get: function () { return user_1.getFormhash; } }));
Object.defineProperty(exports, "getUserFromName", ({ enumerable: true, get: function () { return user_1.getUserFromName; } }));
Object.defineProperty(exports, "getUserName", ({ enumerable: true, get: function () { return user_1.getUserName; } }));
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
exports.launch = exports.autoDailyTasks = void 0;
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
// 启动
function launch(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 增加路由地址判断，只执行对应函数
            const localUrl = location.href;
            if (localUrl.includes('thread')) {
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
                const counter = {
                    playBtn: 0,
                    playFlag: 0,
                };
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
                yield Promise.all([(0, _1.sign)(user), (0, _1.autoVoted)(user)]);
            }
            // 异步启动定时每日任务
            if (user.autoDailyTask) {
                autoDailyTasks(user);
            }
        }
        catch (e) {
            GM_setValue(user.username, user); //保存当天日// today 初始化
            console.error(e);
        }
    });
}
exports.launch = launch;
const autoDailyTasks = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tools_1.waitFor)(86400000);
    yield Promise.all([(0, _1.sign)(user), (0, _1.autoVoted)(user)]);
    yield autoDailyTasks(user);
});
exports.autoDailyTasks = autoDailyTasks;


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
exports.swThk = exports.swRePic = exports.swPay = exports.swDailyTask = exports.checkUpdate = void 0;
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
function swDailyTask(user) {
    if (user.autoDailyTask) {
        user.autoDailyTask = false;
        GM_setValue(user.username, user);
        new _1.MessageBox('已关闭定时每日任务，刷新页面后生效');
    }
    else {
        user.autoDailyTask = true;
        GM_setValue(user.username, user);
        new _1.MessageBox('已开启定时每日任务，刷新页面后生效');
    }
}
exports.swDailyTask = swDailyTask;
function checkUpdate(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = new _1.MessageBox('正在检查更新...', 'none');
        const data = yield (0, _1.getData)(user.greasyforkUrl);
        const version = data.querySelectorAll('.script-show-version span')[1].innerHTML;
        if ((0, tools_1.getVersionNum)(user.version) < (0, tools_1.getVersionNum)(version)) {
            GM_openInTab(`${user.greasyforkUrl}-jkforum-%E5%8A%A9%E6%89%8B/code/JKForum%20%E5%8A%A9%E6%89%8B.user.js`);
        }
        else {
            new _1.MessageBox('已是最新版本！');
        }
        msg.remove();
    });
}
exports.checkUpdate = checkUpdate;


/***/ }),

/***/ 244:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageBox = void 0;
/**
 * 消息通知类：不依赖框架
 * @example
 * 0.先在入口文件中调用静态方法 generate() 方法初始化消息弹出窗口；
 * 1. new MessageBox('hello')
 * 2.空初始化时调用 show() 显示消息；
 * 3.setTime：ms，非数字时为永久消息，需手动调用 update() 刷新消息，remove() 移除消息；
 * 4.importance：LOG_POP：log+自定义弹窗；LOG_POP_GM：log+自定义弹窗+GM系统提示；POP：自定义弹窗；
 */
class MessageBox {
    constructor(text, setTime = 5000, importance = "LOG_POP" /* LOG_POP */) {
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
            case "LOG_POP" /* LOG_POP */: {
                console.log(text);
                break;
            }
            case "LOG_POP_GM" /* LOG_POP_GM */: {
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
    update(text) {
        if (isNaN(Number(this._setTime)) && this._msg) {
            this._msg.textContent = text;
            console.log(text);
            switch (this._importance) {
                case "LOG_POP" /* LOG_POP */: {
                    break;
                }
                case "LOG_POP_GM" /* LOG_POP_GM */: {
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
const commonType_1 = __webpack_require__(321);
const tools_1 = __webpack_require__(633);
const _1 = __webpack_require__(915);
/**
 * OCR
 */
exports.RETRY = 'retry';
function captcha(thread, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const tid = (0, tools_1.getTid)(thread.url);
        const url = `${user.votedUrl}id=topthreads:setstatus&tid=${tid}&handlekey=k_setstatus&infloat=1&freeon=yes&inajax=1`;
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.id = 'captcha';
            image.src = 'https://www.jkforum.net/captcha/code.php' + '?' + new Date().getMilliseconds();
            image.width = 120;
            image.crossOrigin = 'anonymous';
            document.body.append(image);
            image.onload = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const base64Img = (0, tools_1.getBase64Image)(image);
                    if (!base64Img) {
                        new _1.MessageBox('图片转码失败，正在重试...');
                        return reject(exports.RETRY);
                    }
                    //文件的Base64字符串获取验证码
                    const code = yield readImage(base64Img, user);
                    if (image.parentNode) {
                        image.parentNode.removeChild(image);
                    }
                    if (typeof code === 'object') {
                        // 令牌错误不重试
                        new _1.MessageBox(code.error_msg + '，请手动重试或联系管理员', 'none', "LOG_POP_GM" /* LOG_POP_GM */);
                        return reject(code);
                    }
                    const response = yield (0, _1.postData)(url, (0, tools_1.urlSearchParams)({ captcha_input: code }).toString()).catch((e) => {
                        console.log(e);
                        return exports.RETRY;
                    });
                    if (!response) {
                        new _1.MessageBox(tid + '，无效的帖子ID，请检查帖子状态', 'none', 'LOG_POP_GM');
                        return reject(response);
                    }
                    const result = (0, tools_1.turnCdata)(response);
                    if (result === exports.RETRY) {
                        new _1.MessageBox(tid + '，验证码发送失败，正在重试...');
                        return reject(exports.RETRY);
                    }
                    else if (result === '更新完成！若狀態仍沒更新，請嘗試刷新頁面') {
                        new _1.MessageBox(tid + '，更新完成！自動‘現在有空’中，請不要刷新頁面！');
                        return resolve(result);
                    }
                    else if (result === 'Access denied.') {
                        new _1.MessageBox(tid + '，无此帖子的访问权限，请检查帖子状态', 'none', 'LOG_POP_GM');
                        return reject(result);
                    }
                    else {
                        new _1.MessageBox(tid + '，验证码错误，正在重试...');
                        return reject(exports.RETRY);
                    }
                });
            };
            image.onerror = function (error) {
                console.log(error);
                if (image.parentNode) {
                    image.parentNode.removeChild(image);
                }
                new _1.MessageBox(tid + '，验证码图片加载失败，正在重试...');
                return reject(exports.RETRY);
            };
        });
    });
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
            // 导致提示信息错误
            return { error_msg: ((_a = e.response) === null || _a === void 0 ? void 0 : _a.message) ? e.response.message : e.statusText, error_code: 0 };
        });
        const ocrResults = response;
        if ('words_result' in ocrResults) {
            const words = ocrResults.words_result[0].words.replace(/g/gi, '6');
            if (words.length < 4) {
                return String((0, tools_1.rdNum)(0, 10)) + words;
            }
            else if (words.length > 4) {
                return words.slice(1, 5);
            }
            else {
                return words;
            }
        }
        else if ('error_msg' in ocrResults) {
            return ocrResults;
        }
        return String((0, tools_1.rdNum)(1000, 10000));
    });
}
function autofillCaptcha(t, user, setNextClickTime, saveStatusData, triggerNextClick) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 在异步请求前设置好时间，防止时间错误
            let timeInterval = 60000 * Number(t.cycle);
            let skip = false;
            const now = new Date();
            if (t.runTime) {
                const hours = (0, tools_1.hoursUntilTimeRange)(t.runTime.startTime, t.runTime.endTime);
                if (hours !== 0) {
                    const overMinutes = now.getMinutes() * 60000 + now.getSeconds() * 1000 - (0, tools_1.rdNum)(0, 10000);
                    timeInterval = hours * 3600000 - overMinutes;
                    skip = true;
                }
            }
            const nextClickTime = now.getTime() + timeInterval;
            t.nextClickTime = nextClickTime;
            if (!skip) {
                saveStatusData(t.url, commonType_1.RunStatus.Running);
                yield captcha(t, user);
                t.retry = 0;
            }
            else {
                saveStatusData(t.url, commonType_1.RunStatus.Waiting);
            }
            // 调用计数和存入时间
            setNextClickTime(t, skip);
            setTimeout(() => {
                triggerNextClick(t);
            }, timeInterval);
        }
        catch (e) {
            if (typeof e === 'string') {
                if (e === exports.RETRY) {
                    const timeInterval = 1000 + (0, tools_1.rdNum)(0, 5000);
                    const nextClickTime = new Date().getTime() + timeInterval;
                    t.nextClickTime = nextClickTime;
                    t.retry = ((_a = t.retry) !== null && _a !== void 0 ? _a : 0) + 1;
                    // 调用计数
                    setNextClickTime(t);
                    setTimeout(() => {
                        triggerNextClick(t);
                    }, timeInterval); // 重试频率限制
                }
                else {
                    // 错误则改变状态
                    saveStatusData(t.url, commonType_1.RunStatus.Error);
                }
            }
            else {
                saveStatusData(t.url, commonType_1.RunStatus.Error);
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

/***/ 960:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reCaptcha = void 0;
const reCaptcha = () => {
    Window.prototype.onloadCaptchaCallback = function () {
        const onCaptchaChange = (token) => {
            GM_setValue('CaptchaValue', token);
        };
        grecaptcha.render('reCaptcha', {
            sitekey: '6LfxHOIUAAAAAJ-E2oORT8_zgG3Ia0QM1sg9Pe2s',
            callback: onCaptchaChange,
            hl: 'zh-TW',
        });
    };
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.append(script);
};
exports.reCaptcha = reCaptcha;


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
exports.replyOrThk = exports.addPageBatch = exports.addOnePage = void 0;
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
                    msId.update(`${fid}：任务列表：${index}，thread-${tid}-1-1 ：已在任务列表，已跳过此贴！`);
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
                        mesIdRep.update(fid +
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
                        mesIdRepContent.update('序号：' +
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
                        mesIdThk.update(fid +
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
            new lib_1.MessageBox('全部感谢完成！', 10000, "LOG_POP_GM" /* LOG_POP_GM */);
            setCounter(Object.assign(Object.assign({}, counter), { thkBtn: 0 }));
        }
        else if (type == "reply" /* REPLY */) {
            mesIdRep.remove(); // 移除永久消息
            mesIdRepContent.remove();
            new lib_1.MessageBox('全部回帖完成！', 10000, "LOG_POP_GM" /* LOG_POP_GM */);
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
exports.timeControl = exports.sign = void 0;
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
                msIdTime.update('执行中....');
                for (let i = 0; i < user.signNum; i++) {
                    //重试次数
                    sign(user);
                    msIdTime.update('执行第' + (i + 1) + '次');
                    yield (0, tools_1.waitFor)(user.interTime); //重试间隔
                }
                msIdTime.remove();
            }
            else {
                msIdTime.update('时间没有到：' + signtime + '，目前时间：' + now.seconds);
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
exports.getUserName = exports.getUserFromName = exports.getFormhash = exports.creatUser = exports.User = void 0;
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
        this.autoDailyTask = false; // 定时每日任务开关
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
            let info = '';
            const alertInfo = votedMessage.querySelector('.alert_info');
            const script = votedMessage.querySelector('script');
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
                const results = [...this.results];
                // 清空结果，方便重复使用
                this.results = [];
                return resolve(results);
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
exports.waitFor = exports.urlSearchParams = exports.updateUserUrl = exports.turnUrl = exports.turnCdata = exports.replaceHtml = exports.rdNum = exports.preciseSetTimeout = exports.preciseSetInterval = exports.mergeObjValue = exports.isSameObjKey = exports.hoursUntilTimeRange = exports.getVersionNum = exports.getUuiD = exports.getTid = exports.getBase64Image = exports.checkHtml = exports.NowTime = void 0;
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
const preciseSetInterval = (handler, delay, timeout = 0) => {
    let baseTime = Date.now();
    const callHandler = () => {
        if (Math.abs(Date.now() - baseTime) <= delay + timeout) {
            baseTime = Date.now();
            handler();
        }
    };
    return window.setInterval(callHandler, delay);
};
exports.preciseSetInterval = preciseSetInterval;
const preciseSetTimeout = (handler, delay, timeout = 0) => {
    let baseTime = Date.now();
    const callHandler = () => {
        if (Math.abs(Date.now() - baseTime) <= delay + timeout) {
            baseTime = Date.now();
            handler();
        }
    };
    return window.setTimeout(callHandler, delay);
};
exports.preciseSetTimeout = preciseSetTimeout;
function hoursUntilTimeRange(startHour, endHour) {
    const date = new Date();
    const currentHour = date.getHours();
    if (startHour <= endHour) {
        // 范围在同一天的情况
        if (currentHour >= startHour && currentHour <= endHour) {
            return 0;
        }
        else if (currentHour < startHour) {
            return startHour - currentHour;
        }
        else {
            return 24 - currentHour + startHour;
        }
    }
    else {
        // 范围跨越两天的情况
        if (currentHour >= startHour || currentHour <= endHour) {
            return 0;
        }
        else {
            return startHour - currentHour;
        }
    }
}
exports.hoursUntilTimeRange = hoursUntilTimeRange;
/**
 * 图像转Base64
 */
function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imgd = ctx.getImageData(0, 0, img.width, img.height);
    // const threshold = 250;
    const imgData = imgd.data;
    const len = imgData.length - 1;
    for (let i = 0; i <= len; i += 4) {
        const R = imgData[i];
        const G = imgData[i + 1];
        const B = imgData[i + 2];
        // const Alpha = imgData[i + 3];
        const avg = (R + G + B) / 3;
        // if (avg > threshold) {
        //   imgData[i] = 255;
        //   imgData[i + 1] = 255;
        //   imgData[i + 2] = 255;
        // } else {
        //   imgData[i] = 0;
        //   imgData[i + 1] = 0;
        //   imgData[i + 2] = 0;
        // }
        imgData[i] = avg;
        imgData[i + 1] = avg;
        imgData[i + 2] = avg;
    }
    ctx.putImageData(imgd, 0, 0);
    // const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL;
}
exports.getBase64Image = getBase64Image;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoClickManage = void 0;
const commonType_1 = __webpack_require__(321);
const components_1 = __webpack_require__(740);
const lib_1 = __webpack_require__(915);
const ConcurrencyPromisePool_1 = __webpack_require__(287);
const tools_1 = __webpack_require__(633);
const react_1 = __importStar(__webpack_require__(995));
const AutoClickManage = ({ onClose, user }) => {
    var _a, _b, _c, _d;
    const [data, setData] = (0, react_1.useState)(user.freeData ? user.freeData.map((d) => (Object.assign(Object.assign({}, d), { runStatus: commonType_1.RunStatus.NotRunning }))) : []);
    const [token, setToken] = (0, react_1.useState)(user.token);
    const [threadUrl, setThreadUrl] = (0, react_1.useState)('');
    const [running, setRunning] = (0, react_1.useState)(false);
    const [startTime, setStartTime] = (0, react_1.useState)(((_b = (_a = user.freeData) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.runTime) ? String(user.freeData[0].runTime.startTime) : '0');
    const [endTime, setEndTime] = (0, react_1.useState)(((_d = (_c = user.freeData) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.runTime) ? String(user.freeData[0].runTime.endTime) : '23');
    const [pool] = (0, react_1.useState)(new ConcurrencyPromisePool_1.ConcurrencyPromisePool(1));
    const isInitialMount = (0, react_1.useRef)(true);
    // When our cell renderer calls updateMyData, we'll use the rowIndex, columnId and new value to update the original data
    const updateMyData = (rowIndex, columnId, value) => {
        setData((old) => old.map((row, index) => {
            if (index === rowIndex) {
                return Object.assign(Object.assign({}, old[rowIndex]), { [columnId]: value });
            }
            return row;
        }));
    };
    const deleteData = (rowId) => {
        // We also turn on the flag to not reset the page
        setData((old) => {
            old.splice(rowId, 1);
            return [...old];
        });
    };
    const addThread = () => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f, _g, _h;
        if (!threadUrl) {
            return alert('请输入帖子链接');
        }
        const tid = (0, tools_1.getTid)(threadUrl);
        if (!tid) {
            return alert(`帖子地址错误，未找到帖子ID：${threadUrl}`);
        }
        if (data.some((t) => (0, tools_1.getTid)(t.url) === tid)) {
            return alert(tid + '，帖子已存在！');
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
        const title = ((_f = (_e = titleCont.querySelector('.z')) === null || _e === void 0 ? void 0 : _e.textContent) !== null && _f !== void 0 ? _f : '') + ((_h = (_g = titleCont.querySelector('h1')) === null || _g === void 0 ? void 0 : _g.textContent) !== null && _h !== void 0 ? _h : '');
        if (!title) {
            return alert('未找到帖子标题');
        }
        setData([
            ...data,
            {
                status: commonType_1.Status.online,
                runStatus: commonType_1.RunStatus.NotRunning,
                runTime: { startTime: Number(startTime), endTime: Number(endTime) },
                title,
                url: threadUrl,
                cycle: '55',
                times: 0,
                nextClickTime: 0,
                retry: 0,
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
    }, [data, token, user]);
    const setNextClickTime = (t, skip) => {
        setData((old) => old.map((row) => {
            if (row.url === t.url) {
                return Object.assign(Object.assign({}, row), { times: skip ? row.times : row.times + 1, nextClickTime: t.nextClickTime, retry: t.retry });
            }
            return row;
        }));
    };
    const triggerNextClick = (t) => {
        const onThread = data.find((onlineThread) => onlineThread.status === 'online' && t.url === onlineThread.url);
        if (!onThread) {
            return;
        }
        // 点击时间校验，防止点击时间错乱
        const diff = Math.abs(t.nextClickTime - new Date().getTime());
        // 时间精度过高，误差等于网络超时时间，设置误差60秒
        if (diff < 60000 && t.retry < 10) {
            // 添加任务，在此处开始闭包，递归调用
            pool.all([() => (0, lib_1.autofillCaptcha)(onThread, user, setNextClickTime, saveStatusData, triggerNextClick)]);
        }
        else if (t.retry >= 10) {
            saveStatusData(onThread.url, commonType_1.RunStatus.Error);
            new lib_1.MessageBox(`帖子ID：${(0, tools_1.getTid)(onThread.url)}，连续重试次数过多：${onThread.retry}次，自动现在有空已停止运行！`, 'none', 'LOG_POP_GM');
        }
        else {
            saveStatusData(onThread.url, commonType_1.RunStatus.Error);
            new lib_1.MessageBox(`帖子ID：${(0, tools_1.getTid)(onThread.url)}，已错过点击时间，自动现在有空已停止运行！预设点击时间：${new Date(t.nextClickTime).toLocaleString()}，实际时间：${new Date().toLocaleString()}`, 'none', 'LOG_POP_GM');
        }
    };
    const saveStatusData = (url, runStatus) => {
        setData((old) => old.map((row) => {
            if (row.url === url) {
                return Object.assign(Object.assign({}, row), { runStatus });
            }
            return row;
        }));
    };
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!token) {
            return alert('请输入令牌');
        }
        const onThreads = data.filter((t) => t.status === commonType_1.Status.online);
        if (!onThreads.length) {
            return alert('请将需要执行的帖子‘启用状态’设为已启用');
        }
        setRunning(true);
        const promises = onThreads.map((t) => () => (0, lib_1.autofillCaptcha)(Object.assign(Object.assign({}, t), { retry: 0 }), user, setNextClickTime, saveStatusData, triggerNextClick));
        pool.all(promises);
    });
    (0, react_1.useEffect)(() => {
        // only on update
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            saveData();
            if (running && data.every((t) => t.runStatus === commonType_1.RunStatus.NotRunning || t.runStatus === commonType_1.RunStatus.Error)) {
                setRunning(false);
            }
        }
    }, [data, running, saveData]);
    const setRunTime = () => {
        const startTimeNum = Number(startTime);
        const endTimeNum = Number(endTime);
        if (startTimeNum > 23 || startTimeNum < 0 || endTimeNum > 23 || endTimeNum < 0 || startTimeNum === endTimeNum) {
            return alert('时间必须大于等于0点，小于等于23点');
        }
        setData(data.map((d) => (Object.assign(Object.assign({}, d), { runTime: { startTime: startTimeNum, endTime: endTimeNum } }))));
    };
    return (react_1.default.createElement(components_1.Modal, { isShow: true, width: "w-full", height: "max-h-[95%]", header: react_1.default.createElement(react_1.default.Fragment, null, "\u81EA\u52A8\u70B9\u51FB\u73B0\u5728\u6709\u7A7A\u7BA1\u7406\u9875\u9762"), footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(components_1.Button, { text: '开始执行', onClick: start, disabled: running }),
            react_1.default.createElement(components_1.Button, { title: "\u4E0D\u4F7F\u7528\u65F6\u8BF7\u505C\u6B62\u8FD0\u884C\uFF0C\u4FEE\u6539\u8BBE\u7F6E\u540E\u9700\u8981\u505C\u6B62\u91CD\u65B0\u8FD0\u884C", text: '停止自动现在有空', onClick: () => {
                    location.reload();
                } }),
            react_1.default.createElement(components_1.Button, { title: "\u505C\u6B62\u8FD0\u884C\u81EA\u52A8\u73B0\u5728\u6709\u7A7A\u540E\u53EF\u5173\u95ED", text: '关闭页面', onClick: onClose, disabled: running })), onClose: () => {
            if (running) {
                alert('停止运行自动现在有空后可关闭');
            }
            else {
                onClose();
            }
        } },
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "text-red-500" },
                "\u76EE\u524D\u672C\u9875\u9762\u4EC5\u652F\u6301\u7BA1\u7406\u4E00\u4E2AJKF\u8D26\u53F7\u7684\u591A\u4E2A\u5E16\u5B50\uFF0C\u591A\u4E2A\u8D26\u53F7\u8BF7",
                react_1.default.createElement("a", { className: "text-blue-500 border-b", target: "_blank", href: "https://iknow.fun/2023/06/23/chrome-tong-shi-deng-lu-duo-ge-zhang-hao-wang-zhan-duo-kai-jiao-cheng/", rel: "noreferrer" }, "\u591A\u5F00\u6D4F\u89C8\u5668"),
                "\u3002"),
            react_1.default.createElement("div", { className: "flex items-end" },
                react_1.default.createElement("div", { className: "w-64 pr-4" },
                    react_1.default.createElement(components_1.Input, { autoComplete: "off", label: "\u8F93\u5165\u4EE4\u724C\uFF1A", type: "password", onChange: (e) => setToken(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u4EE4\u724C", value: token })),
                react_1.default.createElement("span", null, "\u8FD8\u6CA1\u6709\u4EE4\u724C\uFF1F"),
                react_1.default.createElement(components_1.Button, { title: "https://jkf.iknow.fun", text: '获取令牌', onClick: () => window.open('https://jkf.iknow.fun') })),
            react_1.default.createElement("div", { className: "flex items-end" },
                react_1.default.createElement("div", { className: "w-64" },
                    react_1.default.createElement(components_1.Input, { label: "\u5E16\u5B50\u94FE\u63A5\uFF1A", onChange: (e) => setThreadUrl(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u5E16\u5B50\u94FE\u63A5", value: threadUrl })),
                react_1.default.createElement("div", { className: "ml-4" },
                    react_1.default.createElement(components_1.Button, { text: '添加', onClick: addThread }))),
            react_1.default.createElement("div", { className: "flex items-end justify-between w-80 mt-2" },
                react_1.default.createElement("span", { title: "\u8BBE\u7F6E\u81EA\u52A8\u70B9\u51FB\u4EC5\u5728\u8BE5\u65F6\u95F4\u6BB5\u5185\u8FD0\u884C\uFF0C\u91CD\u65B0\u8FD0\u884C\u540E\u751F\u6548", className: "cursor-help" }, "\u8FD0\u884C\u65F6\u95F4\u6BB5\uFF1A"),
                react_1.default.createElement("div", { className: "w-8" },
                    react_1.default.createElement(components_1.Input, { type: "number", min: 0, max: 23, onChange: (e) => setStartTime(e.target.value), placeholder: "0", value: startTime })),
                react_1.default.createElement("span", null, "\u70B9 ~ "),
                react_1.default.createElement("div", { className: "w-8" },
                    react_1.default.createElement(components_1.Input, { type: "number", min: 0, max: 23, onChange: (e) => setEndTime(e.target.value), placeholder: "23", value: endTime })),
                react_1.default.createElement("span", { className: "pl-2" }, ":59\u5206"),
                react_1.default.createElement(components_1.Button, { text: '保存', title: "\u91CD\u65B0\u8FD0\u884C\u540E\u751F\u6548", onClick: setRunTime })),
            react_1.default.createElement("div", { className: "overflow-auto" }, data.length ? (react_1.default.createElement(components_1.ReactTableCard, { searchBar: false, title: '帖子管理', data: data.map((t) => ({
                    status: t.status,
                    runStatus: t.runStatus,
                    runTime: t.runTime,
                    title: t.title,
                    url: t.url,
                    cycle: t.cycle,
                    times: t.times,
                    nextClickTime: t.nextClickTime,
                    retry: t.retry,
                    delete: '',
                })), updateMyData: updateMyData, deleteData: deleteData })) : ('')))));
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
exports.Home = void 0;
const components_1 = __webpack_require__(740);
const lib_1 = __webpack_require__(915);
const reCaptcha_1 = __webpack_require__(960);
const react_1 = __importStar(__webpack_require__(995));
const react_copy_to_clipboard_1 = __webpack_require__(950);
const AutoClickManage_1 = __webpack_require__(699);
const Home = ({ user, setShowHome, counter, setCounter }) => {
    const mask = (0, react_1.useRef)(null);
    const [replyValue, setReplyValue] = (0, react_1.useState)('');
    const [pageValue, setPageValue] = (0, react_1.useState)('');
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [showCaptcha, setShowCaptcha] = (0, react_1.useState)(false);
    const [recapchaToken, setRecapchaToken] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        GM_addValueChangeListener('CaptchaValue', (name, oldValue, newValue) => __awaiter(void 0, void 0, void 0, function* () {
            if (newValue) {
                setRecapchaToken(newValue);
            }
        }));
    }, []);
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
                    }, checked: user.autoRePicSw }),
                react_1.default.createElement(components_1.Toggle, { title: '在不刷新网页的情况下，定时检测是否需要执行每日任务', label: '定时每日任务', onClick: () => {
                        (0, lib_1.swDailyTask)(user);
                    }, checked: user.autoDailyTask })),
            react_1.default.createElement(components_1.Panel, { title: "\u6279\u5904\u7406" },
                react_1.default.createElement(components_1.TextArea, { label: '输入回复:', placeholder: '中文分号 ；分隔每条回帖内容，可输入论坛的富文本格式', onChange: setReplyValue, value: replyValue, rows: 2 }),
                react_1.default.createElement(components_1.Input, { label: '输入页码:', placeholder: '板块号-起始页-终止页', onChange: (e) => setPageValue(e.target.value), value: pageValue }),
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
                    } }),
                react_1.default.createElement(components_1.Button, { title: "\u670D\u52A1\u5668\u6258\u7BA1\u767B\u5F55\u8D26\u53F7\u65F6\u4F7F\u7528", text: '获取验证码', onClick: () => {
                        setShowCaptcha(true);
                        (0, reCaptcha_1.reCaptcha)();
                    } }),
                react_1.default.createElement(components_1.Button, { text: '检查更新', onClick: () => {
                        (0, lib_1.checkUpdate)(user);
                    } })),
            react_1.default.createElement("br", null),
            react_1.default.createElement(components_1.Button, { text: 'close', onClick: setShowHome }),
            react_1.default.createElement(components_1.Modal, { isShow: showCaptcha, header: react_1.default.createElement("div", { className: "flex w-80" }, "\u670D\u52A1\u5668\u6258\u7BA1\u767B\u5F55\u8D26\u53F7\u65F6\u4F7F\u7528"), footer: react_1.default.createElement("div", { className: "flex justify-evenly w-full" },
                    react_1.default.createElement(components_1.Button, { text: '刷新验证码', onClick: () => {
                            setRecapchaToken('');
                            grecaptcha.reset();
                        } }),
                    react_1.default.createElement(react_copy_to_clipboard_1.CopyToClipboard, { text: recapchaToken, onCopy: () => new lib_1.MessageBox('复制验证码成功') },
                        react_1.default.createElement(components_1.Button, { disabled: !recapchaToken, text: '复制验证码', onClick: () => '' }))), onClose: function () {
                    setShowCaptcha(false);
                } },
                react_1.default.createElement("div", { className: "w-40 h-20", id: "reCaptcha" })),
            showModal ? react_1.default.createElement(AutoClickManage_1.AutoClickManage, { user: user, onClose: () => setShowModal(false) }) : '')));
};
exports.Home = Home;


/***/ }),

/***/ 950:
/***/ ((module) => {

"use strict";
module.exports = CopyToClipboard;

/***/ }),

/***/ 583:
/***/ ((module) => {

"use strict";
module.exports = JSZip;

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
module.exports = JSON.parse('{"name":"JKForum 助手","name:en":"JKForum Helper","name:zh-TW":"JKForum 助手","name:ja":"JKForum 助手","name:ko":"JKForum 조수","namespace":"https://github.com/Eished/jkforum_helper","version":"0.8.9","description":"JKF 捷克论坛助手：自动签到、定时签到、自动感谢、自动加载原图、自动播放图片、自动支付购买主题贴、自动完成投票任务，优化浏览体验，一键批量回帖/感谢，一键打包下载帖子图片，自动识别验证码，自动现在有空，自动点击置顶广告，登录时跳过绑定手机号验证码","description:en":"JKF JKForum Helper: Auto-sign-in, timed sign-in, auto-thank you, auto-load original image, auto-play image, auto-pay to buy theme post, auto-complete voting task, optimize browsing experience, one-click bulk reply/thank you, one-click package to download post image，Skip mobile verification code when logging in","description:zh-TW":"JKF 捷克論壇助手：自動簽到、定時簽到、自動感謝、自動加載原圖、自動播放圖片、自動支付購買主題貼、自動完成投票任務，優化瀏覽體驗，一鍵批量回帖/感謝，一鍵打包下載帖子圖片，自動識別驗證碼，自動現在有空，自動點擊置頂廣告，登錄時跳過綁定手機號驗證碼","description:ja":"JKF チェコ語フォーラム助手：自動チェックイン、時限式チェックイン、オートサンキュー、オリジナル画像の自動読み込み、画像の自動再生、トピック投稿の自動支払い、ポールタスクの自動完了、ブラウジングエクスペリエンスの最適化、ワンクリックでの一括返信/サンキュー、ワンクリックでの投稿画像のパッケージダウンロード，ログイン時にモバイル認証コードをスキップ","description:ko":"JKF 체코 포럼 조수: 자동 로그인, 정기 로그인, 자동 감사, 원본 사진 자동로드, 테마 스티커 구매 자동 결제, 투표 작업 자동 완료, 최적화 된 브라우징 경험, 원 클릭 일괄 회신 / 감사, 원 클릭 포스트 사진의 패키지 다운로드 클릭다운로드하십시오，로그인 시 모바일 인증 코드 건너뛰기","author":"Eished","copyright":"Eished","license":"MIT","match":["*://*.jkforum.net/*"],"run-at":"document-idle","supportURL":"https://github.com/Eished/jkforum_helper/issues","homepage":"https://github.com/Eished/jkforum_helper","grant":["GM_getValue","GM_setValue","GM_deleteValue","GM_info","GM_xmlhttpRequest","GM_openInTab","GM_registerMenuCommand","GM_addElement","GM_addStyle","GM_notification","GM_addValueChangeListener"],"connect":["mymypic.net","jkf.iknow.fun","cdn.jsdelivr.net","github.com","greasyfork.org","jkf.hare200.com"],"require":["https://cdn.jsdelivr.net/npm/react@18.1.0/umd/react.production.min.js","https://cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.production.min.js","https://cdn.jsdelivr.net/npm/react-table@7.8.0/dist/react-table.production.min.js","https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js","https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js","https://cdn.jsdelivr.net/npm/react-copy-to-clipboard@5.1.0/build/react-copy-to-clipboard.min.js"],"icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzYwNmI3NGQtODA4Zi03YjQ3LWI4NGYtYjNlZmJiMTM4NDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3MzFDMzYyRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MzFDMzYxRUE5MzExRUJCOTU4RkY3NUMxOTY5MDdGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2MWY1NjgyLTk5OTctNDU0OS04NjIzLWZhNzY0MmVjMTM5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjNjA2Yjc0ZC04MDhmLTdiNDctYjg0Zi1iM2VmYmIxMzg0MjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5urL1nAAAJJUlEQVR42uxba2wU1xX+ZnZ2vYvX4BpDCYVA6xgKkR0wlYlJnyK1iiweVlqgGFpKK6qWAuYtQgitoYANGCTqRnJIQbQ/sJoAKsESMkrTitSQpuJhUBwVHCC21QeCgh17vevd6Tkzs+uZfXgftsevHOvT7twd35lz7rnnfufcGUGWZQxnETHMZdgbQLpy5UpfX0MgjCAkExwabBpEDT4NbkIHoZ3QRviUv/Msbff0/o1ZLBbl5npL0gkZhCkavkj4gtaeqhnArilu6aYfr2YEF6GV8EgS8J/ffh9NaSlo8PlQLwr4iNBAaBUT1YCMKtkdPTJAGuF5wrcIeYQvE0b3hQs5k4CmUmAkm9Kj3Dz/NRJuEP5CWrxDfnSVPn2KRnJsBoDNCSneKUPIJywjvEj4vBnzVCClPqXJMZL9olObVgIm0udEUqTAR8p4fbjmlfGmRcApyYI7QjRDyGo3sQZBGgP8hPAB4TyhyCzlu1VAU5CngVXCDLuEPaT4NZcHx9weTAtEoB6uAvMItYTXCc8N2HCuGYNG3+mw4ceiiL9T4PxVp5fijpCYAThYHSZUE2YOmnVN8wwyRLLDildpavyZvGFqJCOI3QS4twnFg3aB1zwiyYrnaVq82+6mQC3EZoCRhD8Rvj0kmI6sxIdxkoi3yRNmBBtBDENaThBeGFJ0TzUCe/UfPZ30KUQ2wFpC4ZDkvGQEmxXPUEwoV/I/IdQAvK7uHurc3ybhh+QFXwvnAVu1+T90hUaelkf+eEX2dTE7aKRmxaBRxBqd4EQUotJWES92+pBlFVDnN8ACwqiouTOZTxC6ruyjzCRSQYUzLb10d264/+HrWK1WtLe3h5xXd5dSRXcC2R+N/nMTlIAokgG+S65Q5//tnI5cRsThw4fl+vr6APLz8yOeW1VVZTh36tSp3fa9evVqw/l37tyRCwsLld9S7JCby8h+vyNUQn52fPR7DQciRmo/b0DuqMAV7xspgqRlcF+JxYKTJ08GKRI4Tk1NjXjulClTDOc6HI6I52ZnZ+PIkSOGc86cOYNz586FH8kE3d8iGr5PpxXhaW7KjjWxcbuNfuf1eiOe29HRETIFwondbseJEycMyt+6dQsrV65EZ2dnxOwwEWmlW5K7Eignfc1mD5jRg5DSY9m/fz9mzuxKNVpbW1FUVIQnT57E3EdBFiGHlIsSF6wUYlJHqLUnQV0VstgA0/pL+fnz52P9+vWGtjVr1uD69etx9fP1TOBnC7QCWjRxacU3dcgzJa10ZbqMHz8elZWVhraKigqcPHky7r5cHq2C2B73v07kGDCuPwzAyo8b13Xp2tpabNq0ydR7oFiSzgb4nNnKb9iwAQUFBYHjBw8eYPny5SGBs88NQMyXDZBsjrXVSTdr1izs27fP8NuqVavQ0NBgvhsKcLAB7GZcy+PxKMzu+PHjSEpKCrTv3r074nrf56mBDLuoywf6VHh527FjB7KysgJtZ8+exa5du/otpSAyZJFgwvZYW1sb5s2bh23bthnajx07ht7YnLVJmh97oydC8BmrP5IZJEiSJOzdu1dhfXopKSlBTU1NCMOMV07WAu9/Av+eQUR5heJuzjNQN+A0C5hiAJvNhrS0tJD2nJwcrF27FocOHepR/x/+S0U0+dELdE1LV21AgMm7w1evXg2ZBjt37sSkSZNMub4YZrdI0pr63AtaWlqUBOfGjRtYuHAh5syZo7SPGjUKpaWlWLp0acJ9pzsJKYi6JzjSrjtHUL9KZo3+unXrFOVZNm/ejEuXLikFFpYlS5Yoy+OFCxcS6vsX36T5/T2NDndb0IG676xvM8bFvhOmuvrvnALrpby8PCRIxuzapAWvZ9EQnEbzAiRGj53GYBZrPSBY9OTHP/cfPnwYOJ4+fTo2btyYKKHpesSiOwRNEZ8PPlG3KESVsWPHGo4fP36csEc0Nzdjz549hrbt27cjIyPDPCZIE0KMPnMQCFZc5vILV2saGxt7dAOc/t68eTNw7HQ6cfDgQTOzQRcbIKbSS2FhIdLT0wPH9+7dU9ATYQLEAVEvixYtUgolJuUCrWyA/3Y3V1nmzp2LsrIyQ9v58+d7zOBYOPKfPn3a0MbEKDnZlCT1IRvA4MdMWfnJsaqqKpw6dQqXL1/GxYsXMWbMmMA5XKs/evRor90FkyPOF/ySmZmJrVu3muEBzWyAfwbT09zcXCxevFhZn2fPnh3yj8XFxbh9+3av3Qj3FUyHt2zZYiir95E0sAHq9MvctGmRa6T379/HihUrQmp54STYhYN3ioLlwIEDhpjCZXLOFm22JPj6gqmo/PdDZoJcguVyooNTU87Z8/LyMGHCBCUeuFwu3L17V2Fu1dXVePToUUz98wjqgyb3EY0qM0XW1wvYaDa6B5+rl0tlgsIBmMTU+VPif0DdIBmQkkIE8aMS4Kl0lbZlvEy++6Dr95e/A/x6OWIri2sGoFX8Y8GW8qykMcF3B7IBgqVkAS1drV3HeV+Kh85pLNaH92wi2v3JEK9D6wa85to2Z9E3ghJ5j4Z4qDPpzLmBv5v3CDcHiwcouzttOnjim/+dXjRJImqgsyNPg3IMB5EVD3iN4msrZKMj/YGLNkNaeRp9jxeNlD5X6OsB+pn083jS48GmPPMJCn4bJAv+F3jOOOi0y7yED1XXd3fiN0lWvKmvC4Qrih4hlA01/V0evGWVUCxEeVI0kJ8QXh0Kbs+D3e7G78ntl1lEYn9ybAZg4YcmXyI0DVblabnroJHfRm7/AzKAO1zVONq+ABOkXEJlnKtt/wY7WXH5Ggp4X3VYUaZUgyOUzGPZGGkm/FQzxHHC44GotEJvucjnwTu01C20WZBPI/9BgEFGkHj2Ba4RVhF+yZUrqA9Vs1FG9JfCrJjyvpAX9aR8NTVXWS14PzDicuxdJSqTob4xxg8f50B9bS69t/V10DA1lwKp6ltjrsAbY8DfCH8lP75Omrjj0oaNY7VDGD26V990486ehvrgFYOfQH9KMwo/iut/edKmeZ+oux2vFmfcGsNvIfDGwb9tEhqX5eITZxI+5ioO6dlEo+zWvzOYyC57ksMJgZ/PMVEsOuX9O9P+LUufxkL9RjCo1OJS3T3W1wJjEZFIgfDZ2+PDXP4vwABKHSZ0zSd04wAAAABJRU5ErkJggg=="}');

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(629);
/******/ 	
/******/ })()
;