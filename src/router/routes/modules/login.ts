import type { AppRouteConfig } from '@/router/types'

const LoginRoute: AppRouteConfig = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'menu.login',
    requiresAuth: false
  }
}

export default LoginRoute
