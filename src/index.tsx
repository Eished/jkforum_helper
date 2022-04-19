import React from 'react';
import { createRoot } from 'react-dom/client';
// import '@/lib/loadStyle';
import './input.css';
import App from '@/app';
import { MessageBox } from './lib/message';
console.log('test');

// 初始化消息盒子
MessageBox.genMessageBox();

// 添加根元素
const rootDiv = document.createElement('div');
rootDiv.id = 'jkforum-helper';
document.body.prepend(rootDiv);

const root = createRoot(rootDiv); // createRoot(container!) if you use TypeScript
root.render(<App />);
