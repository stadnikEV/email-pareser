const removeDirectory = require('./remove-directory')
const xlsxToJsonFile = require('./xlsx-to-json-file')
const jsonFileToObject = require('./json-file-to-object')


module.exports = ({ proxyPos }) => {
  const promise = new Promise(async function(resolve, reject) {
    try {
      await removeDirectory({ path: './proxy/proxy.json' })

      console.log('Чтение Proxy')

      await xlsxToJsonFile({
        input: 'proxy/proxy.xlsx',
        output: 'proxy/proxy.json',
      })

      let proxy = await jsonFileToObject({ path: 'proxy/proxy.json' })

      proxy = proxy.map(item => item.proxy)

      await removeDirectory({ path: './proxy/proxy.json' })

      proxy = proxy.slice(proxyPos, proxy.length)

      resolve(proxy)
    }
    catch(e) {
      if (e.code === 'ENOENT') {
        reject(`Файл не найден : ${e.path}`)
        return
      }
      reject(e)
    }
  })

  return promise
}