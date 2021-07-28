#!/usr/bin/env node

const run = require('../src')

run(command).catch((err) => {
  console.error(err)
  process.exit(1)
})
