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
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored:true,
    freezeTableName:true,
    scopes:{
      bh:{ // bh 是一个自定义的 scope 名
        attributes:{
          exclude:['updated_at','deleted_at','created_at']
        }
      }
    }
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}
