import { describe, expect, it } from 'vitest';
import { anyIdentifier, anyString, anyStringOfLength } from './anyString';
import { anyInt } from './anyInt';

describe('anyString', () => {
  it('regex', () => {
    expect(anyString(/<([a-z]\w{0,20})>foo<\1>/)).toEqual(
      expect.stringMatching(/<([a-z]\w{0,20})>foo<\1>/),
    );
    expect(anyString(/.+/).length).toBeGreaterThan(0);
  });

  it('anyIdentifier', () => {
    expect(anyIdentifier().length).toBeGreaterThan(0);
    expect(anyIdentifier()).toEqual(
      expect.stringMatching(/^[a-zA-Z_][a-zA-Z0-9_]*$/),
    );
  });

  it('anyIdentifier(length)', () => {
    const length = anyInt(16, 256);
    const identifier: string = anyIdentifier(length);
    expect(identifier).toHaveLength(length);
    expect(identifier).toEqual(
      expect.stringMatching(/^[a-zA-Z_][a-zA-Z0-9_]*$/),
    );
  });

  it('anyStringOfLength', () => {
    const length = anyInt(16, 256);
    expect(anyStringOfLength(length)).toHaveLength(length);
  });
});
