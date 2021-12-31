export default {
  showNotice: true,
  cacheCode: true,
  cancelRepeat: true,
} as Options

export interface Options {
  // 是否展示提示消息
  showNotice?: boolean;
  // 隐藏code，直接返回data
  cacheCode?: boolean;
  // 取消重复请求
  cancelRepeat?: boolean;
  // 成功提示
  successMessage?: string;
  // 错误提示
  errorMessage?: string;
}
