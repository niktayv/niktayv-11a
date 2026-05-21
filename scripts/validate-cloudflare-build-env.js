'use strict';

const requiredVars = [
  'URL',
  'TIMEZONE',
];

const missingVars = requiredVars.filter((name) => {
  return !process.env[name] || !String(process.env[name]).trim();
});

if (missingVars.length > 0) {
  console.error(
    `Missing required Cloudflare build variables: ${missingVars.join(', ')}`
  );
  console.error(
    'Set them in your shell before running the Cloudflare preview or deploy scripts.'
  );
  process.exit(1);
}

try {
  new URL(process.env.URL);
} catch (error) {
  console.error('URL must be an absolute URL, for example https://niktayv.com');
  process.exit(1);
}
