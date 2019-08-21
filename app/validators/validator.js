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

module.exports = {
  PositiveIntegerValidator
}
