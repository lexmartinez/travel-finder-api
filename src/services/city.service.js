'use strict'
import cities from 'cities.json'
import * as Distance from 'geo-distance'
import * as fetch from 'node-fetch'

const AVG_SPEED_KMH = 80

const getData = async (lat, lng, item, apiKey) => {
  const { lat: dLat, lng: dLng } = item
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${lat},${lng}&destinations=${dLat},${dLng}&key=${apiKey}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export default {
  search: async (request) => {
    const { query = {}, payload = {} } = request
    const { country = 'CO' } = query
    const { lat, lng, time, distance = 1, apiKey } = payload
    const range = time ? (time * AVG_SPEED_KMH) : distance
    const origin = { lat: Number(lat), lon: Number(lng) }
    const list = await Promise.all(cities
      .filter((city) => city.country === country)
      .filter((city) => {
        const destination = { lat: Number(city.lat), lon: Number(city.lng) }
        const calc = Distance.between(origin, destination).human_readable().distance
        return calc <= range
      }).map(async (item) => {
        const { country, name } = item
        return {
          country, name, data: await getData(lat, lng, item, apiKey)
        }
      }))

    return list.filter((item) => {
      const { data = {} } = item
      const { rows = [] } = data
      let valid = false
      if (time) {
        rows.forEach((row) => {
          const { elements = [] } = row
          elements.forEach((el) => {
            const { duration = {} } = el
            if (duration.value && ((el.duration.value || 1) / 3600) <= (time + 0.5)) {
              valid = true
            }
          })
        })
      } else if (distance) {
        valid = true
      }
      return valid
    })
  }
}
