<template>
  <ul id="file links">
    <li
      v-for="path in paths"
      :key="path"
    >
      <router-link :to="path">
        {{ path }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Content',
  setup() {
    const validFormats = ['csv', 'ini', 'plist', 'properties', 'toml', 'xlsx', 'xml', 'yaml']
    const paths = validFormats.map(format => `/content/${format}`)
    return { paths }
  },
}
</script>

<style scoped>

</style>

<layout>
  layout: content
</layout>
