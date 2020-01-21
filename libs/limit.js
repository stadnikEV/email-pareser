const config = require('../config')
const getLimitName = require('./get-limit-name')

class Limit {
  constructor() {
    this.limitLink = config.limitNotFoundLink
    this.limitRequest = config.LimitBadRequest

    this.limitCount = 0
  }

  isLimit({ errorMessage }) {
    const limitName = getLimitName(errorMessage)

    if (!limitName || limitName !== this.lastLiminName) {
      this.limitCount = 0
      this.lastLiminName = limitName
      return {}
    }

    this.limitCount += 1

    if (config[limitName] === this.limitCount) {
      this.limitCount = 0
      return {
        limitMessage: `Блокировка: ${config.limitNames[limitName]}`,
        limitCount: config[limitName],
      }
    }

    return {}
  }
}

module.exports = Limit