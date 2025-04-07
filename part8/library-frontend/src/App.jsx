import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";


const App = () => {
  const [notification, setNotification] = useState({})

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  return (
    <div>
      <nav>
        <Link to="/authors">Authors</Link> &nbsp;
        <Link to="/books">Books</Link> &nbsp;
        <Link to="/add">Add Book</Link>
      </nav>
      <br />
      <Notification notification={notification} />
      <Routes>
        <Route path="/authors" element={<Authors notification={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook notification={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
