import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationSlice';
import blogService from '../services/blogs';
import { Button } from './common/Button';
import { Input } from './common/Input';

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
        <Button
          data-testid="create-blog--btn__show"
          onClick={() => setShow(true)}
          text="Create new blog"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8  w-md justify-center">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <Input
            value={formData.title}
            onChange={handleChange}
            name="title"
            id="title"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Author
          </label>
          <Input
            value={formData.author}
            onChange={handleChange}
            name="author"
            id="author"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Url
          </label>
          <Input
            value={formData.url}
            onChange={handleChange}
            name="url"
            id="url"
          />
        </div>
      </div>
      <Button onClick={handleSubmit} type="submit" text="Create" />
      <Button onClick={() => setShow(false)} text="Cancel" />
    </div>
  );
};
