<template>
  <div>
    <h3>{{ $t("userInformation") }}</h3>
    <div class="card-box">
      <p><b>{{ $t("username") }}:</b> {{ $route.params.user }}</p>
      <p><b>{{ $t("telephone") }}:</b> 188xxxx6666</p>
      <p><b>{{ $t("address") }}:</b> changan street</p>
    </div>
  </div>
  <div class="router-link">
    <div><router-link class="text-router-link" to="/">{{ $t("home") }}</router-link></div>
    <div><router-link class="text-router-link" to="/login" replace>{{ $t("signOut") }}</router-link></div>
  </div>
</template>

<script>
export default {
}
</script>

<layout>
layout: profile
</layout>
