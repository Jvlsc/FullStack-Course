// Import Axios:
import axios from 'axios'

// Service Base URL:
const baseUrl = '/api/users'

// Set Token Function:
const getToken = () => {
  const userJSON = window.localStorage.getItem('login')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return `Bearer ${user.token}`
  }
  return null
}

// [GET] Get All Users Service:
const getAll = async () => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

// [GET] Get a Single User Service:
const getById = async (id) => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

// Export Users Service:
export default { getAll, getById }