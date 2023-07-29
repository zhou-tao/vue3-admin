<script setup lang="ts" name="ChangePwd">
  import { useMessage } from '@/hooks/web/useMessage'

  const { $message } = useMessage()
  const $router = useRouter()
  const passwordFormRef = ref()
  const formData = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const formRules = {
    oldPassword: [
      { required: true, message: '请输入原密码', trigger: 'blur' }
    ],
    newPassword: [
      { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPassword: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('请再次输入新密码'))
          }
          else if (value !== formData.newPassword) {
            callback(new Error('两次输入的密码不一致!'))
          }
          else {
            callback()
          }
        }
      }
    ]
  }

  async function submit() {
    const valid = await passwordFormRef.value.validate()
    if (!valid) return
    $message.success('修改成功！请重新登录')
    $router.replace('/login')
  }
</script>

<template>
  <div page-card flex justify="center">
    <el-form
      ref="passwordFormRef"
      size="large"
      :model="formData"
      :rules="formRules"
      label-position="left"
      label-width="80px"
      status-icon
      class="w-120"
      mt-16
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="再次输入" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">
          保存
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
