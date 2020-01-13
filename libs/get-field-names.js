module.exports = data => {
  const fieldNames = ['id', 'email', 'status', 'link', 'email_1']

  Object.keys(data[0]).forEach(fieldName => {
    if (fieldNames.indexOf(fieldName) !== -1) {
      return
    }
    fieldNames.push(fieldName)
  })

  return fieldNames
};