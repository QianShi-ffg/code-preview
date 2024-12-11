import axios from './index'

// console.log(import.meta.env.VITE_BASE_URL, 8999)
// 登录
export const login = (params: object) => {
  return axios.get( '/user/login', { params })
}
// 保存demo
export const saveDemoList = (params: object) => {
  return axios.post( '/demo', params)
}
// 更新demo
export const updateDemoList = (params: any) => {
  console.log(params)
  return axios.patch( `/demo/${params.id}`, params.data)
}
// demo列表
export const getDemoList = (params: object) => {
  return axios.get( '/demo', { params })
}
// 查询单个demo
export const getDemoItem = (params: any) => {
  return axios.get( `/demo/${params.id}`, {})
}
// 运行转换
export const getRunning = (params: object) => {
  return axios.post( `/demo/running`, params)
}



