<template>
  <div class="source-link-box">
    <a v-for="item in list" :key="item.title" class="source-link" rel="noreferrer" :href="item.link" target="_blank" :title="item.title">
      {{ item.title }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Sources',
  props: {
    list: {
      required: true,
    },
  },
}
</script>
