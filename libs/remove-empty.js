
module.exports = obj => {

  for(let i = obj.length - 1; i >= 0; i -= 1) {
    if (obj[i].site === '') {
      obj.pop()
      continue
    }
    break
  }

  return obj
}