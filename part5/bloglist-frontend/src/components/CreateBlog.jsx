import React, { useState } from "react";

export const CreateBlog = ({ handleCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    author: "",
  });

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

  return (
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
                value={formData.url}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};
