const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

exports.cssLoader = (...loaders) => {
  const formatLoaders = []
  formatLoaders.push('vue-style-loader')

  if (isProd) {
    formatLoaders.push({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../../'
      }
    })
  }
  loaders.forEach((loader) => {
    formatLoaders.push({
      loader: loader,
      options: {
        sourceMap: !isProd
      }
    })
  })

  return formatLoaders
}

exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

exports.assetsPath = (file) => {
  return path.posix.join('static', file)
}
