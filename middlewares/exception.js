const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const requestUrl = `${ctx.method} ${ctx.path}`
    if (err instanceof HttpException) {
      ctx.status = err.code
      ctx.body = {
        msg: err.msg,
        errorCode: err.errorCode,
        request: requestUrl
      }
    } else {
      if (global.config.env === 'dev') {
        throw err
      }
      ctx.body = {
        msg: '未知异常',
        errorCode: 999,
        request: requestUrl
      }
    }
  }
}

module.exports = catchError
