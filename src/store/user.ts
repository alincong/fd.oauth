import { Module, ActionContext } from 'vuex'
import { State } from './index'
import { login } from '@/api/login'
import { setLocalStorage } from '@/utils/storage'

// 状态
const state = (): UserState => ({
  authorization: '',
  real_name: '',
  username: '',
})

export interface UserState {
  authorization: string;
  real_name: string;
  username: string;
}

// 异步
const actions = {
  getUserInfo: async (context: ActionContext<UserState, {}>, data: { username: string, password: string }) => {
    let res = {} as any
    try {
      res = await login(data).request()
      console.log(res, 'vuex')
    } catch (error) {
      console.log(error, 'error')
    }
    context.commit('setUserInfo', {
      authorization: "Bearer nTYEm7oNMGChXer3AhIy4cBkTYcQfdUOdJJVuQ3X",
      real_name: "超级管理员",
      username: "FD-0001",
    })
  }
}

// 同步
const mutations = {
  setUserInfo: (state: UserState, data: UserState) => {
    setLocalStorage('token', 'nTYEm7oNMGChXer3AhIy4cBkTYcQfdUOdJJVuQ3X', true)
    Object.keys(data).forEach(key => state[key] = data[key])
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
} as Module<UserState, State>
