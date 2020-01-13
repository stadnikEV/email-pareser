const getOrigin = require('./libs/get-origin')
const getResult = require('./libs/get-result')
const askContinue = require('./libs/ask-continue')
const getRange = require('./libs/get-range')
const askId = require('./libs/ask-id')
const find = require('./libs/find')
const saveResult = require('./libs/save-result.js')

console.log('\033[2J')

async function emailParser() {
  try {
    let origin = await getOrigin()
    let result = []

    let isContinue = await askContinue()

    if (isContinue) {
      result = await getResult()
    }

    let { startIndex, endIndex } = getRange({ origin, result, isContinue })

    startIndex = await askId({ message: 'Начальная позиция: ', index: startIndex })
    endIndex = await askId({ message: 'Конечная позиция: ', index: endIndex })

    origin = origin
      .slice(startIndex, endIndex + 1)
      .reverse()

    const { searchResult } = await find(origin)

    result = [].concat(result, searchResult)

    await saveResult({ companies: result })

    console.log('Данные сохранены')
  }
  catch(e) {
    console.log(e)
  }
}

emailParser()
