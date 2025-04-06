// Import Axios:
import axios from 'axios'

// Service Base URL:
const baseUrl = '/api/blogs'

// Set Token Function:
const getToken = () => {
  const userJSON = window.localStorage.getItem('login')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return `Bearer ${user.token}`
  }
  return null
}

// [GET] Get All Blogs:
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// [GET] Get Blog by ID:
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// [POST] Create Blog:
const create = async (newObject) => {
  const config = {
    headers: { Authorization: getToken() },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// [POST] Create Comment:
const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
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
    headers: { Authorization: getToken() },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// Export Blogs Service:
export default { getAll, getById, create, createComment, update, remove }
