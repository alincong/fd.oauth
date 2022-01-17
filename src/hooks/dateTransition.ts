/*
 * @Author: your name
 * @Date: 2022-01-07 10:41:07
 * @LastEditTime: 2022-01-07 13:26:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\hooks\dateTransition.ts
 */

interface getDateStrOption {
  separator?: string, // 分隔符样式, type为CN才需要
  type: string, // TIMESTAMP 时间戳 和 CN（字符串格式）
}
/**
 * 
 * @param count 需要前进/后退的天数
 * @param option 需要的格式 时间戳 or 字符串格式例：2022-1-1 
 * ps: 这个hooks 主要是获取最近的日期如：昨天、前天、后天、大后天等..
 * 正数往后推，负数往前推例如-1是昨天， 1是明天
 */
function getDate(count: number, option: getDateStrOption) {
  let nowDate = new Date()
  if (option.type === 'CN') {
    nowDate.setDate(nowDate.getDate() + count)
    var y = nowDate.getFullYear()
    var m = nowDate.getMonth() + 1 //获取当前月份的日期 
    var d = nowDate.getDate()
    return y + "-" + m + "-" + d
  }
  if (option.type === 'TIMESTAMP') {
    // 这里返回时间戳
    return nowDate.getTime() + 3600 * 1000 * 24 * count
  }
}

export {
  getDate
}