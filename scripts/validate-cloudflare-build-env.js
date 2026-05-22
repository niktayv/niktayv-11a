'use strict';

const fs = require('node:fs');
const path = require('node:path');

require('./load-cloudflare-local-env');

const appEnv = process.env.APP_ENV || 'local';
const requiredEnvFile =
  appEnv === 'local' ? '.env.local' : `.env.${appEnv}.local`;

if (!fs.existsSync(path.resolve(process.cwd(), requiredEnvFile))) {
  console.error(
    `Missing required environment file for APP_ENV=${appEnv}: ${requiredEnvFile}`
  );
  process.exit(1);
}

const requiredVars = [
  'URL',
  'TIMEZONE',
  'TURNSTILE_SITE_KEY',
  'CONTACT_EMAIL_FROM',
  'CONTACT_EMAIL_TO',
];

const missingVars = requiredVars.filter((name) => {
  return !process.env[name] || !String(process.env[name]).trim();
});

if (missingVars.length > 0) {
  console.error(
    `Missing required Cloudflare build variables: ${missingVars.join(', ')}`
  );
  console.error(
    `Set them in your shell or in ${requiredEnvFile} before running the Cloudflare preview or deploy scripts.`
  );
  process.exit(1);
}

try {
  new URL(process.env.URL);
} catch (error) {
  console.error('URL must be an absolute URL, for example https://niktayv.com');
  process.exit(1);
}
