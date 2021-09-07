<template>
  <div class="source-link-box">
    <a v-for="item in list" :key="item.title" class="source-link" rel="noreferrer" :href="item.link" target="_blank" :title="item.title">
      {{ item.title }}
    </a>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

type SourceInfo = {
  title: string
  link: string 
}
export default {
  name: 'Sources',
  props: {
    list: {
      type: Array as PropType<SourceInfo[]>,
      required: true,
    },
  },
}
</script>
