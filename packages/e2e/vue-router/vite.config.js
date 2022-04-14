const fs = require('fs')
const { resolve, join } = require('path')
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const history = require('connect-history-api-fallback')

/** @type {string[]} */
let examples = []
fs.readdirSync(__dirname).forEach(dir => {
  const fullDir = join(__dirname, dir)
  const entry = join(fullDir, 'index.ts')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    examples.push(dir)
  }
})

// https://vitejs.dev/config/
const config = (env = {}) => {
  return defineConfig({
    root: resolve(__dirname),
    resolve: {
      alias: {
        vue: resolve(__dirname, '../vue-router/node_modules/vue/dist/vue.esm-bundler.js'),
      },
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js', '.vue'],
    },
    build: {
      outDir: join(__dirname, '__build__'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/',
      rollupOptions: {
        plugins: [],
        input: examples.reduce(
          (entries, name) => {
            entries[name] = resolve(__dirname, name, 'index.html')
            return entries
          },
          { index: resolve(__dirname, 'index.html') },
        ),
      },
    },
    plugins: [
      vue(),
      {
        configureServer({ middlewares }) {
          middlewares.use(
            history({
              // verbose: true,
              rewrites: [
                ...examples.map(name => ({
                  from: new RegExp(`^/${name}/.*$`),
                  to({ parsedUrl }) {
                    // console.log('checking for', parsedUrl.pathname)
                    const filePath = join(__dirname, parsedUrl.pathname)
                    if (
                      fs.existsSync(filePath) &&
                      !fs.statSync(filePath).isDirectory()
                    ) {
                      // console.log('\t', parsedUrl.pathname)
                      return parsedUrl.pathname
                    } else {
                      // console.log('\t', `/${name}/index.html`)
                      return `/${name}/index.html`
                    }
                  },
                  // to: `/${name}/index.html`,
                })),
                {
                  from: /^\/@.*$/,
                  to({ parsedUrl }) {
                    // console.log('bypassing', parsedUrl.pathname, parsedUrl.href)
                    return parsedUrl.href
                  },
                },
              ],
            }),
          )
        },
      },
    ],
    define: {
      __DEV__: JSON.stringify(!env.prod),
      __CI__: JSON.stringify(process.env.CI || false),
      __BROWSER__: 'true',
      'process.env': {
        NODE_ENV: JSON.stringify(env.prod ? 'production' : 'development'),
      },
    },
  })
}

module.exports = config
