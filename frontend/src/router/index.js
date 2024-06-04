import { createRouter, createWebHistory } from 'vue-router'
import RestPage from '../components/RestPage.vue'
import ArticlesPage from '../components/ArticlesPage.vue'
import StatsPage from '../components/StatsPage.vue'
import SuiviPage from '../components/SuiviPage.vue'
import ProfilePage from '../components/ProfilePage.vue'

const routes = [
  {
    path: '/rest',
    name: 'rest',
    component: RestPage
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesPage
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsPage
  },
  {
    path: '/suivi',
    name: 'suivi',
    component: SuiviPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
