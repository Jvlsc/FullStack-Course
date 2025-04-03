// Import React Tools:
import { useState, useRef } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

// Import Components:
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Header from './components/Header'
import Menu from './components/Menu'
import Notification from './components/Notification'

// App Component:
const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  
  const timer = useRef(null)

  const clearNotification = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { setNotification('') }, 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" created!`)
    clearNotification()
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <Header />
      <Menu />
      <br />
      <Notification notification={notification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/create' element={<CreateNew addNewAnecdote={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <br />
      <Footer />
    </div>
  )
}

// Export App Component:
export default App