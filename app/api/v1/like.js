const Router = require('koa-router')
const { LikeValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')

const Auth = require('../../../middlewares/auth')
const { Favor } = require('../../models/favor')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id' // 使用别名做验证 art_id, 因为要校验的是 art_id 而不是 id
  })
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

router.post('/cancel', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

module.exports = router
