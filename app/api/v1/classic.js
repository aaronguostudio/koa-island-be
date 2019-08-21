const Router = require('koa-router')
const router = new Router()
const { ParameterException, HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', (ctx, next) => {
  // console.log(ctx.params)
  // console.log(ctx.request.query)
  // console.log(ctx.request.header)
  // console.log(ctx.request.body)

  // validator 不仅做验证，同时还存储了通过校验的参数
  const v = new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')  // v.get('path.id', parsed=false) 将不会做类型转换

  ctx.body = {
    a : 'a'
  }

})

module.exports = router
