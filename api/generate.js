#!/usr/bin/env node
'use strict'

const v5 = require('./v5/generate')
const v6 = require('./v6/generate')

v5.generate()
v6.generate()
