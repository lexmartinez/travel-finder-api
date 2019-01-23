'use strict'

import { search } from '../handlers/city.handler'

const path = '/cities'

export default [
  {
    method: 'POST',
    path: `${path}/search`,
    handler: search
  }
]
