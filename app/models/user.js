const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { NotFound, AuthFailed } = require('../../core/http-exception')

class User extends Model {
  static async verifyEmailPassword (email, plainPassword) {
    const user = await User.findOne({
      where: { email }
    })
    if (!user) {
      throw new NotFound('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new AuthFailed()
    }
    return user
  }
}

// 数字类型 id 性能比较好
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 10 代表计算机生成的成本
      // 这样即使相同的密码也会生成不一样的 hash
      // 观察者模式的应用，es6 的 Reflect 就是应用了观察者模式
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = { User }
