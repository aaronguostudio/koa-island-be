const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const { Forbbiden } = require('../core/http-exception')

// token 检测
// 使用 HttpBasicAuth 传递参数, basic auth 在 postman
// 里面填在用户名那里，postman basic auth 做加密
class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPPER_ADMIN = 32
  }

  get m () {
    return async (ctx, next) => {
      // ctx.req 获取的是 node 的 request 对象
      // ctx.request 获取的是 koa 封装的 request 对象
      let errMsg = 'token 不合法'

      // 没有 token
      const userToken = basicAuth(ctx.req)
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }

      let decode
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (err) {
        // token 过期
        if (err.name === 'TokenExpiredError') {
          errMsg = 'token 已过期'
        }

        // token 不合法
        throw new Forbbiden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }
}

module.exports = Auth
