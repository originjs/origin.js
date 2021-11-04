<template>
  <div>
    <h3>{{ $t("fileContent") }}</h3>
    <div class="card-box">
      <p><b>{{ song.singer }} - {{ song.name }}</b></p>
      <p v-for="item in song.lyrics">{{ item }}</p>
    </div>
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
