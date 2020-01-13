const removeDirectory = require('./remove-directory')
const createDirectory = require('./create-directory')
const xlsxToJsonFile = require('./xlsx-to-json-file')
const jsonFileToObject = require('./json-file-to-object')
const removeEmpty = require('./remove-empty')

module.exports = () => {
  const promise = new Promise(async function(resolve, reject) {
    try {
      await removeDirectory({ path: './result/result.json' })

      console.log('Чтение Result')

      await xlsxToJsonFile({
        input: 'result/result.xlsx',
        output: 'result/result.json',
      })

      let result = await jsonFileToObject({ path: 'result/result.json' })
      result = removeEmpty(result)

      await removeDirectory({ path: './result/result.json' })

      resolve(result)
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