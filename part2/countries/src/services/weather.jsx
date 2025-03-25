import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const baseIconUrl = 'https://openweathermap.org/img/wn/'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat, lon) => {
  console.log(`Fetching Weather Data for: ${lat}, ${lon}...`)
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

const getWeatherIconUrl = (iconCode) => {
  return `${baseIconUrl}${iconCode}@2x.png`
}

export default { getWeather, getWeatherIconUrl } 