// Import React:
import { useState, useEffect } from "react";

// Import React Router:
import { Link, Routes, Route } from "react-router-dom";

// Import Apollo Client:
import { useSubscription } from '@apollo/client'

// Import Queries & Services Utilities:
import { ALL_BOOKS, BOOK_ADDED } from './services/queries'
import { updateBooksCache } from './services/updateBooksCache'

// Import Components:
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

// App Component:
const App = () => {
  const [notification, setNotification] = useState({})
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log('[GraphQL-WS] Book Added Event Received', data)
      notify(`Book '${data.data.bookAdded.title}' was Added!`, 'success')
      //window.alert('Book Added Event Received')
      updateBooksCache(client.cache, {query: ALL_BOOKS}, data.data.bookAdded)
    }
  })

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    notify('Logged Out Successfully!', 'success')
  }

  if (!token) {
    return (
      <div>
        <h2>Login:</h2>
        <Notification notification={notification} />
        <LoginForm notification={notify} setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <nav>
        <Link to="/authors">Authors</Link> &nbsp;
        <Link to="/books">Books</Link> &nbsp;
        <Link to="/add-book">Add Book</Link> &nbsp;
        <Link to="/recommendations">Recommendations</Link> &nbsp;
        <button onClick={logout}>Logout</button>
      </nav>
      <br />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<Authors notification={notify} />} />
        <Route path="/authors" element={<Authors notification={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook notification={notify} />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

// Export App Component:
export default App;
