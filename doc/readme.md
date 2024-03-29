## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

`React + TypeScript + TailwindCSS`

## 项目模板

https://github.com/Eished/tampermonkey-template

## 启动项目

`ctrl shift B` 选择 `start: style & dev`

VSCode Task See https://go.microsoft.com/fwlink/?LinkId=733558

在浏览器油猴插件新建脚本，`jkforum.dev.user.js` 复制油猴**头文件**并加入：

```javascript
// @require       file://<你的文件路径>/jkforum_helper\dist\jkforum.dev.user.js
```

### TailwindCSS 样式与源网站冲突

使用 loadStyle 函数过滤掉冲突的样式，再用 GM_addStyle 插入样式

## 在本地调试脚本

油猴头文件加入 `// @match http://localhost:8080/*`

`start: style & dev` 启动项目，然后 `yarn start`

把目标网站的静态 `html` 文件复制到 `public` 文件夹下，插入到 `index.html` 即可本地调试脚本静态功能。

- `yarn start` devServer 提供 web 服务和网页热刷新功能

- `start: style & dev` 生成脚本，让 tampermonkey 使用

## 发布项目

`yarn build`

生成文件文件：`jkforum_helper\dist\jkforum.user.js`

## 参考项目及其文档

https://github.com/Eished/tampermonkey-template

https://bilibili-evolved-doc.vercel.app/developer
