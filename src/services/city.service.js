'use strict'
import cities from 'cities.json';
import * as Distance from 'geo-distance';

const AVG_SPEED_KMH = 60;
export default {
  search: (request) => {
    const { query = {}, payload = {} } = request;
    const { country = 'CO' } = query;
    const { lat, lng, time, distance = 1 } = payload;
    const range = time ? (time * AVG_SPEED_KMH) : distance;
    const origin = { lat: Number(lat), lon: Number(lng) };
    return cities
      .filter((city) => city.country === country)
      .filter((city) => {
        const destination = { lat: Number(city.lat), lon: Number(city.lng) };
        const calc = Distance.between(origin, destination).human_readable().distance;
        return calc <= range;
      })
  }
}
