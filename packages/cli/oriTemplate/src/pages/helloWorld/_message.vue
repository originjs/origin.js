<template>
  <h4 class="text-t4">Origin.js</h4>
  <p class="text-p">you are thinking about '{{ message }}', that's awesome!</p>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'HelloWorld',
  props: {
      message: {
          type: String,
          required: false
      }
  },
  setup() {
    const router = useRouter()
    const { currentRoute } = router
    const { message = '' } = currentRoute.value.params
  
    return { message }
  }
}
</script>

<layout>
  layout: hello
</layout>
