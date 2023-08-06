import Togglable from "./Togglable"

const Blog = ({blog, deleteBlog,  updateBlog, currUsername}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await deleteBlog(blog)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await updateBlog(blog.id, {...blog, likes: blog.likes += 1})
  }

  const deleteButton = () => {
    return (
      <button onClick={(event) => handleDelete(event)}>delete</button>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <Togglable buttonLabel="view">
        <div>
          {blog.url} <br></br>
          {`likes ${blog.likes}`} <button onClick={handleLike}>like</button><br></br>
          {blog.user.username} <br></br>
          { currUsername === blog.user.username && deleteButton()}
        </div>
      </Togglable>
    </div>  
    
  )
}

export default Blog