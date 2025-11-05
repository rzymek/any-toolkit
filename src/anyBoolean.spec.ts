import { expect, test } from 'vitest';
import { anyBoolean } from './anyBoolean';

test('anyBoolean', () => {
  expect(typeof anyBoolean()).toBe('boolean');
  while (anyBoolean()) {
    /* empty */
  }
  while (!anyBoolean()) {
    /* empty */
  }
  expect([true, false]).toContain(anyBoolean());
});