
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import(/* webpackChunkName: "city" */'../views/City.vue')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/data/Index'),
    // children: [
    //   {
    //     path: 'top10',
    //     name: 'rank',
    //     component: () => import('../views/data/RankChart')
    //   }
    // ]
  },
  {
    path: '/testchart',
    name: 'TestChart',
    component: () => import('../views/TestChart.vue')
  },
  {
    path: '/top10',
    name: 'rank',
    component: () => import('../views/data/RankChart')
  },
  {
    path: '/increaseChart',
    name: 'increase',
    component: () => import('../views/data/IncreaseChart')
  },
  {
    path: '/shenzhen',
    name: 'shenzhen',
    component: () => import('../views/shenzhen/Index')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // base: '/covid/'
  base: '/'
})

export default router
