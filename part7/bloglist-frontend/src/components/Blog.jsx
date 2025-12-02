import { Link } from 'react-router';

const Blog = ({ blog }) => {
  // const handleDeleteClick = () => {
  //   if (window.confirm(`Remove blog ${blog.title}`)) {
  //     handleDelete(blog.id);
  //   }
  // };

  // const canDelete = userId === blog?.user?.id;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition duration-200 cursor-pointer"
      data-testid="blog--container"
      id={blog.id}
    >
      <Link to={`/blogs/${blog.id}`}>
        <p data-testid="blog--title">{blog.title}</p>
      </Link>
    </div>
  );
};

export default Blog;
