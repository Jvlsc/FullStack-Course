// Import React Query Tools:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Services:
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(['anecdotes'], (anecdotes) => [...anecdotes, anecdote])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>Create New Anecdote:</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
