const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { validateTelegramWebAppData } = require('../src/middleware/telegram-auth');

test('Telegram WebApp initData signature validates', () => {
  const token = '123456:TEST_TOKEN';
  const user = JSON.stringify({ id: 42, first_name: 'Test' });
  const params = new URLSearchParams({ user, auth_date: '1700000000', query_id: 'abc' });
  const data = [...params.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(token).digest();
  const hash = crypto.createHmac('sha256', secret).update(data).digest('hex');
  params.set('hash', hash);
  assert.deepEqual(validateTelegramWebAppData(params.toString(), token), { id: 42, first_name: 'Test' });
});

test('Telegram WebApp rejects tampered initData', () => {
  assert.equal(validateTelegramWebAppData('user=%7B%22id%22%3A42%7D&hash=bad', 'token'), null);
});
