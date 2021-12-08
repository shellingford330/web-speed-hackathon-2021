const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const SRC_PATH = path.resolve(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, './dist');

/** @type {import('webpack').Configuration} */
const config = {
  devtool: 'source-map',
  externals: [
    nodeExternals({
      additionalModuleDirs: [path.resolve(__dirname, '../node_modules')],
    }),
    /seeds[\\/].*\json$/,
  ],
  externalsPresets: { node: true },
  externalsType: 'commonjs',
  mode: 'none',
  entry: path.resolve(SRC_PATH, './index.js'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: DIST_PATH,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: 'production',
    }),
  ],
  target: 'node',
  resolve: {
    extensions: ['.js'],
  },
};

module.exports = config;
