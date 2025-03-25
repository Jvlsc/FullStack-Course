import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
  console.log('Fetching All Data...')
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}

const getCountry = (country) => {
  console.log(`Fetching ${country} Data...`)
  const request = axios.get(`${baseUrl}/api/name/${country}`)
  return request.then(response => response.data)
}

export default { getAll, getCountry }