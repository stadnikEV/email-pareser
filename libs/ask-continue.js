const readline = require('readline')

module.exports = () => {
  const promise = new Promise((resolve) => {
    const ask = () => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question('Создать новый поиск ?: ', function(isNew) {
        rl.close()
        if (!isNew || isNew === 'no') {
          resolve(true)
          return
        }
        if (isNew === 'yes') {
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
