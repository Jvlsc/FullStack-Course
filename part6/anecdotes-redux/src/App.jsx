// Import React:
import { useEffect } from 'react'

// Import Redux:
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

// Import Services:
import anecdotesService from './services/anecdotes'

// Imports Components:
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

// App Component:
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <br />
      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  )
}

// Export App Component:
export default App