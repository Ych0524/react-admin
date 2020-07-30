import axios from 'axios'

/*第一步，创建实例*/
const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
})

/*第二步，请求拦截*/
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/*第三步，响应拦截*/
instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default instance