import qs from 'qs'
import { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from '@/utils/is-type'

let pendingMap = new Map<string, Canceler|null>()

const getPendingKey = (config: AxiosRequestConfig) => 
  [config.url, config.method, qs.stringify(config.data), qs.stringify(config.params)].join('&')


/**
 * @description 添加请求
 * @param config - 请求配置信息
 * @param cancel - 取消请求器
 */
export function addPending(config: AxiosRequestConfig, cancel: Canceler | null) {
  // 重置请求集合
  const key = getPendingKey(config)
  removePending(config)
  !pendingMap.has(key) && pendingMap.set(key, cancel)
}

/**
 * @description 移除集合中的请求
 * @param config - 请求配置信息
 */
export function removePending(config: AxiosRequestConfig) {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    const cancel = pendingMap.get(key)
    // 取消请求
    cancel && isFunction(cancel) && cancel()
    // 移除集合中的请求
    pendingMap.delete(key)
  }
}
