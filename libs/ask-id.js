const readline = require('readline')
const getId = require('./get-id')
const getIndex = require('./get-index')

module.exports = ({ message, index }) => {
  const promise = new Promise((resolve) => {
    const ask = () => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(message, function(index) {
        rl.close()
        resolve(getIndex(Number(index)))
      })

      rl.write(`${getId(index)}`)
    }

    ask()
  })

  return promise
}