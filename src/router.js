import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Login')
    },
    {
      path: '/index',
      component: () => import('./views/Index'),
      children: [
        {
          path: '',
          component: () => import('./views/Home')
        },
        {
          path: '/userList',
          component: () => import('./views/UserList'),
          meta: ['数据管理', '用户列表']
        },
        {
          path: '/videoList',
          component: () => import('./views/VideoList'),
          meta: ['数据管理', '视频列表']
        },
        {
          path: '/addUser',
          component: () => import('./views/AddUser'),
          meta: ['添加数据', '添加用户']
        },
        {
          path: '/addVideo',
          component: () => import('./views/AddVideo'),
          meta: ['添加数据', '添加视频']
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.isLogged && to.path !== '/') {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
