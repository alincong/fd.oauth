import { ElNotification, NotificationParamsTyped } from 'element-plus'

const duration = 1500

/**
 * @description 成功信息通知
 * @param message - 通知消息
 */
export function successNotice(message: string = '操作成功') {
  ElNotification.success({
    message,
    duration,
  })
}

/**
 * @description 成功信息通知
 * @param message - 通知消息
 */
export function errorNotice(message: string = '操作失败') {
  ElNotification.error({
    message,
    duration,
  })
}

/**
 * @description 常用错误状态码通知
 * @param status - 状态码
 */
export function errorCodeNotice(status: string) {
  if (typeof status === 'string') {
    errorNotice(httpErrorCode[status])
  } else {
    const check: never = status
  }
}

export const httpErrorCode = {
  401: '您还未授权，请重新登录',
  403: '无权限访问',
  404: '未找到访问的资源',
  500: '服务器错误，请联系管理员',
  503: '服务器过载或正在维护',
  504: '网关超时',
}
