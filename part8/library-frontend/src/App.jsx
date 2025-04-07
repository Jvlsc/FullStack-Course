import { Link, Routes, Route } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/authors">Authors</Link> &nbsp;
        <Link to="/books">Books</Link> &nbsp;
        <Link to="/add">Add Book</Link>
      </nav>
      <br />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
