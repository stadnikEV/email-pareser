
module.exports = ({ message, email, id, found, lastId, firstId }) => {
  console.log('\033[2J')

  console.log(`
${(email) ? email : ''}

Message: ${message}

Найдено: ${found} из  ${id - firstId + 1}
Процент найденных: ${parseInt((found / (id - firstId + 1)) * 100)}%
Текущий id: ${id}
Конечный id: ${lastId}
Прогресс: ${parseInt((((id - firstId) || 1) / ((lastId - firstId) || 1)) * 100)}%`)
}