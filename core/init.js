const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRoutes()
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
}

module.exports = InitManager
