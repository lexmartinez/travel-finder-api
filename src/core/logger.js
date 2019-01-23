'use strict'

import winston from 'winston'
const { combine, timestamp, json } = winston.format

const format = combine(
  timestamp(),
  json()
)

const logger = winston.createLogger({
  level: 'info',
  format,
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'server.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export default logger
