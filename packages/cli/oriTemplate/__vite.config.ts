import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
<%_ plugins.forEach(function(plugin){ _%>
import <%= plugin.name %> from '<%= plugin.package %><%_ if (plugin.path) { _%><%= plugin.path %><%_ } _%>'
<%_ }) _%>

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src'),
    }],
  },
<%_ if (federationPluginImported && federationType == 'Remote') { _%>
  server: {
    port: 3072
  },
  build:{
    rollupOptions: {
      external: 'semver/functions/satisfies',
    },
  },
<%_ } _%>
  plugins:[
    <%_ if (markdownPluginImported) { _%>
    vue({
      include: [/\.vue$/, /\.md$/],
    })<%_ } else { _%>
    vue()<%_ } _%><%_ plugins.forEach( function(plugin) { -%>,
<%_ if (plugin.name == 'federation') { _%>
<%_ if (federationPluginImported && federationType == 'Host') { _%>
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        remote: 'http://localhost:3072/remoteEntry.js',
      },
      shared: ['vue'],
    }),<%_ } else { _%>
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteComponent': './src/components/HelloWorld.vue',
      },
      shared: ['vue'],
    }),<%_ } _%><%_ return } _%>
    <%= plugin.name -%>(<%_ if (plugin.options) { _%><%- plugin.options %><%_ } _%>)<%_ }) %>
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
  },
  <%_ if (test === 'vitest') { _%>
  test: {
    environment: 'jsdom',
    global: true
  }
  <%_ } _%>
})
