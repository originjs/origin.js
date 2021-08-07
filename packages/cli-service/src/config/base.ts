import path from 'path'
import type { InlineConfig } from 'vite'
const serverConfig: InlineConfig = {
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
  },
}
const baseConfig: InlineConfig = {
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: [
      '.js',
      '.mjs',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.yaml',
      '.yml',
    ],
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
  },
}
const buildConfig: InlineConfig = {
  build: {
    outDir: 'dist',
    assetsDir: 'public',
  },
}
export { serverConfig, baseConfig, buildConfig }
