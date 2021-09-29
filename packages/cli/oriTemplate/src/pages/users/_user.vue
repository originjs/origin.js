<template>
  <div class="user-info">
    <h3>User Information</h3>
    <span class="text-span"><b>username:</b> {{ $route.params.user }}</span>
    <span class="text-span"><b>telephone:</b> 188xxxx6666</span>
    <span class="text-span"><b>address:</b> changan street</span>
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
