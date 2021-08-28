<template>
  <!-- TODO: replace with <rooter-view> -->
  <Index />
  <p class="text-component-desc">layout Home</p>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '../components/Footer.vue'
import Index from '../pages/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Footer,
    Index
  }
})
</script>
