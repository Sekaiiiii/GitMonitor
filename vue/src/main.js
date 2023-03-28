import Vue from 'vue'
import App from './App.jsx'
import router from './router'
import store from './store'
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false
Vue.use(Ant)

router.beforeEach((to, from, next) => {
  if (to.fullPath === from.fullPath) {
    next(false);
  }
  if (to.matched.length === 0) {
    next({ name: 'homePage' })
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
