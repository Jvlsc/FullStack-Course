// Imports Components:
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
// App Component:
const App = () => {
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