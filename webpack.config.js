module.exports = {
  mode: 'development',
  devServer: {
    static: './dist',
  },
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
  ],
};
