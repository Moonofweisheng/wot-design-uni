const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { versionWriter, sitemapWriter } = require('./file-writer')
const isProd = process.env.NODE_ENV === 'production'
let outputConfig

sitemapWriter()
versionWriter()

const webpackConf = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader.js')
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.yml$/,
        loader: 'yml-loader'
      },
      {
        test: /\.css$/,
        use: utils.cssLoader('css-loader', 'postcss-loader')
      },
      {
        test: /\.scss$/,
        use: utils.cssLoader('css-loader', 'postcss-loader', 'sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: utils.assetsPath('img/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  devtool: isProd ? false : 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md', '.xml'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'prod' : 'dev')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: isProd ? path.resolve(__dirname, '../dist/index.html') : 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      favicon: path.resolve(__dirname, '../favicon.ico')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: utils.assetsPath('public'),
        toType: 'dir',
        ignore: ['.DS_Store']
      },
      {
        from: path.resolve(__dirname, '../sitemap.xml'),
        to: utils.assetsPath('../sitemap.xml')
      }
    ])
  ]
}

if (!isProd) {
  const devWebpackConf = merge(webpackConf, {
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [{ from: /.*/, to: 'index.html' }]
      },
      hot: true,
      contentBase: false,
      compress: true,
      port: 8070,
      overlay: {
        warnings: false,
        errors: true
      },
      open: true,
      quiet: true,
      disableHostCheck: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
  outputConfig = new Promise((resolve, reject) => {
    portfinder.basePort = 8070
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        process.env.PORT = port
        devWebpackConf.devServer.port = port

        devWebpackConf.plugins.push(new FriendlyErrorsPlugin())

        resolve(devWebpackConf)
      }
    })
  })
} else {
  outputConfig = merge(webpackConf, {
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../dist'),
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
      })
    ]
  })
}

module.exports = outputConfig
