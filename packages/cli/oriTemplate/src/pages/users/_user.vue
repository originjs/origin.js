<template>
  <div class="user-info">
    <h1>User Information</h1>
    <span><b>username:</b> {{ $route.params.user }}</span>
    <span><b>telephone:</b> 188xxxx6666</span>
    <span><b>address:</b> changan street</span>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<layout>
layout: profile
</layout>
