import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<%_ plugins.forEach(function(plugin){ _%>
import <%= plugin.name %> from '<%= plugin.package %>'
  <%_ }) _%>
// https://vitejs.dev/config/
export default defineConfig({
  plugins:[vue()<%_ plugins.forEach( function(plugin) { _%>,<%= plugin.name %>()<%_ }) _%>],
})
