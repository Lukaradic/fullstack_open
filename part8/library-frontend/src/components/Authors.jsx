import { useQuery, useMutation } from "@apollo/client/react";
import { GET_AUTHORS } from "../gql/queries";
import { useState } from "react";
import { EDIT_AUTHOR } from "../gql/mutations";

const Authors = () => {
  const { data, refetch } = useQuery(GET_AUTHORS);
  const authors = data?.allAuthors ?? [];

  console.log(authors);
  const [editAuthor, { loading, error }] = useMutation(EDIT_AUTHOR);

  const [formState, setFormState] = useState({
    name: "",
    born: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editAuthor({
      variables: {
        author: formState.name,
        setBornTo: Number(formState.born),
      },
    });
    await refetch();
    setFormState({
      name: "",
      born: "",
    });
  };

  const isSubmitDisabled = !formState?.name || !formState.born;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Set birthyear</h3>
        <form>
          <div>
            name{" "}
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div>
            born{" "}
            <input
              type="number"
              name="born"
              id="born"
              value={formState.born}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {loading ? "Updating" : "Update Author"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    </div>
  );
};

export default Authors;
