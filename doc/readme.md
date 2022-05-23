## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

`React + TypeScript + TailwindCSS`

## 启动项目

`ctrl shift B` 选择 `start: style & dev`

VSCode Task See https://go.microsoft.com/fwlink/?LinkId=733558

在浏览器油猴插件新建脚本，`jkforum.dev.user.js` 复制油猴头文件并加入一行：

```javascript
// @require       file://<你的文件路径>/jkforum_helper\dist\jkforum.dev.user.js
```

### TailwindCSS 样式与源网站冲突

使用 loadStyle 函数过滤掉冲突的样式，再用 GM_addStyle 插入样式

## 发布项目

`yarn build`

生成文件文件：`jkforum_helper\dist\jkforum.user.js`

### splitchunks 拆包，减小发布体积

> 生成主文件发布，生成的 module 文件使用 `@require` 从自己代码库的 CDN 导入
>
> 实测提示：Code 使用了一个未经批准的外部脚本，无法发布。

## 适应其它网站

修改油猴头文件 `src/common.meta.json` 的 `"match": "*://*.xxx.com/*",`

## 参考项目及其文档

https://bilibili-evolved-doc.vercel.app/developer
