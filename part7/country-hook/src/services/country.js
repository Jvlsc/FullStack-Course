// Import Axios:
import axios from 'axios'

// Country Service:
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

// Get All Countries:
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Get Country:
const getCountry = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => response.data)
}

// Export the Country Service:
export default { getAll, getCountry }

