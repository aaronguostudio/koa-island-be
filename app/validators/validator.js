const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
  constructor () {
    super()

    // isInt 是一个函数名，来自于 validator.js
    this.id = [
      new Rule('isInt', '需要时正整数', {min: 1}),
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
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = {
      new Rule('isLength', '密码需要 6 - 32 个字符', {
        min: 4,
        max: 32
      }),
    }
  }
}

module.exports = {
  PositiveIntegerValidator
}
