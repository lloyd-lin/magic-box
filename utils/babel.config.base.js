
module.exports = function () {
  return {
    presets: [
      require.resolve('@babel/preset-env'), 
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime", 
    ]

  }
}