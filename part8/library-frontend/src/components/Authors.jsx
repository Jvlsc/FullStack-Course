import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../services/queries'
import Birthyear from './Birthyear'
import PropTypes from 'prop-types'

const Authors = ({ notification }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>Error - {result.error.message}</div>
  }

  console.log('Authors: ', result.data.allAuthors)

  return (
    <div>
      <h2>Authors:</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Birthyear notification={notification} authors={result.data.allAuthors} />
    </div>
  )
}

Authors.propTypes = {
  notification: PropTypes.func.isRequired
}

export default Authors
