import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          <Link to="/add">Add</Link>
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
