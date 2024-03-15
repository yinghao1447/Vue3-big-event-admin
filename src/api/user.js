import request from '@/utils/request'

export const userReigsterServer = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginServer = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetInfoServer = () => request.get('/my/userinfo')
