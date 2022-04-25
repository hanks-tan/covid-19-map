const webpack = require('webpack')
const path = require('path')
const ComppressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { buildDate } = require('./version')
process.env.VUE_APP_VERSION = buildDate

module.exports = {
  // publicPath: process.env.VUE_APP_ROOT ? '/covid/' : '/',
  publicPath: '/covid/',
  // publicPath: '/', // github部署跟目录
  outputDir: 'docs', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'assets', // 放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: { // pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: { // 除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
      title: '新冠疫情地图', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index', 'element-ui'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
    // subpage: 'src/subpage/main.js'// 官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },
  lintOnSave: true, // 是否在保存的时候检查
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production', // 生产环境是否生成 sourceMap 文件
  css: {
    requireModuleExtension: false,
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {} // css预设器配置项
  },
  devServer: { // 环境配置
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: true,
    open: true, // 配置自动启动浏览器
    before (app) {
    }
  },
  pluginOptions: {// 第三方插件配置
    // ...
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        utils: path.resolve(__dirname, 'src/utils/'),
        comps: path.resolve(__dirname, 'src/components/')
      }
    },
    plugins: [
      new ComppressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css)$/, // 匹配文件名
        threshold: 10000, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
        minRatio: 0.8
      }),
      new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ],
    externals: {
      'element-ui': 'ELEMENT',
      vue: 'Vue',
      'vue-router': 'VueRouter'
    }
  },
  chainWebpack: (config) => {
    config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all',
      automaticNameDelimiter: '_',
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        // element: {
        //   chunks: 'all',
        //   name: 'element-ui',
        //   test: /[\\/]element-ui[\\/]/,
        //   priority: 0
        // },
        echarts: {
          chunks: 'all',
          name: 'chart',
          test: /[\\/]echarts[\\/]/,
          priority: 0
        }
        // time: {
        //   chunks: 'all',
        //   name: 'moment',
        //   test: /[\\/]moment[\\/]/,
        //   priority: 0
        // },
        // map: {
        //   chunks: 'all',
        //   name: 'map',
        //   test: /[\\/]ol[\\/]/,
        //   priority: 0
        // }
      }
    })
  }
}
