// Import React:
import { useState, useEffect } from 'react'

// Import Apollo Hooks & Queries:
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../services/queries'

// Recommendations Component:
const Recommendations = () => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (meResult.data) {
      setFavoriteGenre(meResult.data.me.favoriteGenre)
    }
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [meResult.data, booksResult.data])

  if (meResult.loading || booksResult.loading) {
    return <div>Loading User Recommendations...</div>
  }

  if (meResult.error || booksResult.error) {
    return <div>Error Loading User Recommendations...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books based on your favorite genre <strong>{favoriteGenre}:</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Export Recommendations Component:
export default Recommendations


