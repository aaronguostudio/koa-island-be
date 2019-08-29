const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { Flow } = require('../../models/flow')
const Auth = require('../../../middlewares/auth')

const {
  Art
} = require('../../models/art')

router.get('/latest', new Auth(8).m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })

  const art = await Art.getData(flow.art_id, flow.type)

  // dataValues will be serilized as json
  art.setDataValue('index', flow.index)
  ctx.body = art

})

module.exports = router
