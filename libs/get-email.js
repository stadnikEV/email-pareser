const { fork } = require('child_process')
const processPath = __dirname + '/match-email-process.js'
const emailFilter = require('./email-filter')

module.exports = ({ html, url }) => {
  return new Promise((resolve, reject) => {
    const regexProcess = fork(processPath)
    let received = null
    let timeout = null

    regexProcess.on('message', function(data) {
      clearTimeout(timeout)
      received = emailFilter({ emailArr: data, html })
      regexProcess.kill()

      resolve(received)
    })

    timeout = setTimeout(() => {
      if (!received) {
        reject({ errorMessage: 'превышен лимит времени паксинга email', link: url })
        regexProcess.kill()
      }
    }, 10000)

    regexProcess.send(html)
  })
}

