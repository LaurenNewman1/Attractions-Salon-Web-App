export default {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 2,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
  ],
};
