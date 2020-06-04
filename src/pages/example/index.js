import Vue from 'vue'
import Index from './index.vue'
// import Toast from 'vue2-toast'
// import VueLazyload from 'vue-lazyload'
import router from './router/index'
import store from './store/index'
import { getUrlParams, apiPost } from '../../utils/api'
// import sensors from '../../utils/saCollectDataNode'
// import 'vue2-toast/lib/toast.css'
// Vue.use(VueLazyload, {
//   error: '//wxstatic.ybren.com/Public/wap/zhanwei2.png',
//   loading: '//wxstatic.ybren.com/Public/wap/zhanwei2.png'
// })
// // 第三方插件
// Vue.use(Toast, {
//   type: 'center',
//   wordWrap: true,
//   width: '200px'
// })
Vue.prototype.apiPost = apiPost
Vue.prototype.getUrlParams = getUrlParams

new Vue({
  router,
  store,
  render: h => h(Index)
}).$mount('#app')
