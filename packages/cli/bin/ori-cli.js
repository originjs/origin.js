#!/usr/bin/env node

require('../dist/index.js').run()
  .catch(error => {
    require('consola').fatal(error)
    require('exit')(2)
  })
