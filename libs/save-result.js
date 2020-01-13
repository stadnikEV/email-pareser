const saveToXlsx = require('./save-to-xlsx')
const getFieldNames = require('./get-field-names')
const saveStatistic = require('./save-statistic')

module.exports = ({ companies }) => {
  return new Promise(async function(resolve, reject) {
    if (companies.length === 0) {
      reject('Отсутствуют данные для сохранения')
      return
    }

    try {
      await saveToXlsx({
        fields: getFieldNames(companies),
        data: companies,
        path: 'result/result.xlsx',
      })
      await saveStatistic({ path: 'result/statistic.txt',  companies })
      resolve()
    } catch(e) {
      reject(e)
    }
  })
}