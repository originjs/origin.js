<template>
  <div :class="isDark ? 'dark' : 'light'">
    <img
      alt="Origin.js logo"
      src="./assets/originjs.png"
    >
    <HelloWorld msg="Origin.js" />
    <button
      type="button"
      @click="isDark = !isDark"
    >
      click to change theme. current: {{ isDark ? 'dark' : 'light' }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup: () => {
    const isDark = ref(false)
    return { isDark }
  }
})
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
