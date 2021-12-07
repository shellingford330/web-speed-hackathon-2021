module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'auto',
        targets: 'last 1 Chrome version',
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: true,
      },
    ],
  ],
  plugins: ['lodash']
};
