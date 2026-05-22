'use strict';

const path = require('node:path');
const dotenv = require('dotenv');

const envFiles = ['.dev.vars', '.env'];

for (const file of envFiles) {
  dotenv.config({
    path: path.resolve(process.cwd(), file),
    override: false,
    quiet: true,
  });
}
