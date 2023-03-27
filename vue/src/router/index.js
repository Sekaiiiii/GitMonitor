import Vue from 'vue'
import VueRouter from 'vue-router'

import FrontPage from '@/layout/FrontPage/Index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'frontPage',
    component: FrontPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
