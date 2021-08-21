#!/usr/bin/env node

import { run } from '../src'
import { argv } from 'process'

const mode: string = argv[2]
if (mode === 'dev' || mode === 'build') {
  run(mode).catch(err => {
    console.error(err)
    process.exit(1)
  })
}
