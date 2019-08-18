const Router = require('koa-router')
const router = new Router()

router.post('/v1/:id/classic/latest', (ctx, next) => {
  console.log(ctx.params)
  console.log(ctx.request.query)
  console.log(ctx.request.header)
  console.log(ctx.request.body)
  ctx.body = {
    a : 'a'
  }
})

module.exports = router
