// 开发环境相关工具函数，请勿删除本文件

/**
 * 判断运行环境，阻止 webpack 重复注入 js 代码
 */
export const isTampermonkey = () => {
  let tampermonkey = true;
  try {
    GM_info;
  } catch (err) {
    tampermonkey = false;
  }
  return tampermonkey;
};

/**
 * 提供在线调试热刷新
 */
export const hotReload = () => {
  if (window.location.host == 'localhost' || window.location.host == '127.0.0.1') {
    const oldRefresh = GM_getValue('refresh');
    GM_setValue('refresh', !oldRefresh);
  } else {
    const callback = (name: string, oldValue: boolean, newValue: boolean, remote: boolean) => {
      if (remote) {
        window.location.reload();
      }
    };
    GM_addValueChangeListener('refresh', callback);
  }
};
