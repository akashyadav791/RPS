import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
