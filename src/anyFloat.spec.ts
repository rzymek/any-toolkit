import { describe, it, expect } from 'vitest';
import { anyFloat } from './anyFloat';

describe('anyFloat', () => {
  it('should return a number', () => {
    expect(typeof anyFloat()).toBe('number');
  });

  it('should return a number between 0 and 1 by default', () => {
    const value = anyFloat();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
  });

  it('should return a number within the specified range', () => {
    const value = anyFloat(10, 20);
    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(20);
  });

  it('should handle negative ranges', () => {
    const value = anyFloat(-20, -10);
    expect(value).toBeGreaterThanOrEqual(-20);
    expect(value).toBeLessThanOrEqual(-10);
  });

  it('should not always return an integer', () => {
    const values = Array.from({ length: 1000 }, () => anyFloat()) as number[];
    const hasFloat = values.some((value) => !Number.isInteger(value));
    expect(hasFloat).toBe(true);
  });
});
