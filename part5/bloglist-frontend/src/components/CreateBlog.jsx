import React, { useState } from 'react';

export const CreateBlog = ({ handleCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    author: '',
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(formData);
  };

  if (!show) {
    return (
      <div>
        <button
          data-testid="create-blog--btn__show"
          onClick={() => setShow(true)}
        >
          create new blog
        </button>
      </div>
    );
  }

  return (
    <>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title">Title</label>
              </td>
              <td>
                <input
                  type="text"
                  name="title"
                  id="title"
                  data-testid="create-blog--title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="author">Author</label>
              </td>
              <td>
                <input
                  type="text"
                  name="author"
                  id="author"
                  data-testid="create-blog--author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="url">Url</label>
              </td>
              <td>
                <input
                  type="text"
                  name="url"
                  id="url"
                  data-testid="create-blog--url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          data-testid="create-blog--btn__submit"
          type="submit"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
      <button onClick={() => setShow(false)}>cancel</button>
    </>
  );
};
