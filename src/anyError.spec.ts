import { describe, expect, it } from 'vitest';
import { anyError } from './anyError';
import { anyStringOfLength } from './anyString';

describe('anyError', () => {
  it('should return an Error object', () => {
    expect(anyError()).toBeInstanceOf(Error);
  });

  it('should return an error with any message', () => {
    expect(anyError().message).not.toEqual('');
  });
  it('should return an error with a message', () => {
    const msg = anyStringOfLength(32);
    expect(anyError(msg).message).toEqual(msg);
  });
});
