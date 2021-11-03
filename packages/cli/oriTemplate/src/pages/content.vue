<template>
  <div>
    <h3>File Content</h3>
    <p><b>{{ song.singer }} - {{ song.name }}</b></p>
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
<%_ if (pagesPluginImported) { _%>

<layout>
layout: profile
</layout>
<%_ } _%>
