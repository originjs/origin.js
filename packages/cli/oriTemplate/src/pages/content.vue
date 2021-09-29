<template>
  <div class="login">
    <h1>{{ song.singer }} - {{ song.name }}</h1>
    <p v-for="item in song.lyrics">{{ item }}</p>
  </div>
</template>

<script>
import song from '@/assets/when_you_believe.yaml'
export default {
  name: 'lyrics',
  setup() {
    console.log(song)
    return { song }
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

<layout>
layout: empty
</layout>
