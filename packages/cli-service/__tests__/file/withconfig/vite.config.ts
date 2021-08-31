import path from 'path'

export default {
  resolve: {
    root: '/a/b',
    cacheDir: 'node_modules/.vite',
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {},
}
