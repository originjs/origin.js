<template>
  <div>
    <img
      alt="Origin.js logo"
      src="../assets/originjs.png"
      class="logo logo-large"
    >
    <h2 class="text-h2">Origin.js</h2>
    <p class="text-p">{{ $t("introduction") }}</p>
    <router-view />
    <p class="text-component-desc text-route">
      {{ $t("currentRoute") }}: '{{ currentRoute.fullPath }}'
    </p>
    <sources :list="sourceOpitons" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Default',
  setup() {
    const sourceOpitons = reactive([
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

    return { currentRoute, sourceOpitons }
  }
}
</script>
