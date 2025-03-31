// Import Axios:
import axios from 'axios'

// Service Base URL:
const baseUrl = '/api/login'

// [POST] Login Service:
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// Export Login Service:
export default { login }