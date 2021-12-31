const DEFAULT_EXPIRE_TIMEOUT = 60 * 60 * 24 // 默认过期时间为1天

/**
 * @description 设置localStorage
 * @param key - localStorage - key
 * @param value - localStorage - value 
 * @param isEnableValid - 是否开启校验有效期
 * @param expire - 过期时间，单位秒，需要开启校验有效期，默认1天
 */
export function setLocalStorage<T>(key: string, value: T, isEnableValid: boolean = false, expire?: number) {
  let data = { value } as LocalStorageData<T>
  if (isEnableValid) {
    // 当前时间 - 秒级时间戳
    const currentTime = Math.round(Date.now() / 1000)
    data.expire = currentTime + (typeof expire === 'number' ? expire : DEFAULT_EXPIRE_TIMEOUT)
  }
  // 存储
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * @description 获取localStorage，如果开启校验一个未设置有效期的key，返回失败值
 * @param key - localStorage - key
 * @param failVal - 获取失败时返回值
 * @param isEnableValid - 是否开启有效期校验
 */
export function getLocalStorage<T = any, K = null>(key: string, failVal: K, isEnableValid: boolean = false) {
  const data = localStorage.getItem(key)
  if (!data) return failVal

  const { expire, value } = JSON.parse(data) as LocalStorageData<T>
  const currentTime = Math.round(Date.now() / 1000)
  // 未开启有效期校验
  if (!isEnableValid) return value
  // 获取无设置有效期的key，返回失败值
  if (typeof expire === 'undefined') return failVal
  return expire > currentTime ? value : failVal
}

interface LocalStorageData<T> {
  value: T;
  expire?:  number;
}
