import type { AppRouteConfig } from '../types'
import AdminRoutes from './modules/admin'
import LoginRoute from './modules/login'
import { PageNotFoundRoute } from './modules/error'

const RootRoute: AppRouteConfig = {
  path: '/',
  name: 'Root',
  redirect: '/login'
}

export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...AdminRoutes,
  PageNotFoundRoute
]
