<template>
  <h4 class="text-t4">{{ title }}</h4>
  <p class="text-p">See <code class="text-code">README.md</code> for more information.</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Description',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
