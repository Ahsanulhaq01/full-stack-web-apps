import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://recipes-book-backend.onrender.com/api/v1',
  withCredentials: true,
})

export { axiosInstance };
