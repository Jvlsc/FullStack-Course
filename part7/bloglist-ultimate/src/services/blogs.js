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

// [POST] Create Blog:
const create = async (newObject) => {
  const config = {
    headers: { Authorization: getToken() },
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
    headers: { Authorization: getToken() },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// Fix Populate Mismatch:
const fixPopulateMismatch = (blog) => {
  const user = JSON.parse(window.localStorage.getItem('login'))
  if (!user) return blog
  return {
    ...blog,
    user: { id: blog.user, name: user.name, username: user.username },
  }
}

// Export Blogs Service:
export default { getAll, create, update, remove, fixPopulateMismatch }
