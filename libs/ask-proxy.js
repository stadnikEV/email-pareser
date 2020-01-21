const readline = require('readline')

module.exports = () => {
  const promise = new Promise((resolve) => {
    const ask = () => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question('Отключить Proxy ?: ', function(isDisable) {
        rl.close()
        if (!isDisable || isDisable === 'no') {
          resolve(true)
          return
        }
        if (isDisable === 'yes') {
          resolve(false)
          return
        }
        console.log('Укажите "yes" или "no"')
        ask()
      })
    }

    ask()
  })

  return promise
}