import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('../views/Learn.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue')
    },
        {
      path: '/search/results',
      name: 'search-results',
      component: () => import('../views/SearchResults.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/Compare.vue')
    }
  ]
})

export default router
