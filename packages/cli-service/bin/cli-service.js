#!/usr/bin/env node

const run = require('../src')
const { argv } = require('process')

run(argv[2]).catch((err) => {
  console.error(err)
  process.exit(1)
})
