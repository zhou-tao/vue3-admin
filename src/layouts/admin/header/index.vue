<script setup lang="ts" name="LayoutHeader">
  import { storeToRefs } from 'pinia'
  import Breadcrumb from './components/Breadcrumb.vue'
  import ThemeSwitch from '@/components/ThemeSwitch'
  import LogoView from '@/layouts/admin/sider/components/LogoView.vue'
  import Menu from '@/layouts/admin/sider/components/menu/index.vue'
  import { useUserStore } from '@/store/modules/user'
  import { useSettingStore } from '@/store/modules/setting'
  import { isSupported, isFullScreen, toggleFullScreen, autoRemoveListener } from '@/hooks/web/useFullScreen'
  import { MenuLayout } from '@/enums/menuEnum'

  const { username, avatar } = storeToRefs(useUserStore())
  const settingStore = useSettingStore()
  const {
    hasBreadcrumb,
    menuCollapsed,
    isVerticalMenu
  } = storeToRefs(settingStore)

  autoRemoveListener()
</script>

<template>
  <div
    h="header"
    px-6
    flex
    items="center"
    justify="between"
    border-b="solid root_light"
    dark:border-b="root_dark"
  >
    <div flex items="center" gap="6">
      <span v-if="isVerticalMenu" cursor="pointer" leading="0" @click="settingStore.toggleCollapse()">
        <div v-show="menuCollapsed" i-ep-expand />
        <div v-show="!menuCollapsed" i-ep-fold />
      </span>
      <LogoView v-else mr="6" />
      <Breadcrumb v-if="hasBreadcrumb && isVerticalMenu" />
    </div>
    <Menu v-if="!isVerticalMenu" :mode="MenuLayout.HORIZONTAL" />
    <div flex items="center" gap="5">
      <div v-if="isSupported" class="icon-view" @click="toggleFullScreen">
        <div v-show="!isFullScreen" i-ep-full-screen />
        <div v-show="isFullScreen" i-app-fullscreen-exit />
      </div>
      <el-dropdown>
        <el-badge is-dot leading="none">
          <div class="icon-view">
            <div i-ep-bell-filled />
          </div>
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              您有一条新消息！
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <ThemeSwitch />
      <div cursor="pointer" ml="6">
        <el-dropdown>
          <div flex items="center">
            <el-image fit="cover" :src="avatar" alt="avatar" w-8 h-8 rounded-full shadow-lg b="solid light opacity-40" />
            <span text="base" ml="2">{{ username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/personal/info')">
                <div i-ep-user />个人中心
              </el-dropdown-item>
              <el-dropdown-item
                divided
                @click="$router.replace('/login?redirect=logout')"
              >
                <div i-ep-switch-button />注销登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-view {
  @apply w-8 h-8 rounded-full flex-center bg-light cursor-pointer text-18px transition-base hover:bg-light_hover;
}

:deep(.el-dropdown [role=button]) {
  outline: none;
}
</style>
