import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ShowLoggedInUser from "./components/ShowLoggedInUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((intialBlogs) => {
      setBlogs(intialBlogs);
    });
  }, []);

  useEffect(() => {
    //check for cached in user
    const cachedUser = window.localStorage.getItem("loggedInUser");
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(username, password);
      setUser(user);
      blogService.setToken(user.token)
      setUsername("");
      setPassword("");

      // cache in local storage
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setMessage("you are logged in");
      setTimeout(() => setMessage(), 5000);
    } catch (exception) {
      setMessage("wrong login credentials");
      setTimeout(() => setMessage(), 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault()
    const Blog = {
      title: title,
      author: author,
      url: url
    }
    const addedBlog = await blogService.createNew(Blog, user.token)
    setBlogs(blogs.concat(addedBlog))
    setTitle("")
    setAuthor("")
    setUrl("")
    setMessage(`new blog ${addedBlog.title} by ${addedBlog.author} is added`);
    setTimeout(() => setMessage(), 5000);
  }

  
  const handleDelete = async (event, deleteId) => {
    event.preventDefault()
    await blogService.deleteBlog(deleteId)
    // update blogs list
    setBlogs(blogs.filter(blog => blog.id !== deleteId))
  }


  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const showBlogs = () => {
    return (
      <div>
        <ShowLoggedInUser name={user.name} />
        <button onClick={handleLogout}>Logout</button>
        <h2>Create</h2>
        <div>
          <form onSubmit={handleCreate}>
            <div>
              title
              <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {user === null ? loginForm() : showBlogs()}
    </div>
  );
};

export default App;
