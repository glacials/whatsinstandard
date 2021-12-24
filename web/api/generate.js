#!/usr/bin/env node
'use strict'

import { generate as v5 } from './v5/generate.js'
import { generate as v6 } from './v6/generate.js'

v5()
v6()
