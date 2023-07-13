import type { AppRouteConfig } from '@/router/types'
import AdminLayout from '@/layouts/admin/index.vue'

const AdminRoutes: AppRouteConfig[] = [
  {
    path: '/home',
    name: 'home',
    component: AdminLayout,
    redirect: '/home/dashboard',
    meta: {
      title: '仪表盘',
      icon: 'i-ep-menu'
    },
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        hideMenu: true
      }
    }]
  },
  {
    path: '/system',
    name: 'system',
    component: AdminLayout,
    redirect: '/system/user',
    meta: {
      title: '用户管理',
      icon: 'i-ep-avatar'
    },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/admin/user/index.vue'),
      meta: {
        title: '用户管理',
        hideMenu: true
      }
    },
    {
      path: 'user/detail/:id',
      name: 'user_detail',
      component: () => import('@/views/admin/user/detail.vue'),
      meta: {
        title: '用户详情',
        hideMenu: true,
        activeMenu: '/admin/user'
      }
    }]
  },
  {
    path: '/personal',
    name: 'personal',
    component: AdminLayout,
    redirect: '/personal/info',
    meta: {
      title: '个人信息',
      icon: 'i-ep-info-filled'
    },
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('@/views/admin/personal/index.vue'),
      meta: {
        title: '账户信息'
      }
    },
    {
      path: 'change-password',
      name: 'change_password',
      component: () => import('@/views/admin/personal/change-pwd.vue'),
      meta: {
        title: '修改密码'
      }
    }]
  }
]

export default AdminRoutes
