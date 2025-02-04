const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineCSSPlugin = require('html-inline-css-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
  },
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: [
      path.resolve(SRC_PATH, './index.css'),
      path.resolve(SRC_PATH, './buildinfo.js'),
      path.resolve(SRC_PATH, './index.jsx'),
    ],
    webfont: path.resolve(SRC_PATH, './styles/webfont.css')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    filename: 'scripts/[name].js',
    path: DIST_PATH,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(SRC_PATH, './index.html'),
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlInlineCSSPlugin({
      filter: (filename) => ['index.html', 'webfont'].some(name => filename.includes(name)),
    }),
    new RemoveEmptyScriptsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
      bluebird: path.resolve(SRC_PATH, './misc/promise.js'),
    }
  },
};

module.exports = config;
