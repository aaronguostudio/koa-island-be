const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginTypes } = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
  constructor () {
    super()

    // isInt 是一个函数名，来自于 validator.js
    this.id = [
      new Rule('isInt', '需要是正整数', {min: 1}),
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor () {
    super()

    this.email = [
      new Rule('isEmail', 'Email 格式不正确')
    ]
    this.password1 = [
      new Rule('isLength', '密码需要 6 - 32 个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]') // 这个验证规则有点问题，必须字母在前
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度', {
        min: 4,
        max: 32
      }),
    ]
  }

  validatePassword (vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

  async validateEmail (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('email 已存在')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor () {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]

    // from web, account + secret
    // from wechat, wechat account
    // 1. 可以为空，可以不传
    // 2. 也可以不为空
    // isOptional 如果不传，会 pass, 如果传了。要符合后面的验证
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType (vals) {
    if (!vals.body.type) {
      throw new Error('type 是必须参数')
    }
    if (!LoginTypes.isThisType(vals.body.type)) {
      throw new Error('type 参数不合法')
    }
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor () {
    super()
    this.validateType = checkType
  }
}

function checkType (vals) {
  if (!vals.body.type) {
    throw new Error('type是必须参数')
  }
  if (!LoginTypes.isThisType(vals.body.type)) {
    throw new Error('type 参数不合法')
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  LikeValidator
}
