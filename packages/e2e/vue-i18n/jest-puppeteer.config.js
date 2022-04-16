module.exports = {
  server: {
    command: 'node ./devServer.js',
  },
  launch: {
    dumpio: false,
    headless: process.env.HEADLESS !== 'false',
  },
  browser: 'chromium',
  browserContext: 'default',
}
