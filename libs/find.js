const findEmail = require('./find-email')
const Block = require('./block')
const consoleProgress = require('./console-progress')



// const addToStatistic = ({ statistic, message, id, link, email }) => {
//   if (!statistic[message]) {
//     statistic[message] = []
//   }
//
//   if (email) {
//     statistic.email += 1
//   }
//
//   statistic.all += 1
//
//   const companyData = { id }
//
//   if (link) {
//     companyData.link = link
//   }
//
//   statistic[message].push(companyData)
//
//   return statistic
// }

module.exports = companies => {
  return new Promise(async function(resolve, reject) {
    const block = new Block()
    const result = []
    // let statistic = { email: 0, all: 0}
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

        consoleProgress({ message: response.status, email: response.email, id: company.id, found, lastId, firstId })

        result.push(company)
        // statistic = addToStatistic({ statistic, message: response.status, id: company.id, link: response.link, email: response.email  })

        setTimeout(() => {
          find()
        }, 1000)
      }

      catch(e) {
        if (e.errorMessage) {
          consoleProgress({ message: e.errorMessage, id: company.id, found, lastId, firstId })

          company.email = ''
          company.status = e.errorMessage
          company.link = e.link
          result.push(company)

          // statistic = addToStatistic({ statistic, message: e.errorMessage, id: company.id, link: e.link  })

          if (block.isBlock({ message: e.errorMessage })) {
            console.log('Блокировка запросов')
            const limit = -block.getLimit()
            result.splice(limit)
            statistic.all -= limit
            resolve({ searchResult: result })
            return
          }

          setTimeout(() => {
            find()
          }, 1000)

          return
        }
        reject(e)
        console.log(e)
      }
    }

    find()
  })
}