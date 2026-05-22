'use strict';

const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');

const appEnv = process.env.APP_ENV || 'local';
const originalEnvKeys = new Set(Object.keys(process.env));
const envFiles = [...new Set([
  '.env',
  `.env.${appEnv}`,
  '.env.local',
  `.env.${appEnv}.local`,
])];
const mergedEnv = {};

for (const file of envFiles) {
  const filepath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filepath)) {
    continue;
  }

  Object.assign(mergedEnv, dotenv.parse(fs.readFileSync(filepath)));
}

for (const [key, value] of Object.entries(mergedEnv)) {
  if (!originalEnvKeys.has(key)) {
    process.env[key] = value;
  }
}
