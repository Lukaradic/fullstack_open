import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../gql/queries";

const Books = () => {
  const { data, loading } = useQuery(GET_BOOKS);
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
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
