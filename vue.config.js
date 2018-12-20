// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
// const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: '/',
  outputDir: '/dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,

  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.jsx', '.vue', '.json', '.scss']

    // config.externals = {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios'
    // }

    // if (isProduction) {
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // )

    //   config.plugins.push(
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         compress: {
    //           warnings: false,
    //           drop_debugger: true,
    //           drop_console: true
    //         }
    //       },
    //       sourceMap: false,
    //       parallel: true
    //     })
    //   )
    // }
  },

  css: {
    sourceMap: true
  },

  lintOnSave: false,

  devServer: {
    disableHostCheck: true
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
  }
}
