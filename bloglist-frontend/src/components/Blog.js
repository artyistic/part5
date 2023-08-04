const Blog = ({blog, handleDelete}) => (
  <div>
    {blog.title} {blog.author} {<button onClick={(event) => handleDelete(event, blog.id)}>delete</button>}
  </div>  
)

export default Blog