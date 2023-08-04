import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async (newBlog) =>{
  console.log("creaetNew", token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)  
  return response.data
}

const deleteBlog = async (deleteId) =>{
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${deleteId}`, config)  
  
}


const setToken = (updateToken) => {
  token = `Bearer ${updateToken}`
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, deleteBlog, setToken }