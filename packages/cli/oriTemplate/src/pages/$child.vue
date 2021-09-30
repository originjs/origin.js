<template>
  <p class="p-child">{{ $t("nestedRouteIntroduction") }}</p>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<layout>
layout: empty
</layout>

<style scoped>
.p-child {
  font-size: .9rem;
}
</style>
