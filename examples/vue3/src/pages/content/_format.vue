<template>
  <div v-if="validFormats.includes($route.params.format)">
    <PrintFilObj :format="$route.params.format" />
  </div>
  <div v-else>
    <h2>format {{ $route.params.format }} is not support !!</h2>
  </div>
</template>

<script>
import PrintFilObj from '../../component/printFileObj.vue'

export default {
  name: 'Format',
  components: { PrintFilObj },
  setup() {
    const validFormats = ['csv', 'ini', 'plist', 'properties', 'toml', 'xlsx', 'xml', 'yaml']
    return { validFormats }
  },
}
</script>

<style scoped>

</style>

<layout>
  layout: content
</layout>
