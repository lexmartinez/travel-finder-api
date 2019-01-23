'use strict'

import service from '../services/city.service'

export const search = async (request, headers) => {
  return service.search(request)
}
