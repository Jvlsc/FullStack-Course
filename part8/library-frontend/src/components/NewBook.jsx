import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../services/queries'
import PropTypes from 'prop-types'

const NewBook = ({ notification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [  {query: ALL_AUTHORS }, {query: ALL_BOOKS} ],
    onCompleted: () => {
      console.log('Book Added Successfully')
      notification('Book Added Successfully!', 'success')
      clearFields()
    },
    onError: (error) => {
      console.log('Error Adding Book: ', error.message)
      notification(`Error Adding Book: ${error.message}`, 'error')
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('Adding Book...')
    createBook({ variables: { title, author, published: parseInt(published), genres } })
  }

  const clearFields = () => {
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }
  
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add New Book:</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  notification: PropTypes.func.isRequired
}

export default NewBook