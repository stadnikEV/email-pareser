const needle = require('needle')

const request = url => {
  return new Promise((resolve, reject) => {
    needle.get(url, (err, response) => {
      if (err) {
        reject(err)
        return
      }

      resolve(response)
    })
  })
}

module.exports = url => {
  return new Promise((resolve, reject) => {
    let numberRequest = 0

    async function getHTML(url) {
      try {
        if (numberRequest === 5) {
          throw({ errorMessage: 'Превышен лимит редиректов' })
          return
        }

        numberRequest += 1
        const response = await request(url)
        const { location } = response.headers

        if (location) {
          getHTML(location)
          return
        }

        if (typeof response.body !== 'string') {
          throw({ errorMessage: 'Тело ответа не строка', link: url })
          return
        }

        if (response.body === '') {
          throw({ errorMessage: 'Ресурс не найден', link: url })
          return
        }

        resolve({
          html: response.body,
          url: url.replace(/\/$/, ''),
        })
      }
      catch(e) {
        if (!e.errorMessage) {
          reject({ errorMessage: 'Ошибка запроса', link: url })
          return
        }
        reject(e)
      }
    }

    getHTML(url)
  })
}