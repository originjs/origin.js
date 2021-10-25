<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div style="
  margin-left: 10%;
  margin-right: 10%;">
    <h1 style="color: cornflowerblue ">This is a remote component</h1>
    <hr>
    <br>
    <h1>vite-plugin-federation</h1>
    <p>
      <a href="https://github.com/originjs/vite-plugin-federation/actions/workflows/ci.yml"><img
          src="https://github.com/originjs/vite-plugin-federation/actions/workflows/ci.yml/badge.svg?branch=main"
          alt="Build Status"></a>
      <a href="https://www.npmjs.com/package/@originjs/vite-plugin-federation"><img
          src="https://badgen.net/npm/v/@originjs/vite-plugin-federation" alt="Version"></a>
      <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg"
                                                           alt="Node Compatibility"></a>
      <a href="https://www.npmjs.com/package/@originjs/vite-plugin-federation"><img
          src="https://badgen.net/npm/license/@originjs/vite-plugin-federation" alt="License"></a>
    </p>
    <p>{{ msg }}</p>

    <p>See <code><a href="https://github.com/originjs/vite-plugin-federation">README.md</a></code> for more information.
    </p>

    <br>
    <br>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
