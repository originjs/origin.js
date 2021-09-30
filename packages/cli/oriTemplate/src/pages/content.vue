<template>
  <div>
    <h3 class="text-h3">{{ song.singer }} - {{ song.name }}</h3>
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

<layout>
layout: profile
</layout>