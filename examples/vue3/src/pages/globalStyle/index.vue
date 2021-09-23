<template>
  <div>
    <a id="scss_test">The color of this part is influenced by global scss</a>
    <br>
    <a id="less_test">The color of this part is influenced by global less</a>
    <br>
    <a id="stylus_test">The color of this part is influenced by global stylus</a>
  </div>
</template>

<script>
import '@/assets/test.scss'
import '@/assets/test.less'
import '@/assets/test.styl'

export default {
  name: 'GlobalStyle',
}
</script>

<style scoped>

</style>

<layout>
layout: content
</layout>
