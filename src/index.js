import 'babel-polyfill'
import Server from './core/server'
import logger from './core/logger'
import { routes } from './routes'
import config from 'config'

const { HOST, PORT } = process.env
const { host = HOST, port = PORT, prefix } = config.get('server')

const server = new Server(host, port)

process.on('unhandledRejection', (err) => {
  logger.error(err)
  process.exit(1)
})

server.init({ routes, prefix })
