import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import { store, key } from './store'
import SubNavigation from './components/sub-navigation/Index.vue'

const app = createApp(App);
app
  .use(router)
  .use(store, key)
  .use(ElementPlus)
  .component('SubNavigation', SubNavigation)
  .mount('#app')
