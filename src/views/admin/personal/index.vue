<script setup lang="ts" name="Personal">
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
</script>

<template>
  <div page-card>
    <el-descriptions size="large" title="用户信息" :column="2" border>
      <el-descriptions-item label="用户名">{{ userStore.username }}</el-descriptions-item>
      <el-descriptions-item label="头像">
        <img
          ref="avatar"
          :src="userStore.avatar"
          alt="avatar"
          width="80"
          rounded
          cursor="pointer"
        />
      </el-descriptions-item>
      <el-descriptions-item label="姓名">{{ userStore.name }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ userStore.gender === '1' ? '男' : '女' }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ userStore.mobile }}</el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag v-for="role in userStore.roles" :key="role.id" type="success">{{ role.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="部门">{{ userStore.deptName }}</el-descriptions-item>
      <el-descriptions-item label="岗位">
        <el-tag v-for="post in userStore.posts" :key="post.id" type="warning" class="mx-1">{{ post.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="个人说明">树叶的一生，只是为了归根么？</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="scss" scoped></style>
