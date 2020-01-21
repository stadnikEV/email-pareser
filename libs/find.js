const config = require('../config')
const findEmail = require('./find-email')
const Limit = require('./limit')
const consoleProgress = require('./console-progress')
const proxy = require('./proxy.js')
const saveResult = require('./save-result.js')


module.exports = origin => {
  return new Promise(async function(resolve, reject) {
    let companies = origin
    const limit = new Limit()
    const result = []
    let company = null

    const lastId = companies[0].id
    const firstId = companies[companies.length - 1].id

    let found = 0

    async function find() {
      try {
        if (companies.length === 0) {
          resolve({ searchResult: result })
          return
        }

        company = companies.pop()
        const response = await findEmail(company.site)
        found += 1

        company.email = response.email
        company.status = response.status
        company.link = response.link
        company.proxy = proxy.get() || ''

        consoleProgress({ message: response.status, email: response.email, id: company.id, found, lastId, firstId })

        result.push(company)

        await saveResult({ companies: result })

        setTimeout(() => {
          proxy.countStep()
          find()
        }, config.timeoutParsing)
      }

      catch(e) {
        if (e.errorMessage) {
          consoleProgress({ message: e.errorMessage, id: company.id, found, lastId, firstId })

          company.email = ''
          company.status = e.errorMessage
          company.link = e.link
          company.proxy = proxy.get() || ''
          result.push(company)

          if (e.errorMessage === 'Прокси закончились') {
            result.pop()
            resolve({ searchResult: result })
            return
          }

          const { limitMessage, limitCount } = limit.isLimit({ errorMessage: e.errorMessage })

          if (limitMessage) {
            consoleProgress({ message: limitMessage, id: company.id, found, lastId, firstId })
            const limitValue = -limitCount
            const removed = result.splice(limitValue)

            if (!proxy.isInit()) {
              resolve({ searchResult: result })
              return
            }

            companies = [].concat(companies, removed.reverse())

            proxy.next()
          }

          if (result.length !== 0) {
            await saveResult({ companies: result })
          }

          setTimeout(() => {
            proxy.countStep()
            find()
          }, config.timeoutParsing)

          return
        }

        reject(e)
        console.log(e)
      }
    }

    find()
  })
}