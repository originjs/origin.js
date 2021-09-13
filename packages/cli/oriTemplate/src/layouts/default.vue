<template>
  <div>
    <router-view />
    <p class="text-component-desc text-route">current route: '{{ currentRoute.fullPath }}'</p>
    <input class="normal-input message-input" v-model="message" placeholder="try to type something" />
    <button class="normal-btn router-btn" :class="btnIsDisabled ? 'router-btn-disabled' : ''" @click="toHelloWorld">go</button>
    <sources :list="sourceOpitons" />
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Default',
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

    const btnIsDisabled = ref(true)
  
    const toHelloWorld = () => {
      if (!btnIsDisabled.value) {
        router.push(`/helloWorld/${message.value}`)
      }
    }

    watchEffect(() => {
      btnIsDisabled.value = !Boolean(message.value)
    })
  
    return { currentRoute, sourceOpitons, message, btnIsDisabled, toHelloWorld }
  }
}
</script>
