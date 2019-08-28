const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { Movie, Music, Sentence } = require('../../models/flow')
const { Flow } = require('../../models/flow')
const Auth = require('../../../middlewares/auth')

router.get('/latest', new Auth(9).m, async (ctx, next) => {
  const flow = Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })

  ctx.body = flow

})

module.exports = router
