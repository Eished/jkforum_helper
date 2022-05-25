const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonMeta = require('./src/common.meta.json');

const year = new Date().getFullYear();
const getBanner = (meta) => `// ==UserScript==\n${Object.entries(Object.assign(meta, commonMeta))
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((item) => `// @${key.padEnd(20, ' ')}${item}`).join('\n');
    }
    return `// @${key.padEnd(20, ' ')}${value.replace(/\[year\]/g, year)}`;
  })
  .join('\n')}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`;

const relativePath = (p) => path.join(process.cwd(), p);
const src = relativePath('src');

module.exports = (env) => {
  console.log(env);
  const options = {
    entry: './src/index.tsx',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: env.production ? 'jkforum.user.js' : 'jkforum.dev.user.js',
      publicPath: '/',
    },
    externals: {},
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // 预设：指示babel做怎么样的兼容性处理。
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      corejs: {
                        version: 3,
                      }, // 按需加载
                      useBuiltIns: 'usage',
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          include: [src],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: /node_modules/,
        },
        {
          test: /\.css$/,
          // 使用哪些 loader 进行处理
          use: [
            // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
            // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
            // GM_addStyle 不需要 style-loader
            // 'style-loader',
            'to-string-loader',
            // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
            // esModule: false 可以 toString()
            {
              loader: 'css-loader',
              options: {
                esModule: false,
              },
            },
          ],
          include: [src],
        },
        {
          test: /\.less$/,
          // 使用哪些 loader 进行处理
          use: [
            // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
            // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
            'style-loader',
            // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
            },
          },
          extractComments: false,
        }),
      ],
      // 单独打包react 和 react-dom file-saver jszip
      // greasyfork 无法引入私人库
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/](react|react-dom|file-saver|jszip)[\\/]/,
      //       name: 'vendor',
      //       chunks: 'all',
      //     },
      //   },
      // },
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@': src,
      },
    },
    mode: env.production ? 'production' : 'development',
    // devtool: 'source-map',
    plugins: [
      new webpack.BannerPlugin({
        banner: getBanner({ name: env.production ? 'JKForum 助手' : 'JKForum 助手-dev' }),
        raw: true,
        entryOnly: true,
      }),
    ],
  };

  if (!env.production) {
    options.devServer = {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8080,
      hot: true,
      open: true,
      watchFiles: ['src/**/*.tsx'], // 无效
    };
    // 插入打包后的 JavaScript 通过油猴插入，不需要此插件。但 public 文件夹下需要手动创建 index.html
    // options.plugins.push(
    //   new HtmlWebpackPlugin({
    //     template: './public/index.html',
    //   })
    // );
  }

  return options;
};
