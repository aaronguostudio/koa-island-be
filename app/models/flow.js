const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')


class Flow extends Model{

}

Flow.init({
  index: Sequelize.INTEGER,
  artId: Sequelize.INTEGER,
  type: Sequelize.INTEGER // 不同资源的类型
}, {
  sequelize,
  tableName:'flow'
})

module.exports = {
  Flow
}
