const getIndex = require('./get-index')

module.exports = ({ origin, result, isContinue }) => {
  const lastId = (isContinue)
    ? result[result.length - 1].id
    : 2

  const startIndex = isContinue ? getIndex(lastId) + 1 : 0
  let endIndex = startIndex + 150
  endIndex = (startIndex + 150 > origin.length - 1) ? origin.length - 1 : endIndex

  return { startIndex, endIndex }
}