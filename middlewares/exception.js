const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {

    if (err instanceof HttpException) {
      ctx.status = err.code
      ctx.body = {
        msg: err.msg,
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
