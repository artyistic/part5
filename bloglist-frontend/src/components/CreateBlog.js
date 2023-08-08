import { useState } from "react"
const CreateBlog = ({ createBlog }) => {
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }


  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write blog title here"

          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write blog author here"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write blog url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
