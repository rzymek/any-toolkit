import { describe, expect, it } from 'vitest';
import { anyString, anyIdentifier, anyPrintableString } from './anyString';
import { anyInt } from './anyInt';

describe('anyString', () => {
  it('anyString(/RegExp/)', () => {
    expect(anyString(/<([a-z]\w{0,20})>foo<\1>/)).toEqual(
      expect.stringMatching(/<([a-z]\w{0,20})>foo<\1>/),
    );
    expect(anyString(/.+/).length).toBeGreaterThan(0);
  });

  it('anyString(length)', () => {
    const length = anyInt(16, 256);
    expect(anyString(length)).toHaveLength(length);
  });

  it('anyPrintableString(length)', () => {
    const length = anyInt(16, 256);
    const str = anyPrintableString(length);
    expect(str).toHaveLength(length);
    for (let i = 0; i < str.length; i++) {
      const char: number = str.charCodeAt(i);
      expect(char).toBeGreaterThanOrEqual(32);
      expect(char).toBeLessThanOrEqual(126);
    }
  });

  it('anyIdentifier()', () => {
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
});
