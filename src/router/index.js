import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/components/layout'

const Index = () => import('@/views/index')
const Home = () => import('@/views/Home')
const About = () => import('@/views/About')

Vue.use(VueRouter)

/**
 * hidden: true  if set true, item will not show in the sidebar
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index,
        meta: {
          title: 'index'
        }
      }, {
        path: '/home',
        component: Home,
        meta: {
          title: 'home'
        }
      }, {
        path: '/about',
        component: About,
        meta: {
          title: 'about'
        }
      }, {
        path: '/about1',
        component: About,
        meta: {
          title: 'about'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
