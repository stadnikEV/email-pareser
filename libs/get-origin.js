const removeDirectory = require('./remove-directory')
const createDirectory = require('./create-directory')
const xlsxToJsonFile = require('./xlsx-to-json-file')
const jsonFileToObject = require('./json-file-to-object')
const removeEmpty = require('./remove-empty')
const addId = require('./add-id')
const removeBreakSymbol = require('./remove-break-symbol')


module.exports = () => {
  const promise = new Promise(async function(resolve, reject) {
    try {
      await removeDirectory({ path: './origin/origin.json' })

      console.log('Чтение Origin')

      await xlsxToJsonFile({
        input: 'origin/origin.xlsx',
        output: 'origin/origin.json',
      })

      let origin = await jsonFileToObject({ path: 'origin/origin.json' })
      origin = removeEmpty(origin)
      origin = addId(origin)
      origin = removeBreakSymbol(origin)

      await removeDirectory({ path: './origin/origin.json' })

      resolve(origin)
    }
    catch(e) {
      if (e.code === 'ENOENT') {
        reject(`Файл не найден : ${e.path}`)
        return
      }
      reject(e)
    }
  })

  return promise
}