const fs = require("fs")
const removeDirectory = require('./remove-directory')
const emailParse = require('./email-parse')


const getStatus = companies => {
  return companies.reduce((result, item) => {
    if (!result[item.status]) {
      result[item.status] = []
    }
    result[item.status].push({
      id: item.id,
      link: item.link,
    })

    return result
  }, {})
}


const getFinded = companies => {
  return companies.reduce((sum, item) => {
    const email = emailParse(item.email.toString())
    if (email) {
      return sum + 1
    }
    return sum
  }, 0)
}


const getStatusStatistic = ({ status, all }) => {
  const statusNames = Object.keys(status)
  let text = ''

  statusNames.forEach(statusName => {
    text += `${statusName}: ${parseInt(( status[statusName].length / all ) * 100)}%\n`
  })

  return text
}


const getMainStatistic = ({ companies, statusStatistic, all }) => {
  const finded = getFinded(companies)
  let text = `Найдено: ${finded} из ${all}\n`
  text += `Найдено в процентном соотношении: ${parseInt((finded / all) * 100)}%\n\n`
  text += statusStatistic
  return text
}



module.exports = ({ path, companies }) => {
  const promise = new Promise(async function(resolve, reject) {
    const all = companies.length
    const status = getStatus(companies)
    const statusStatistic = getStatusStatistic({ status, all })

    let result = getMainStatistic({ companies, statusStatistic, all })

    const statusNames = Object.keys(status)

    result = statusNames.reduce((result, statusName) => {
      result += `\n\n${statusName}`
      status[statusName].forEach((status) => {
        result += `\n${status.id}  ${status.link}`
      })

      return result
    }, result)


    await removeDirectory({ path })

    fs.writeFile(path, result, function(err){
        if(err)  {
          reject(err)
          return
        }
        resolve()
    })
  })

  return promise
}
