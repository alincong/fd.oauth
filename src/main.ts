import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import SubNavigation from './components/sub-navigation/Index.vue'

const app = createApp(App);
app
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .component('SubNavigation', SubNavigation)
  .mount('#app')

// 全局修改 element-plus 样式为 small
app.config.globalProperties.$ELEMENT = {
  size: 'small',
}
