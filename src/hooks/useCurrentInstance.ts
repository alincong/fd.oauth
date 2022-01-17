/*
 * @Author: your name
 * @Date: 2021-12-31 11:26:41
 * @LastEditTime: 2022-01-04 10:00:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \oms.fandow.come:\my_work\oauth.fandow.com\src\hooks\useCurrentInstance.ts
 */
/**
 * 在v3中，使用setup()来代替了以前data、methods函数等。
 * 因为，setup执行是在created之前。所以，没有this。但是又想使用$parent,$refs等方法
 * PS: 只暴露给高阶使用场景，典型的比如在库中。强烈反对在应用的代码中使用getCurrentInstance。
 * 请不要把它当做在组合式API中获取this的替代方案来使用
 */
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
    const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance
    const globalProperties = appContext.config.globalProperties
    return {
        appContext,
        globalProperties,
        proxy
    }
}