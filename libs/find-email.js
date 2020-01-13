const needle = require('needle')
const getEmail = require('./get-email')
const requestHtml = require('./request-html')
const getLinks = require('./get-links')


module.exports = site => {
  return new Promise(async function(resolve, reject) {
    let url = null
    let email = null

    try {
      let links = []

      async function getEmailFromLink() {
        try {
          const link = links.href.pop()

          const response = await requestHtml(`${url}/${link}`)

          email = await getEmail({ html: response.html, url })

          if (email.length !== 0) {
            if (links.contacts) {
              resolve({ email, status: 'Email найден на странице контакты', link: `${url}/${link}` })
              return
            }
            resolve({ email, status: 'Email найден по ссылке', link: `${url}/${link}` })
            return
          }

          if (links.href.length === 0) {
            if (links.contacts) {
              throw({ errorMessage: 'Email не найден на странице контакты', link: `${url}/${link}` })
              return
            }
            throw({ errorMessage: 'Email не найден', link: url })
            return
          }

          if (email.length === 0) {
            getEmailFromLink()
            return
          }
        }
        catch(e) {
          if (e.errorMessage) {
            if (links.href.length !== 0) {
              getEmailFromLink()
              return
            }
            reject({ errorMessage: 'Email не найден', link: url })
            return
          }
          reject(e)
        }
      }


      const response = await requestHtml(site)

      url = response.url
      email = await getEmail({ html: response.html, url })

      if (email.length === 0) {
        links = getLinks({ html: response.html, url })

        if (links.href.length === 0) {
          throw({ errorMessage: 'Ссылок нет, возможно ЗАЩИТА или SPA', link: url })
          return
        }

        getEmailFromLink()
        return
      }

      resolve({ email, status: 'Email найден на первой странице', link: `${url}` })
    }
    catch(e) {
      reject(e)
    }
  })
}