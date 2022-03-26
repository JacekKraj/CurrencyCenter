const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: '/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
      {
        test: /\.s?css$/i,
        use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: '' } }, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' }), new Dotenv()],
  devServer: {
    static: './dist',
  },
};
