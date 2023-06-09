import Vue from 'vue'
import VueRouter from 'vue-router'

import FrontPage from '@/layout/FrontPage/Index';
import RepoTable from '@/views/repo/RepoTable';
import RepoForm from '@/views/repo/RepoForm';
import HomePage from '@/views/HomePage';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'frontPage',
    component: FrontPage,
    children: [
      {
        name: 'homePage',
        path: '/',
        component: HomePage,
        meta: {
          breadcrumbName: '首页'
        },
      },
      {
        name: 'RepoTable',
        path: 'repoTable',
        component: RepoTable,
        meta: {
          breadcrumbName: '仓库列表'
        }
      },
      {
        name: 'RepoForm',
        path: 'repoForm',
        component: RepoForm,
        meta: {
          breadcrumbName: '仓库表单'
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
