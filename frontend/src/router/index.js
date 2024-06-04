import { createRouter, createWebHistory } from 'vue-router'
import TechnicianPage from '@/components/TechnicianPage.vue'
import LogsDevPage from '@/components/LogsDevPage'
import LogsStatsPage from '@/components/LogsStatsPage.vue'
import NewServicesPage from '@/components/NewServicesPage.vue'
import ResolvePage from '@/components/ResolvePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/technician'
  },
  {
    path: '/technician',
    name: 'technician',
    component: TechnicianPage
  },
  {
    path: '/logsdev',
    name: 'logsdev',
    component: LogsDevPage
  },
  {
    path: '/logsstats',
    name: 'logsstats',
    component: LogsStatsPage
  },
  {
    path: '/newservices',
    name: 'newservices',
    component: NewServicesPage
  },
  {
    path: '/resolve',
    name: 'resolve',
    component: ResolvePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
