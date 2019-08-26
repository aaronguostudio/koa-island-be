const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', (ctx) => {
  ctx.body = {
    a : 'b'
  }
})

module.exports = router
