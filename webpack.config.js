const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  return {
    entry: './src/index.tsx',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: env.production ? '[name].jkforum.user.js' : '[name].jkforum.dev.user.js',
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
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(less)$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
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
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|file-saver|jszip)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@': relativePath('src'),
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
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };
};
