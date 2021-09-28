<template>
  <div class="default-layout">
    <h1>default layout</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Default',
}
</script>

<style scoped>
.default-layout {
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
