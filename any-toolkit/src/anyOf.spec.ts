import { describe, it, expect } from 'vitest';
import { anyOf } from './anyOf';

describe('anyOf', () => {
  it('should return an element from the array', () => {
    const value = anyOf(1, 2, 3, 4, 5);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(5);
  });

  it('should work with arrays of different types', () => {
    const stringArray = ['a', 'b', 'c'];
    const stringValue = anyOf(...stringArray);
    expect(stringArray).toContain(stringValue);

    const mixedArray = [1, 'a', true, { a: 1 }];
    const mixedValue = anyOf(...mixedArray);
    expect(mixedArray).toContain(mixedValue);
  });

  it('should work with an array with one element', () => {
    const value = anyOf('hello');
    expect(value).toBe('hello');
  });
});
