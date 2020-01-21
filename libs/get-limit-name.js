const config = require('../config')

module.exports = message => {
  const { limitNames } = config

  const names = Object.keys(limitNames)

  const limitName = names.reduce((result, name) => {
    if (limitNames[name] === message) {
      return name
    }
    return result
  }, null)

  return limitName
}