// Import React:
import { useState } from 'react'

// Import Apollo Hooks & Queries:
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../services/queries'

// Books Component:
const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>Error - {result.error.message}</div>
  }

  // Get all unique genres from all books
  const allGenres = [...new Set(result.data.allBooks.flatMap(book => book.genres))]
  console.log('All Genres: ', allGenres)

  // Filter books by selected genre
  console.log('Selected Genre: ', selectedGenre)
  const filteredBooks = selectedGenre
    ? result.data.allBooks.filter(book => book.genres.includes(selectedGenre))
    : result.data.allBooks

  return (
    <div>
      <h2>Books:</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {allGenres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)} style={{ marginLeft: '5px' }}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

// Export Books Component:
export default Books
