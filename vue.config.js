var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'admin.html',
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('base', resolve('src/base')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
