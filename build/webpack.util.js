const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function setEntry() {
  const files = glob.sync('./src/pages/*/index.js') // 查找pages/home/index.js这样的文件，不找child下面的
  const entry = {}
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      entry[ret[1]] = {
        import: file
      }
    }
  })

  // 拆分公共js和css
  entry['common'] = {
    import: ['./src/assets/js/common.js', './src/assets/css/common.less'],
    filename: 'js/[name].js?t=[contenthash:8]'
  }

  return entry
}

function getTemplate(name) {
  const files = glob.sync(`./src/pages/${name}/index.html`) // 查找pages/home/index.index这样的文件
  if (files.length > 0) {
    return files[0]
  }
}

function setHtmlPlugin() {
  const files = glob.sync('./src/pages/*/index.js')
  const options = []
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/)
    if (ret) {
      const name = ret[1]
      let chunks = ['common', 'vendors', name]
      options.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: getTemplate(name),
        chunks: chunks,
        chunksSortMode: function (chunk1, chunk2) {
          var order = chunks;
          var order1 = order.indexOf(chunk1);
          var order2 = order.indexOf(chunk2);
          return order1 - order2;
        }
      }))
    }
  })
  return options
}

module.exports = {
  setEntry,
  setHtmlPlugin
}
