'use strict'

import Hapi from 'hapi'
import logger from './logger'
export default class Server {
  constructor (host, port) {
    this.server = Hapi.server({ port, host, routes: { cors: true } })
  }

  configure (config = {}) {
    const { routes = [], prefix } = config
    const { server } = this
    routes.forEach(route => {
      if (prefix) route.path = `${prefix}${route.path}`
      server.route(route)
    })
  }

  async init (config) {
    const { server } = this
    if (server) {
      this.configure(config)
      await server.start()
      logger.info(`Server running at: ${server.info.uri}`)
    }
  }
}
