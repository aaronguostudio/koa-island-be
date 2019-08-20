const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRoutes()
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

  // 挂载到全局变量，不推荐，增加了和系统的耦合性
  // static loadHttpException () {
  //   const errors = require('./http-exception')
  //   global.errs = errors
  // }
}

module.exports = InitManager
