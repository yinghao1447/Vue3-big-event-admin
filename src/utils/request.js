import axios from 'axios'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
import { useUserStore } from '@/stores/index.js'
import router from '@/router'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 2xx 范围内的状态码都会触发该函数。
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务器异常')
    return Promise.reject(res.data)
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.response?.state === 401) {
      router.push('/login')
    }
    ElMessage.error(error.response.data.message || '服务器异常')
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
