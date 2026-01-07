import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useMutation } from "@apollo/client/react";

import { ADD_BOOK } from "../gql/mutations";

const NewBook = () => {
  const [title, setTitle] = useState("Refactoring, edition 2");
  const [author, setAuthor] = useState("Martin Fowler");
  const [published, setPublished] = useState("2018");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState(["refactoring"]);

  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  const submit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: {
        title,
        author,
        published: Number(published) || null,
        genres,
        addBookId: uuidv4(),
      },
      onCompleted: () => {
        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
      },
      // refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit" disabled={loading}>
          create book
        </button>
        {error && <p style={{ color: "red", marginTop: 4 }}>error.message</p>}
      </form>
    </div>
  );
};

export default NewBook;
