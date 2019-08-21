const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRoutes()
    InitManager.loadConfig()
    // InitManager.loadHttpException()
  }

  static initLoadRoutes () {
    const apiDir = `${process.cwd()}/app/api`
    requireDirectory(module, apiDir, { visit: whenLoadModule })
    function whenLoadModule (obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  // 挂载到全局变量，不推荐，增加了和系统的耦合性
  // static loadHttpException () {
  //   const errors = require('./http-exception')
  //   global.errs = errors
  // }
}

module.exports = InitManager
