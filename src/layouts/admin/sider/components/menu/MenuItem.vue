<script setup lang="ts" name="MenuItem">
  import type { RouteRecordName } from 'vue-router'
  import type { Menu, MenuItemComponent } from '@h/logic/useMenu'

  const props = defineProps<{
    component: MenuItemComponent
    title: string
    index: RouteRecordName | undefined
    icon?: string
    children?: Menu[]
  }>()

  const isSubMenu = computed(() => !!props.children?.length)
</script>

<template>
  <component :is="component" :index="index as any">
    <div v-if="icon && !isSubMenu" :class="`icon ${icon}`" />
    <template #title>
      <div v-if="icon && isSubMenu" :class="`icon ${icon}`" />
      <span>{{ title }}</span>
    </template>
    <template v-if="children?.length">
      <MenuItem v-for="child in children" :key="child.index" v-bind="child" />
    </template>
  </component>
</template>
