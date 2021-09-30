<template>
  <div class="login">
    <input class="normal-input userinfo-input" placeholder="username" type="text" v-model="user.username" />
    <input class="normal-input userinfo-input" placeholder="password" type="password" v-model="user.password" />
    <button @click="toUsers" class="normal-btn router-btn" :class="btnIsDisabled ? 'router-btn-disabled' : ''">{{ $t("login") }}</button>
  </div>
</template>

<script>
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  setup() {
    const router = useRouter()

    const btnIsDisabled = ref(true)

    const user = reactive({ username: '', password: ''})
    const toUsers = () => {
      if (!btnIsDisabled.value) {
        router.push(`/users/${user.username}`)
      }
    }

    watchEffect(() => {
      btnIsDisabled.value = !Boolean(user.username && user.password)
    })

    return { btnIsDisabled, user, toUsers }
  }
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}
</style>
