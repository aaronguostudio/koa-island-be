const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginTypes } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token

  // 根据不同的 type 做不同的处理
  switch (v.get('body.type')) {
    case LoginTypes.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginTypes.USER_MINI_PROGRAM:
      break
    default:
      throw new ParameterException('没有对应登录的处理函数')
  }

  ctx.body = { token }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, 2)
}

module.exports = router
