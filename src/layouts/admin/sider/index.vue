<script setup lang="ts" name="LayoutSider">
  import { storeToRefs } from 'pinia'
  import Menu from './components/menu/index.vue'
  import LogoView from './components/LogoView.vue'
  import { useSettingStore } from '@/store/modules/setting'

  const { isVerticalMenu, menuCollapsed } = storeToRefs(useSettingStore())
</script>

<template>
  <el-aside
    v-if="isVerticalMenu"
    :width="menuCollapsed ? '54px' : '260px'"
    border-r="solid root_light"
    dark:border-r="root_dark"
    overflow-x="hidden"
    pb="12"
    box="border"
    bg="page"
    transition-width
    duration-400
    ease-in-out
  >
    <LogoView />
    <Menu />
  </el-aside>
</template>
