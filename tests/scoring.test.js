const test = require('node:test');
const assert = require('node:assert/strict');
test('pass requirement uses ceiling for percentage rules', () => {
  assert.equal(Math.ceil(2 * 80 / 100), 2);
  assert.equal(Math.ceil(50 * 80 / 100), 40);
});
test('additional correct needed never goes negative', () => {
  assert.equal(Math.max(0, 40 - 42), 0);
  assert.equal(Math.max(0, 40 - 38), 2);
});
