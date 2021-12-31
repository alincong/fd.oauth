import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import user, { UserState } from './user'

/**
 * 生成密钥，提供 useStore 调用时传入，让TS更好的类型推断
 */
export const key: InjectionKey<Store<State>> = Symbol();

/**
 * 将 Vuex 模块化分割
 * 模块开启命名空间，
 * 使用 mutation / action
 *   commit('module/mutationsMethods')
 *   dispatch('模块空间命名/模块action方法')
 */
export const store = createStore({
  modules: {
    user,
  },
})

export interface State {
  user: UserState
}

/**
 * 简化通过vuex创建useStore都需要传入key来支持ts类型
 */
export function useStore() {
  return baseUseStore(key)
}

/**
 * 为 `this.$store` 提供类型声明
 */
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}


