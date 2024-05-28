import axios from './index'

// console.log(import.meta.env.VITE_BASE_URL, 8999)
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

