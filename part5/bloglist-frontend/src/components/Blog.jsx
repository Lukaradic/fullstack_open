import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const buttonTitle = showDetails ? "hide" : "view";

  const handleLikleClick = () => {
    handleLike(blog);
  };
  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      handleDelete(blog.id);
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title}
      <button
        style={{ marginLeft: 4 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {buttonTitle}
      </button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button onClick={handleLikleClick}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
