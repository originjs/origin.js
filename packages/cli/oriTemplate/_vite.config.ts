import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<%_ plugins.forEach(function(plugin){ _%>
import <%= plugin.name %> from '<%= plugin.package %><%_ if (plugin.path) { _%><%= plugin.path %><%_ } _%>'
<%_ }) _%>

// https://vitejs.dev/config/
export default defineConfig({
  plugins:[
    vue()<%_ plugins.forEach( function(plugin) { -%>,
    <%= plugin.name -%>(<%_ if (plugin.options) { _%><%- plugin.options %><%_ } _%>)<%_ }) %>
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
  }
})
