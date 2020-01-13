
class Block {
  constructor() {
    this.limit = 5
    this.startProtaction = null
    this.protection = 0
  }

  isBlock({ message, index }) {
    if (message !== 'Ссылок нет, возможно ЗАЩИТА или SPA') {
      this.protection += 0
      return false
    }

    if (this.protection === 0) {
      this.startProtaction === index
    }

    this.protection += 1

    if (this.protection === this.limit) {
      return true
    }
  }

  getLimit() {
    return this.limit
  }
}

module.exports = Block