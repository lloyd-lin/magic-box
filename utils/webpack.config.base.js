const path = require('path');
const nodeExternals = require('webpack-node-externals');
const pkg = require(path.join(process.cwd(), 'package.json'));
const babelConfig = require('./babel.config.base')();
const cwd = process.cwd();
const frontEntry = path.join(cwd, 'src/main/homepage');
// const serviceEntry = path.join(cwd, 'lib/service');
const outputDir = path.join(cwd, 'dist');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1'
];
console.log(outputDir);
module.exports = {
  mode: 'production',
  target: 'electron-renderer',
  entry: {
    homepage: frontEntry,
    // service: serviceEntry,
  },
  output: {
    path: outputDir,
    filename: `[name].js`,
    libraryTarget: 'umd',
    library: pkg.name
  },
  devtool: '#inline-source-map',
  externals: [nodeExternals({
    whitelist: [/antd/]
  })],
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.css', '.scss','.less']
  },
  module: {
    rules: [
      {
        test: /\.jsx|tsx|js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')(),
                require('postcss-mixins')(),
                require('postcss-nested')(),
                require('postcss-cssnext')({
                  browsers: AUTOPREFIXER_BROWSERS
                })
              ],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')(),
                require('postcss-mixins')(),
                require('postcss-nested')(),
                require('postcss-cssnext')({
                  browsers: AUTOPREFIXER_BROWSERS
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader", 
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[name].[hash:12].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader?name=[name].[hash:12].[ext]&limit=25000'
      }
    ]
  }
};
