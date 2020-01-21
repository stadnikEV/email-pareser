const needle = require('needle')
const request = require('request')
const config = require('../config')
const proxy = require('./proxy.js')


const requestHtml = url => {
  return new Promise((resolve, reject) => {
    let proxyUrl = null

    if (proxy.isInit()) {
      proxyUrl = proxy.get()

      if (!proxyUrl) {
        reject({ errorMessage: 'Прокси закончились' })
        return
      }
    }

    request({
      method: "GET",
      url,
      proxy: proxyUrl,
      timeout: 10000,
    }, (err, res) => {

      if (err) {
        reject(err)
        return
      }

      resolve(res)
    })
  })
}



module.exports = url => {
  return new Promise((resolve, reject) => {
    let numberRequest = 0
    let link = null

    async function getHTML(url) {
      try {
        if (numberRequest === config.redirectLimit) {
          throw({ errorMessage: 'Превышен лимит редиректов' })
          return
        }

        numberRequest += 1
        const response = await requestHtml(url)

        link = response.request.uri.href.replace(/\/$/, '')
        const { location } = response.headers

        if (location) {
          getHTML(location)
          return
        }

        if (typeof response.body !== 'string') {
          throw({ errorMessage: 'Тело ответа не строка', link })
          return
        }

        if (response.body === '') {
          throw({ errorMessage: 'Ресурс не найден', link })
          return
        }

        resolve({
          html: response.body,
          url: link,
        })
      }
      catch(e) {
        if (!e.errorMessage) {
          reject({ errorMessage: 'Ошибка запроса', link: e.hostname })
          return
        }
        reject(e)
      }
    }

    getHTML(url)
  })
}