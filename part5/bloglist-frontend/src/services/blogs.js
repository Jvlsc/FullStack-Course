// Import Axios:
import axios from 'axios'

// Service Base URL:
const baseUrl = '/api/blogs'

// [GET] Get All Blogs:
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Export Blogs Service:
export default { getAll }