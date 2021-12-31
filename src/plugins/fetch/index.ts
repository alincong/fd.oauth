import axios, { AxiosRequestConfig, Canceler, AxiosResponse, AxiosError } from 'axios'
import { getLocalStorage } from '../../utils/storage'
import { addPending, removePending } from './cancel'
import defaultOptions, { Options } from './default-options'
import { errorNotice, successNotice, errorCodeNotice, httpErrorCode } from './notificationer'

/**
 * @description 请求函数
 * @param baseConfig - 请求参数
 * @param options - 额外配置项
 * @returns request/调用请求方法, cancel/取消请求方法
 */
function fetch(baseConfig: AxiosRequestConfig, options: Options = {}) {
  options = { ...defaultOptions, ...options }

  // 取消请求函数
  let cancelToken: (Canceler | null) = null

  // 创建Axios实例
  const instace = axios.create({
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/api' : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 60000,
    headers: {}
  })

  // 请求拦截器设置
  instace.interceptors.request.use(
    (config) => {
      // 设置 cancelToken
      config.cancelToken = baseConfig.cancelToken || new axios.CancelToken(function(c) {
        cancelToken = c
      })
      // 获取token，如果存在带上请求头
      const token = getLocalStorage('token', null)
      if (token) {
        config.headers.Authorization = `Bear ${token}`
      }
      // 开启取消重复请求
      options?.cancelRepeat && addPending(baseConfig, cancelToken)
      return config
    },
    // 失败
    (err) => Promise.reject(err)
  )

  // 响应拦截设置
  instace.interceptors.response.use(
    (response: AxiosResponse) => {
      removePending(baseConfig)
      return response
    },
    (err: AxiosError) => Promise.reject(err)
  )

  /**
   * @description 请求函数
   */
  const request = () => {
    return new Promise((resolve, reject) => {
      instace(baseConfig)
        .then((res: AxiosResponse<ResponseData>) => {
          const { data } = res
          if (data.code === 0) {
            // 是否开启消息提示
            options?.showNotice && successNotice(options.successMessage || data.message)
            resolve(options?.cacheCode ? data.data : data)
          }
          // 状态不为成功
          options?.showNotice && errorNotice(options.errorMessage || data.message)
          reject(new Error(data.message))
        })
        .catch((err: AxiosError<ResponseData>) => {
          const errCode = err.response?.status.toString() as string
          Object.keys(httpErrorCode).includes(errCode) ?
            errorCodeNotice(errCode) :
            options?.showNotice && errorNotice(options?.errorMessage || err.response?.data.message)
          reject(err)
        })
    })
  }

  /**
   * @description 取消请求函数
   */
  const cancel = () => {
    cancelToken && cancelToken()
  }

  return {
    request,
    cancel
  }
}

export default fetch

interface ResponseData {
  code: number;
  data: any;
  message: string;
  status: boolean;
}
