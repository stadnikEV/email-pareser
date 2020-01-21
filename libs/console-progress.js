const proxy = require('./proxy.js')

module.exports = ({ message, email, id, found, lastId, firstId }) => {
  console.log('\033[2J')

  const proxyStatus = proxy.isInit()
    ? `${proxy.getStatistic().current} из  ${proxy.getStatistic().max}`
    : 'Не используются'

  console.log(`
${(email) ? email : ''}

Message: ${message}

Найдено: ${found} из  ${id - firstId + 1}
Процент найденных: ${parseInt((found / (id - firstId + 1)) * 100)}%
Текущий id: ${id}
Конечный id: ${lastId}
Proxy: ${proxyStatus}
Прогресс: ${parseInt((((id - firstId) || 1) / ((lastId - firstId) || 1)) * 100)}%`)
}