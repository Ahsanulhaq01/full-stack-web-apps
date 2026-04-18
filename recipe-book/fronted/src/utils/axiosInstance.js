import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://full-stack-web-apps.onrender.com/api/v1',
  withCredentials: true,
})

export { axiosInstance };
