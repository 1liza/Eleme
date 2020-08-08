const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  devServer: {
    before (app) {
      // 这里的app相当于express
      var appData = require('./data.json')
      var seller = appData.seller
      var goods = appData.goods
      var ratings = appData.ratings
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: seller
        })
      })
      // app is the express instance that the dev server uses
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  configureWebpack: {
       plugins: [
         new CompressionPlugin({
           test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
           threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
           deleteOriginalAssets: false // 是否删除原文件
         })
       ],
      externals: {
        'vue': 'Vue',
        // 'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'better-scroll': 'BScroll'
      }
  }
  // chainWebpack(config) {
  //   // 配置相对路径
  //   config.resolve.alias
  //     .set('components', resolve('src/components'))
  //     .set('common', resolve('src/common'))
  //     .set('api', resolve('src/api'))
  //   // ContextReplacementPlugin 配置
  //   config.plugin('context')
  //     .use(webpack.ContextReplacementPlugin,
  //       [/moment[/\\]locale$/, /zh-cn/])
  // },
  // baseUrl: ''
}
