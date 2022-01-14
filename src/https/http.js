import axios from 'axios'

const http = axios.create({
  baseURL: process.env.BASE_URL || '/',
  timeout: 1000
})

export default http
