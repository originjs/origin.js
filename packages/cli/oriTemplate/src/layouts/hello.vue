<template>
  <div>
    <router-view />
    <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
    <button class="normal-btn router-btn" @click="goBack">back</button>
    <p class="text-p">
      Now you can edit files to create your own project. &#128515;
    </p>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'Hello',
  setup() {
    const router = useRouter()
    const { currentRoute } = router
  
    const goBack = () => {
      router.go(-1)
    }
  
    return { currentRoute, goBack }
  }
}
</script>
