<template>
  <!-- TODO: add plugin configurations -->
  <Description title='Origin.js' />
  <p class="text-component-desc">current route: /index</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Description from '../components/Description.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Description
  }
})
</script>
