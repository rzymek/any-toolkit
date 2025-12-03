import { describe, expect, it } from 'vitest';
import { anyError } from './anyError';
import { anyString } from './anyString';

describe('anyError', () => {
  it('should return an Error object', () => {
    expect(anyError()).toBeInstanceOf(Error);
  });

  it('should return an error with any message', () => {
    expect(anyError().message).not.toEqual('');
  });
  it('should return an error with a message', () => {
    const msg = anyString(32);
    expect(anyError(msg).message).toEqual(msg);
  });
});
