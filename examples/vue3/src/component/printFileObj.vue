<template>
  <div>
    <h2>test.{{ format }} file data</h2>
    <pre>{{ str }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue'

function getString(format, obj) {
  if (format === 'xlsx') {
    const sheet = obj.Sheets[obj.SheetNames[0]]
    return JSON.stringify(sheet, null, 2)
  }
  return JSON.stringify(obj, null, 2)
}

export default {
  name: 'PrintFilObj',
  props: {
    format: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let str = ref('')
    import(`../assets/test.${props.format}`).then(res => {
      str.value = getString(props.format, res.default)
    })
    return { str }
  },
}
</script>

<style scoped>

</style>
