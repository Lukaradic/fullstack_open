import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { UserLogin } from "./components/UserLogin";
import { useQuery } from "@apollo/client/react";
import { GET_CURRENT_USER } from "./gql/queries";
import { RecomendPage } from "./components/RecomendPage";

const App = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER);

  const logOutUser = () => {
    localStorage.removeItem("access-token");
    refetch();
  };

  const isLoggedIn = data?.me ? Object.keys(data.me)?.length > 0 : false;

  return (
    <Router>
      <div>
        <div
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/add">Add book</Link>}
          {isLoggedIn && <Link to="/recomend">Recomend</Link>}
          {isLoggedIn && <button onClick={logOutUser}>Log out</button>}
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/login" element={<UserLogin />} />
          <Route
            path="/recomend"
            element={<RecomendPage favoriteGenre={data?.me?.favoriteGenre} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
