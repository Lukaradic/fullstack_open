import { Link } from 'react-router';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  // const handleDeleteClick = () => {
  //   if (window.confirm(`Remove blog ${blog.title}`)) {
  //     handleDelete(blog.id);
  //   }
  // };

  // const canDelete = userId === blog?.user?.id;

  return (
    <div style={blogStyle} data-testid="blog--container" id={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        <p data-testid="blog--title">{blog.title}</p>
      </Link>
    </div>
  );
};

export default Blog;
