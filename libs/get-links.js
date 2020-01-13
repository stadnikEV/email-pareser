
const isMainDamain = require('./is-main-damain')


module.exports = ({ html, url }) => {
  const сonstants = ['контакты', 'contacts']
  let result = {
    href: [],
  }

  const links = html.match(/<a.+?>.*?a>/gs)

  if (!links) {
    return result
  }

  links.some((item) => {
    let href = item.match(/href=".*?"/g)

    if (!href || href.length !== 1) {
      return false
    }

    href = href[0].replace(/href="\//, '')
    regexp = new RegExp(url, 'g')
    href = href.replace(regexp, '')
    href = href.replace(/href="/, '')
    href = href.replace(/"/, '')
    href = href.replace(/^\//, '')

    if (!isMainDamain({ domain: url, link: href })) {
      return false
    }

    if (href === '' || href === '#') {
      return false
    }

    const isContact = сonstants.some((constant) => {
      return item.toLowerCase().indexOf(constant) !== -1
    })

    if (isContact) {
      result.href = [href]
      result.contacts = true
      return true
    }

    result.href.push(href)

    return false
  })

  return result
}