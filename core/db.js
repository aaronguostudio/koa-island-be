const Sequelize = require('sequelize')
const { db } = require('../config/config')
const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  logging: true,
  dialect: 'mysql',
  define: {}
})

sequelize.sync()

module.exports = {
  sequelize
}
