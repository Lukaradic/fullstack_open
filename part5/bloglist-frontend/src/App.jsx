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
    setBlogs(res?.data);
  };

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      const user = getUserFromStorage();
      setUser(user);
      getBlogs();
    }
  }, []);

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
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
