import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginAssets from '../../packages/vite-plugin-assets/src/index'
import pluginContent from '../../packages/vite-plugin-content/src/index'
import pluginPages from '../../packages/vite-plugin-pages/src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pluginAssets(), pluginContent(), pluginPages()],
})
