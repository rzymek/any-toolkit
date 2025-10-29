import { expect, test } from 'vitest';
import { anyInt } from './anyInt';

test('anyInt', () => {
  expect(typeof anyInt()).toBe('number');
  expect(anyInt()).toBeGreaterThanOrEqual(0);
  expect(anyInt(5, 6)).toBeGreaterThanOrEqual(5);
  expect(anyInt(5000, 5002)).toBeLessThanOrEqual(5002);
  expect(Number.isSafeInteger(anyInt())).toBe(true);
});