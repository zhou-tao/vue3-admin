export const PageNotFoundRoute = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/views/error/not-found.vue'),
  hidden: true,
  meta: {
    title: '404 Not Found',
    requiresAuth: false
  }
}
