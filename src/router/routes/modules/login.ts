import type { AppRouteConfig } from '@/router/types'

const LoginRoute: AppRouteConfig = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    requiresAuth: false
  }
}

export default LoginRoute
