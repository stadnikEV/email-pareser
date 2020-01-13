
module.exports = ({ domain, link }) => {
  const absolutLink = link.indexOf('http') !== -1

  if (!absolutLink) {
    return true
  }

  if (link.indexOf(domain) !== -1) {
    return true
  }

  return false
}