/*
 * @Author: your name
 * @Date: 2021-12-31 15:32:39
 * @LastEditTime: 2022-01-12 15:05:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oauth.fandow.com\src\constants\application-manage\Astatic-variable.ts
 */
interface TimeOptions {
  id: number,
  name: string,
  describe: string,
  value: string | number,
  timeVal: string | number,
  url?: string
}

const expirationTime: Array<TimeOptions> = [{
  id: 0,
  name: '授权码过期时间',
  describe: '兑换 token 的授权码过期时间（建议 600 秒），若在有效期内未使用，则导致所有身份或资源凭证无法兑换，最终无法进行登录。',
  value: 0,
  timeVal: 0,
}]

const timeTypeOptions = [{
  id: 0,
  label: '秒',
  value: 0,
}]

const listRule = {
  name: [
    {
      required: true,
      message: '输入应用名称',
      trigger: 'blur',
    }
  ],
  appUrl: [
    {
      required: true,
      message: '请输入登录回调 URL',
      trigger: 'blur',
    }
  ],
}

export {
  expirationTime,
  timeTypeOptions,
  listRule,
}