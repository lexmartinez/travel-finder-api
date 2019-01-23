'use strict'
import cityRoutes from './city.routes'
import config from 'config'

export const routes = [
  ...cityRoutes,
  {
    method: '*',
    path: '',
    handler: () => config.get('info')
  }
]
