<script setup lang="ts" name="LoginForm">
  import { useMessage } from '@h/web/useMessage'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'
  import type { LoginParams } from '@/api/_auth/model'
  import config from '@/config'

  const router = useRouter()
  const { $notify, $message } = useMessage()
  const loginForm = reactive<LoginParams>({
    username: '',
    password: '',
    rememberMe: false
  })
  const loginFormRef = ref<FormInstance>()
  const loginRules = reactive<FormRules>({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  const loading = ref<boolean>(false)

  async function doLogin(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (!valid) return false
      loading.value = true
      setTimeout(() => {
        loading.value = false
        $message.success({
          message: '登录成功'
        })
        router.push('/home')
        $notify({
          title: 'Welcome',
          message: '欢迎登录',
          type: 'success'
        })
      }, 1500)
    })
  }
</script>

<template>
  <div
    w="21rem"
    bg="#ffffff90"
    dark:bg="#22222290"
    px="8"
    py="6"
    rounded-xl
    shadow-xl
  >
    <h1 text="3xl brand-gradient center" font="bold mono" m="t-lg b-0" select-none>
      {{ config.APP.title }}
    </h1>
    <div m="t-12 mt-11" flex="~ col">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            size="large"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item prop="password" :style="{ marginTop: '38px' }">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            placeholder="密码"
            show-password
            @keyup.enter="doLogin(loginFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <div w="360px" flex="center" justify="between">
            <el-checkbox v-model="loginForm.rememberMe">
              记住密码
            </el-checkbox>
            <span
              text="sm primary"
              cursor="pointer"
            >
              忘记密码?
            </span>
          </div>
        </el-form-item>
        <el-form-item :style="{ marginTop: '36px' }">
          <el-button
            auto-insert-space
            w="full"
            size="large"
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="doLogin(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form) {
  .el-input__wrapper, .el-checkbox__inner {
    @apply bg-transparent;

    &::after {
      @apply b-primary;
    }
  }

  .el-checkbox__label {
    @apply font-normal;
  }
}

.divider {
  @apply flex-center my-4;

  div {
    @apply px-3 text-xs text-secondary tracking-1px;
  }

  &::before, &::after {
    @apply content-none flex-1 h-1px bg-[var(--el-border-color)];
  }
}

.link {
  @apply cursor-pointer mx-4 hover:text-regular transition-base;
}
</style>
