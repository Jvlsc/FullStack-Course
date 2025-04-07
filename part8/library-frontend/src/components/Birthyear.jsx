// Import React Hooks:
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../services/queries'
import PropTypes from 'prop-types'

// Birthyear Component
const Birthyear = ({ notification }) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      console.log('Author Updated Successfully!')
      notification(`Author '${name}' Updated Successfully!`, 'success')
      clearFields()
    },
    onError: (error) => {
      console.log('Error Updating Author: ', error.message)
      notification(`Error Updating '${name}' Author: ${error.message}`, 'error')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Updating author...')
    updateAuthor({ variables: { name, setBornTo: parseInt(birthyear) } })
  }

  const clearFields = () => {
    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2>Set Birthyear:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name </label>
          <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          <label>Born </label>
          <input type="number" value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
        </div>
        <br />
        <button type="submit">Update Author</button>
      </form>
      <br />
      {result.loading && <div>Updating author...</div>}
    </div>
  )
}

Birthyear.propTypes = {
  notification: PropTypes.func.isRequired
}

// Export the Birthyear component:
export default Birthyear