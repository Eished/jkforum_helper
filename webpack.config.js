const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonMeta = require('./src/common.meta.json');

const year = new Date().getFullYear();
const getBanner = (meta) => `// ==UserScript==\n${Object.entries(Object.assign(commonMeta, meta))
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
  const PRODUCTION = env.production;
  const banner = {};
  if (!PRODUCTION) {
    banner.name = 'JKForum 助手-dev';
    banner['name:zh-TW'] = 'JKForum 助手-dev';
    banner.namespace = 'jkforum-helper-dev';
    commonMeta.require = 'file://\\\\wsl$\\Ubuntu-20.04\\home\\eis\\web\\jkforum_helper\\dist\\jkforum.dev.user.js';
    commonMeta.grant.push('GM_addValueChangeListener');
    commonMeta.match.push('*://*.localhost/*');
  }
  const options = {
    entry: './src/index.tsx',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: PRODUCTION ? 'jkforum.user.js' : 'jkforum.dev.user.js',
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
          use: [
            'style-loader',
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
      minimize: false,
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
    mode: PRODUCTION ? 'production' : 'development',
    // devtool: 'source-map', // 严重影响打包速度
    plugins: [
      new webpack.BannerPlugin({
        banner: getBanner(banner),
        raw: true,
        entryOnly: true,
      }),
      new webpack.DefinePlugin({
        PRODUCTION,
      }),
    ],
  };

  if (!PRODUCTION) {
    options.devServer = {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8080,
      hot: true,
      open: true,
    };
    options.plugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html',
      })
    );
  } else {
    options.externals = {
      'file-saver': 'saveAs',
      jszip: 'JSZip',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-table': 'ReactTable',
      'react-copy-to-clipboard': 'CopyToClipboard',
    };
  }

  return options;
};
