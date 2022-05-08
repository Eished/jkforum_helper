import App from '@/app';
import { getUserName, MessageBox } from '@/lib';
import '@/utils/loadStyle';
import React from 'react';
import { createRoot } from 'react-dom/client';

const username = getUserName();
if (username) {
  // 初始化消息盒子
  MessageBox.generate();

  // 添加根元素
  const rootDiv = document.createElement('div');
  rootDiv.id = 'jkforum-helper';
  document.body.prepend(rootDiv);

  const root = createRoot(rootDiv); // createRoot(container!) if you use TypeScript
  root.render(<App username={username} />);
}
