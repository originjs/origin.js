<template>
  <div class="login">
    <label for="username">username</label>
    <input
      v-model="user.username"
      type="text"
    >
    <label for="password">password</label>
    <input
      v-model="user.password"
      type="text"
    >
    <router-link :to="'/users/' + user.username">
      Login
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Login',
  setup() {
    const user = reactive({ username: '', password: '' })

    return { user }
  },
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
