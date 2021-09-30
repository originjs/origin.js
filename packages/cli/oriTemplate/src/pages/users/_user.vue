<template>
  <div>
    <h3 class="text-h3">{{ $t("userInformation") }}</h3>
    <p><b>{{ $t("username") }}:</b> {{ $route.params.user }}</p>
    <p><b>{{ $t("telephone") }}:</b> 188xxxx6666</p>
    <p><b>{{ $t("address") }}:</b> changan street</p>
  </div>
  <div class="router-link">
    <div>
      <router-link class="text-router-link" to="/">{{
        $t("home")
      }}</router-link>
    </div>
    <div>
      <router-link class="text-router-link" to="/login">{{
        $t("signOut")
      }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<layout>
layout: profile
</layout>
