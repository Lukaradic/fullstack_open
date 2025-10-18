import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { login } from "./services/user";
import { LoginForm } from "./components/LoginForm";
import { UserInfo } from "./components/UserInfo";
import { Notification } from "./components/Notification";
import { CreateBlog } from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const setTokenToStorage = (token, userData) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const getTokenFromStorage = () => {
    return localStorage.getItem("userToken");
  };

  const getUserFromStorage = () => {
    return localStorage.getItem("userData");
  };

  const removeUserFromStorage = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
  };

  const getBlogs = async () => {
    const res = await blogService.getAll();
    const blogs = res?.data.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      const user = getUserFromStorage();
      setUser(JSON.parse(user));
      getBlogs();
    }
  }, []);

  console.log();

  const handleNotification = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const loginUser = async (formData) => {
    try {
      const res = await login(formData);
      const { token, data } = res.data;
      setTokenToStorage(token, data);
      setUser(data);
    } catch (error) {
      console.error(error);
      handleNotification("error", "wrong username or password");
    }
  };

  const logUserOut = () => {
    removeUserFromStorage();
    setUser(null);
  };

  const handleCreate = async (data) => {
    try {
      const res = await blogService.create(data);
      handleNotification(
        "success",
        `a new blog ${res?.data?.title} by ${res?.data?.author} added`
      );
      await getBlogs();
    } catch (err) {
      console.error(err);
      handleNotification("error", "Failed to create");
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const cloned = [...blogs];
      const blogIndex = cloned.findIndex((blog) => blog.id === id);
      cloned.splice(blogIndex, 1);
      setBlogs(cloned);
      handleNotification("success", "Deleted blog");
    } catch (err) {
      console.error(err);
      handleNotification("error", "Failed to delete");
    }
  };

  const handleLike = async (data) => {
    try {
      const res = await blogService.like(data);
      const cloned = [...blogs];
      const blogIndex = cloned.findIndex((blog) => blog.id === data.id);
      cloned.splice(blogIndex, 1, res.data.data);
      setBlogs(cloned);
    } catch (err) {
      console.error(err);
      handleNotification("error", "Failed to like");
    }
  };

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {user && <UserInfo name={user?.username} logOut={logUserOut} />}
      <h2>blogs</h2>
      {!user && <LoginForm handleLogin={loginUser} />}
      {user && (
        <>
          <CreateBlog handleCreate={handleCreate} />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
