class HttpException extends Error {
  constructor (msg='服务器异常', errorCode=10000, code=400) {
    super()
    this.code = code
    this.errorCode = errorCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 400
    this.errorCode = errorCode || 10000
    this.msg = msg || '参数错误'
  }
}

class NotFound extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 404
    this.errorCode = errorCode || 10000
    this.msg = msg || '资源未找到'
  }
}

class Success extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'OK'
    this.errorCode = errorCode || 0
  }
}

class AuthFailed extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
    this.code = 401
  }
}

class Forbbiden extends HttpException {
  constructor (msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 401
  }
}

class LikeError extends HttpException {
  constructor (msg, error_code) {
    super()
    this.code = 400
    this.msg = "你已经点赞过"
    this.error_code = 60001
  }
}

class DislikeError extends HttpException {
    constructor(msg, error_code) {
        super()
        this.code = 400
        this.msg = "你已取消点赞"
        this.error_code = 60002
    }
}

module.exports = {
  AuthFailed,
  Forbbiden,
  HttpException,
  NotFound,
  ParameterException,
  Success,
  LikeError,
  DislikeError
}
