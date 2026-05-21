'use strict';

const MAX_FIELD_LENGTH = 4000;

function redirect(pathname, status = 303) {
  return new Response(null, {
    status,
    headers: {
      Location: pathname,
    },
  });
}

function badRequest(message) {
  return Response.json({ error: message }, { status: 400 });
}

function methodNotAllowed() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

function getRemoteIp(request) {
  return request.headers.get('CF-Connecting-IP') || undefined;
}

function normalizeField(value) {
  return String(value || '').trim().slice(0, MAX_FIELD_LENGTH);
}

async function verifyTurnstile(request, env, token) {
  if (!token) {
    return false;
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }

  const payload = new URLSearchParams();
  payload.set('secret', env.TURNSTILE_SECRET_KEY);
  payload.set('response', token);

  const remoteIp = getRemoteIp(request);
  if (remoteIp) {
    payload.set('remoteip', remoteIp);
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    }
  );

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with ${response.status}`);
  }

  const result = await response.json();
  return Boolean(result.success);
}

function formatTextMessage(fields, request) {
  return [
    'New message from niktayv.com contact form',
    '',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || '-'}`,
    '',
    'Message:',
    fields.message,
    '',
    `IP: ${getRemoteIp(request) || 'unknown'}`,
    `User-Agent: ${request.headers.get('User-Agent') || 'unknown'}`,
  ].join('\n');
}

function formatHtmlMessage(fields, request) {
  const escapeHtml = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

  return `
    <h1>New message from niktayv.com contact form</h1>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(fields.phone || '-')}</p>
    <p><strong>Message:</strong></p>
    <pre>${escapeHtml(fields.message)}</pre>
    <p><strong>IP:</strong> ${escapeHtml(getRemoteIp(request) || 'unknown')}</p>
    <p><strong>User-Agent:</strong> ${escapeHtml(
      request.headers.get('User-Agent') || 'unknown'
    )}</p>
  `.trim();
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return methodNotAllowed();
  }

  const formData = await request.formData();
  const fields = {
    name: normalizeField(formData.get('name')),
    email: normalizeField(formData.get('email')),
    phone: normalizeField(formData.get('phone')),
    message: normalizeField(formData.get('message')),
  };

  if (!fields.name || !fields.email || !fields.message) {
    return badRequest('Name, email, and message are required.');
  }

  const token = normalizeField(formData.get('cf-turnstile-response'));
  const turnstileOk = await verifyTurnstile(request, env, token);

  if (!turnstileOk) {
    return redirect('/contact/?status=invalid');
  }

  if (!env.EMAIL) {
    throw new Error('EMAIL binding is not configured');
  }

  if (!env.CONTACT_EMAIL_FROM || !env.CONTACT_EMAIL_TO) {
    throw new Error('Contact email settings are not configured');
  }

  await env.EMAIL.send({
    to: env.CONTACT_EMAIL_TO,
    from: env.CONTACT_EMAIL_FROM,
    replyTo: fields.email,
    subject: `Contact form: ${fields.name}`,
    text: formatTextMessage(fields, request),
    html: formatHtmlMessage(fields, request),
  });

  return redirect('/thankyou/');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      try {
        return await handleContact(request, env);
      } catch (error) {
        console.error('Contact handler failed', error);
        return redirect('/contact/?status=error');
      }
    }

    return env.ASSETS.fetch(request);
  },
};
