## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

`React + TypeScript + TailwindCSS`

## 启动项目

`ctrl shift B` 选择 `start:dev`

VSCode Task See https://go.microsoft.com/fwlink/?LinkId=733558

在浏览器油猴插件新建脚本，`jkforum.dev.user.js` 复制油猴头文件并加入一行：

```javascript
// @require       file://<你的文件路径>/jkforum_helper\dist\jkforum.dev.user.js
```

## 发布项目

`yarn build` Or `ctrl shift B` 选择 `npm:build`

生成文件文件：`jkforum_helper\dist\jkforum.user.js`

## 适应其它网站

修改油猴头文件 `src/common.meta.json` 的 `"match": "*://*.xxx.com/*",`

## 参考项目及其文档

https://bilibili-evolved-doc.vercel.app/developer
