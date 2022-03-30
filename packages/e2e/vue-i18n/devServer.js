const { createServer } = require('vite')
const path = require('path')

;(async () => {
  const server = await createServer({
    configFile: false,
    root: './',
    publicDir: path.resolve(__dirname, '../../../'),
    server: {
      port: 8080,
    },
  })
  await server.listen()

  server.printUrls()
})()
