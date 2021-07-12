const fs = require('fs')
const { resolve, join } = require('path')
const ARGS = process.argv.slice(2)
const NODE_ENV = process.env.NODE_ENV

const getEntries = (path) => {
  const entries = {}
  const absPath = resolve(path)
  const dirs = fs.readdirSync(absPath)

  dirs.forEach(dir => {
    let p = join(absPath, dir)
    if (fs.statSync(p).isDirectory()) {
      p = join(p, 'index.js')
      entries[dir] = p
    }
  })

  return entries
}

// 按需打包，用户可以按需引入
if (ARGS.includes('--all') && NODE_ENV === 'production') {
  module.exports = {
    outputDir: 'dist',
    configureWebpack: {
      entry: {
        ...getEntries('./src/packages')
      },
      output: {
        filename: 'lib/[name]/index.js',
        libraryTarget: 'umd', // 打包结果
        libraryExport: 'default',
        library: ['yui', '[name]'] // 打包文件名
      },
      externals: {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        }
      }
    },
    css: {
      sourceMap: true,
      extract: {
        filename: 'css/[name]/style.css'
      }
    },
    chainWebpack: config => { // 删除默认配置
      config.optimization.delete('splitChunks')
      config.plugins.delete('copy')
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      config.plugins.delete('html')
      config.plugins.delete('hmr')
      config.entryPoints.delete('app')
    }
  }
}
