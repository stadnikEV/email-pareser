
module.exports = ({ emailArr, html }) => {
  const result = []

  emailArr.forEach(item => {
    const forbidden = item.match(/[:|!|\?|\/|;|#|$|%|=]/g)
    if (forbidden) {
      return
    }
    if (result.indexOf(item, 0) !== -1) {
      return
    }

    result.push(item)
  })

  return result
}