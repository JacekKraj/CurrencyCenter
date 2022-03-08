const plugins = [['@babel/plugin-transform-runtime', { regenerator: true }]];

if (process.env.env === 'dev') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
  plugins,
};
