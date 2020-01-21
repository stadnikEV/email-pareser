const readline = require('readline')
const askIndex = require('./get-index')

module.exports = () => {
  const promise = new Promise((resolve) => {
    const ask = () => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question('Позиция proxy: ', function(pos) {
        rl.close()
        resolve(askIndex(pos))
      })

      rl.write('2')
    }

    ask()
  })

  return promise
}