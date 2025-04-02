// Import React Query Tools:
import { useQuery } from '@tanstack/react-query'

// Import Components:
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

// Import Services:
import anecdotesService from './services/anecdotes'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.error ) {
    return <div>Server Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h2>Anecdote App</h2>
      <Notification />
      <AnecdoteForm />
      <br />
      <h3>Anecdotes List:</h3>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
