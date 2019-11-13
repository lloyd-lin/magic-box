
module.exports = function () {
  return {
    sourceType: 'unambiguous',
    presets: [
      require.resolve('@babel/preset-env'), 
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      ["css-modules-transform"],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/transform-runtime"],
      ["import", { "libraryName": "antd", "style": true}],
      // ["import", { "libraryName": "antd", "style": "css" }]
    ]

  }
}