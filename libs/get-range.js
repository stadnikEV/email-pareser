const getIndex = require('./get-index')
const config = require('../config')

module.exports = ({ origin, result, isContinue }) => {
  const lastId = (isContinue)
    ? result[result.length - 1].id
    : 2

  const startIndex = isContinue ? getIndex(lastId) + 1 : 0
  let endIndex = startIndex + config.rangeParsing
  endIndex = (startIndex + config.rangeParsing > origin.length - 1) ? origin.length - 1 : endIndex

  return { startIndex, endIndex }
}