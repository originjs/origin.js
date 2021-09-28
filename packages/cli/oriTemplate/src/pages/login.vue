<template>
  <div class="login">
    <label for="username">username</label>
    <input class="normal-input message-input" type="text" v-model="user.username" />
    <label for="password">password</label>
    <input class="normal-input message-input" type="text" v-model="user.password" />
    <router-link :to="'/users/' + user.username" class="normal-btn router-btn">Login</router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'login',
  setup() {
    const user = reactive({ username: '', password: ''})

    return { user }
  }
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>