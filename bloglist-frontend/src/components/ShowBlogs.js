import Togglable from "./Togglable"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import blogService from "../services/blogs"
import { useState, useEffect } from "react"
const ShowBlogs = ({ setMessage, username }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((intialBlogs) => {
      setBlogs(intialBlogs)
    })
  }, [])

  // slightly clunky since we are passing the whole blog objects now for create delete and update
  const createBlog = async (newBlog) => {
    const addedBlog = await blogService.createNew(newBlog)
    setBlogs(blogs.concat(addedBlog))
    setMessage(`new blog ${addedBlog.title} by ${addedBlog.author} is added`)
    setTimeout(() => setMessage(), 5000)
  }

  const deleteBlog = async (deletedBlog) => {
    if (
      window.confirm(
        `Do you really want to delete ${deleteBlog.title} by ${deletedBlog.author}`
      )
    ) {
      await blogService.deleteBlog(deletedBlog.id)
      // update blogs list
      setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
    }
  }

  const updateBlog = async (updatedBlog) => {
    await blogService.updateBlog(updatedBlog.id, {
      ...updatedBlog,
      likes: (updatedBlog.likes += 1),
    })
    setBlogs([...blogs])
  }
  return (
    <div>
      <Togglable buttonLabel="new Blog">
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          updateBlog={updateBlog}
          currUsername={username}
        />
      ))}
    </div>
  )
}

export default ShowBlogs
