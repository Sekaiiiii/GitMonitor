import Vue from 'vue'
import App from './App.jsx'
import router from './router'
import store from './store'
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false
Vue.use(Ant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
