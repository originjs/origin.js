import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      'examples',
      'packages/cli/oriTemplate/**',
      'packages/e2e/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/test/**',
    ],
  },
})
