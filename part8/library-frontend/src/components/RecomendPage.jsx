import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../gql/queries";

export const RecomendPage = ({ favoriteGenre }) => {
  const { data, loading } = useQuery(GET_BOOKS, {
    skip: !favoriteGenre,
    variables: {
      genre: favoriteGenre,
    },
  });

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre patterns</p>

      {loading && <p>Loading...</p>}
      {!loading && (
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {data?.allBooks?.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
