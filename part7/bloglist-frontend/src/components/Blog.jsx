import { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleDelete, userId }) => {
  const [showDetails, setShowDetails] = useState(false);

  const buttonTitle = showDetails ? 'hide' : 'view';

  const handleLikleClick = () => {
    handleLike(blog);
  };
  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      handleDelete(blog.id);
    }
  };

  const canDelete = userId === blog?.user?.id;

  return (
    <div style={blogStyle} data-testid="blog--container" id={blog.id}>
      <p data-testid="blog--title">{blog.title}</p>
      <button
        data-testid="blog--btn__show-details"
        style={{ marginLeft: 4 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {buttonTitle}
      </button>
      {showDetails && (
        <div>
          <p data-testid="blog--url">{blog.url}</p>
          <p data-testid="blog--likes">
            {blog.likes}{' '}
            <button data-testid="blog--btn__like" onClick={handleLikleClick}>
              like
            </button>
          </p>
          <p data-testid="blog--author">{blog.author}</p>
          {canDelete && (
            <button data-testid="blog--btn__delete" onClick={handleDeleteClick}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
