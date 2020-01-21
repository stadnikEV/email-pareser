const config = require('../config')
const getId = require('./get-id')

const initProxy = () => {
  if (global.proxy) {
    return global.proxy
  }

  class Proxy {
    constructor() {
      this.currentProxy = null
      this.proxy = null
      this.count = 0
    }

    init(proxy) {
      this.proxy = proxy.reverse()
      this.maxProxyLength = this.proxy.length
      this.currentProxy = this.proxy.pop()
    }

    isInit() {
      return Boolean(this.proxy)
    }

    get() {
      if (!this.proxy) {
        return null
      }
      if (this.count === config.proxyLimit) {
        this.next()
      }
      return this.currentProxy
    }

    next() {
      if (!this.isInit()) {
        return
      }
      this.currentProxy = this.proxy.pop()
      this.count = 0
    }

    countStep() {
      this.count += 1
    }

    getStatistic() {
      if (this.isInit()) {
        return {
          max: this.maxProxyLength,
          current: this.maxProxyLength - this.proxy.length
        }
      }
      return null
    }
  }

  const proxy = new Proxy()
  global.proxy = proxy

  return proxy
}

const proxy = initProxy()

module.exports = proxy