import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationSlice';
import blogService from '../services/blogs';

export const CreateBlog = ({ getBlogs }) => {
  const dispatch = useDispatch();
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

  const handleCreate = async (data) => {
    try {
      const res = await blogService.create(data);
      dispatch(
        displayNotification(
          'success',
          `a new blog ${res?.data?.data?.title} by ${res?.data?.data?.author} added`
        )
      );
      await getBlogs();
    } catch (err) {
      console.error(err);
      dispatch(displayNotification('error', 'Failed to create'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(formData);
    setShow(false);
    setFormData({
      title: '',
      url: '',
      author: '',
    });
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
