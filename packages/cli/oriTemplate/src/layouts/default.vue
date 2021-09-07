<template>
  <div>
    <router-view />
    <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
    <input class="normal-input message-input" v-model="message" placeholder="try to type something" />
    <button class="normal-btn router-btn" @click="toHelloWorld">go</button>
    <Sources :list="sourceOpitons" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Sources from '../components/Sources.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Default',
  components: {
    Sources
  },
  setup() {
    const sourceOpitons = ref([
      {
        title: 'github',
        link: 'https://github.com/originjs/origin.js'
      },
      {
        title: 'docs',
        link: 'https://originjs.github.io/docs/'
      }
    ])
  
    const router = useRouter()
    const { currentRoute } = router
  
    const message = ref('')
  
    const toHelloWorld = () => {
      router.push(`/helloWorld/${message.value}`)
    }
  
    return { currentRoute, sourceOpitons, message, toHelloWorld }
  }
}
</script>
