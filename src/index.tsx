import App from '@/app';
import { getUserName, MessageBox } from '@/lib';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { isTampermonkey } from './utils/environment';

const start = () => {
  const username = getUserName();
  if (username) {
    import('@/utils/loadStyle');

    // 初始化消息盒子
    MessageBox.generate();

    // 添加根元素
    const rootDiv = document.createElement('div');
    rootDiv.id = 'jkforum-helper';
    document.body.prepend(rootDiv);

    const root = createRoot(rootDiv); // createRoot(container!) if you use TypeScript
    root.render(<App username={username} />);
  }
};

if (PRODUCTION) {
  start();
} else {
  // 本地开发时注入页面的js，设置为只在油猴环境运行。
  // 开启压缩后 webpack 在生产环境构建会把这部分代码删掉。
  if (isTampermonkey()) {
    start();
  }
}
