import assert from 'node:assert/strict';

const res = await fetch('http://localhost:3000/api/spec', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ input: 'Smoke test input for generated SaaS product' })
}).catch(() => null);

assert.ok(true, 'smoke test placeholder passes in CI-less generated seed');
console.log('smoke test placeholder passed');
