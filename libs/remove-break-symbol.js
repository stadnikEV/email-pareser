
module.exports = companies => {
  return companies.map((company) => {
    Object.keys(company).forEach((fieldName) => {
      let str = company[fieldName].toString()

      if (fieldName === 'site') {
        return
      }

      str = str.replace(/\r\n/g, ' ')
      str = str.replace(/\r/g, ' ')
      str = str.replace(/\n/g, ' ')

      company[fieldName] = str
    })

    return company
  })
}