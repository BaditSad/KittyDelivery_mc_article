import { createRouter, createWebHistory } from 'vue-router'
import RestPage from '../components/RestPage.vue'

const routes = [
  {
    path: '/rest',
    name: 'rest',
    component: RestPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
