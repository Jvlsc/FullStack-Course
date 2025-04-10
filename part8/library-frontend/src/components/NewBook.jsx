import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../services/queries'
import PropTypes from 'prop-types'

const NewBook = ({ notification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook, result ] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS }, {query: ALL_BOOKS}],
    onCompleted: (data) => {
      if (data) {
        console.log('[GraphQL] Book Added Successfully', data)
        notification(`Book '${data.addBook.title}' Added Successfully!`, 'success')
        clearFields()
      }
    },
    onError: (error) => {
      console.log('[GraphQL] Error Adding Book', error)
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(`[GraphQL] Error Adding '${title}' Book -> ${messages}`)
      notification(`Error Adding '${title}' Book -- ${messages}`, 'error')
    },
    update: (cache, response) => {
      response.data.addBook.genres.forEach(genre => {
        cache.updateQuery({query: ALL_BOOKS}, (data) => {
          if (!data) {
            return { allBooks: [response.data.addBook] }
          }
          return { allBooks: data.allBooks.concat(response.data.addBook) }
        })
        cache.updateQuery({query: ALL_BOOKS_BY_GENRE, variables: { genre }}, 
          (data) => {
            if (!data) {
              return { allBooks: [response.data.addBook] }
            }
            return { allBooks: data.allBooks.concat(response.data.addBook) }
          }
        )
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('[GraphQL] Adding Book...')
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
      <br />
      {result.loading && <div>Creating book...</div>}
    </div>
  )
}

NewBook.propTypes = {
  notification: PropTypes.func.isRequired
}

export default NewBook