import axios from './index'

// console.log(import.meta.env.VITE_BASE_URL, 8999)
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

// 友链列表单个刷新
export const setRefreshScreenShot = (params: object) => {
  return axios.post( '/refreshScreenShot', params)
}

