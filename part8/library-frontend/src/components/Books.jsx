// Import React:
import { useState } from 'react'

// Import Apollo Hooks & Queries:
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../services/queries'

// Books Component:
const Books = () => {
  const [genre, setGenre] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS)
  const filteredBooksResult = useQuery(
    genre ? ALL_BOOKS_BY_GENRE : ALL_BOOKS,
    genre ? { variables: { genre: genre } } : {}
  )

  if (allBooksResult.loading || filteredBooksResult.loading) {
    return <div>Loading books...</div>
  }

  if (allBooksResult.error || filteredBooksResult.error) {
    return <div>Error loading books</div>
  }

  // Get all unique genres from all books
  const allGenres = [...new Set(allBooksResult.data.allBooks.flatMap(book => book.genres))]

  return (
    <div>
      <h2>Books:</h2>
      {genre ? (<p>Filter: <strong>{genre}</strong> genre</p>) : (<p>Filter: <strong>All Books</strong></p>) }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooksResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('')}>all genres</button>
        {allGenres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)} style={{ marginLeft: '5px' }}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

// Export Books Component:
export default Books
