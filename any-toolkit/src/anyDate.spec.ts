import { describe, it, expect } from 'vitest';
import { anyDate } from './anyDate';

describe('anyDate', () => {
  it('should return a Date object', () => {
    expect(anyDate()).toBeInstanceOf(Date);
  });

  it('should return a date within the specified range', () => {
    const from = new Date(2023, 0, 1);
    const to = new Date(2023, 0, 31);
    const value = anyDate(from, to);
    expect(value.getTime()).toBeGreaterThanOrEqual(from.getTime());
    expect(value.getTime()).toBeLessThanOrEqual(to.getTime());
  });

  it('should return a date between the Unix epoch and now by default', () => {
    const now = new Date();
    const value = anyDate();
    expect(value.getTime()).toBeGreaterThanOrEqual(0);
    expect(value.getTime()).toBeLessThanOrEqual(now.getTime());
  });
});
