<template>
  <HelloWorld msg='Origin.js\n current route: /hello' />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'Hello',
  components: {
    HelloWorld
  }
})
</script>
