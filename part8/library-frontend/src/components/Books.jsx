import { useQuery, useSubscription } from "@apollo/client/react";
import { GET_BOOKS } from "../gql/queries";
import { BOOK_ADDED } from "../gql/subscriptions";

const bookGenres = [
  "refactoring",
  "agile",
  "patterns",
  "design",
  "crime",
  "classic",
];

const Books = () => {
  const { data, loading, refetch } = useQuery(GET_BOOKS);
  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      client.cache.updateQuery({ query: GET_BOOKS }, (currentData) => {
        const newBook = data?.data?.bookAdded;
        const allBooks = Array.isArray(currentData?.allBooks)
          ? [...currentData.allBooks]
          : [];

        if (Object.keys(newBook)?.length > 0) {
          allBooks.push(newBook);
        }

        return {
          allBooks,
        };
      });
    },
  });

  const books = data?.allBooks ?? [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="filters">
        {bookGenres.map((genre, i) => (
          <button
            key={i}
            onClick={() => {
              refetch({});
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
