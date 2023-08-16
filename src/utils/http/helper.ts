import type { AxiosResponse } from 'axios'
import { VITE_BASE_API } from 'vite-env'
import type { RequestConfig, Result } from '#/http'
import { ErrorCodeEnum, HttpMethodEnum, CodeEnum } from '@/enums/httpEnum'
import { alertErrMsg } from '@/utils/message'

// 生成token
export const generateBaseToken = (token: Nullable<string>) => `bearer ${token}`

// 获取默认请求前缀地址
export const getDefaultBaseURL = () => {
  return VITE_BASE_API
}

// 请求数据转换
export const transformRequest = (config: RequestConfig): RequestConfig => {
  const { data, params, method } = config
  // GET方法时 params来自 自身 或者 data
  if (method === HttpMethodEnum.GET) {
    config.params = params || data
    config.data = undefined
  }
  return config
}

// 响应数据转换
export const transformResponse = (
  res: AxiosResponse<Result>,
  config: RequestConfig
) => {
  if (!config.isTransformResponse) {
    return res.data
  }
  const { code, data, message: msg } = res.data
  if (code === CodeEnum.SUCCESS) {
    return data
  }
  else {
    alertErrMsg(`${ErrorCodeEnum.B}${code}`, msg)
    throw new Error(code.toString())
  }
}
