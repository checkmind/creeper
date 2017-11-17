var path = require('path')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
    /*  代码风格
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader:'babel-loader'
        }]
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader?-autoprefixer"
            },{
              loader: 'postcss-loader'
            },{
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
    plugins: [
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css'),
        // set the following option to `true` if you want to extract CSS from
        // codesplit chunks into this main css file as well.
        // This will result in *all* of your app's CSS being loaded upfront.
        allChunks: false,
    })
      
    ]
}
