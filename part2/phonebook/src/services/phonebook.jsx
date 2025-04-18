import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  console.log('Fetching All Data...')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  console.log('Creating New Object...')
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('Updating Object...')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  console.log('Deleting Object...')
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }