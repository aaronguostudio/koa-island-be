const Sequelize = require('sequelize')
const { db } = require('../config/config')
const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  logging: true,
  dialect: 'mysql',
  define: {
    timestamps: true,
    paranoid: true,
    understored: false
  }
})

sequelize.sync({
  force: true
})

module.exports = {
  sequelize
}
