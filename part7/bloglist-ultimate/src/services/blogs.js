// Import Axios:
import axios from 'axios'

// Service Base URL:
const baseUrl = '/api/blogs'

// Token Variable:
let token = null

// Set Token Function:
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// [GET] Get All Blogs:
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// [POST] Create Blog:
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// [PUT] Update Blog:
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// [DELETE] Delete Blog:
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// Export Blogs Service:
export default { getAll, create, update, remove, setToken }
