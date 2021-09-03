<template>
  <!-- TODO: add plugin configurations -->
  <h4 class="text-t4">Origin.js</h4>
  <p class="text-p">You are thinking about: {{ msg }}</p>
  <p class="text-component-desc text-route">current route: '/helloWorld/:message'</p>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
      message: {
          type: String,
          required: false
      }
  },
  setup(props) {
      const msg = props.message
      return { msg }
  }
}
</script>

<layout>
  layout: hello
</layout>