# any-toolkit

A toolkit of utility methods for generating random values in tests. Framework-agnostic, with optional vitest integration.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [any-toolkit](./any-toolkit) | [![npm version](https://img.shields.io/npm/v/any-toolkit)](https://www.npmjs.com/package/any-toolkit) | Core library — random value generators, works with any test framework |
| [any-toolkit-vitest](./any-toolkit-vitest) | [![npm version](https://img.shields.io/npm/v/any-toolkit-vitest)](https://www.npmjs.com/package/any-toolkit-vitest) | Drop-in vitest wrapper that prints generated values in error output on test failure |

## Quick start

```bash
npm install any-toolkit
```

```ts
import { anyString, anyInteger, anyOf } from "any-toolkit";

it("should store and retrieve a user", () => {
  const name = anyString();
  const age = anyPositiveInteger({ max: 120 });
  const role = anyOf("admin", "editor", "viewer");
  // ...
});
```

**Using vitest?** Install `any-toolkit-vitest` instead for better failure output — it shows the exact values that triggered the failure:

```bash
npm install any-toolkit-vitest
```

```
AssertionError: expected 'Hello ...' to be '...'

any-toolkit:
- anyString()                    | xK9mP
- anyPositiveInteger(max=120)    | 42
```

## Motivation

Inspired by [Test-Driven Development: Extensive Tutorial](https://leanpub.com/tdd-ebook) by [Grzesiek Galezowski](https://github.com/grzesiek-galezowski/tdd-ebook).

Using random values in tests makes them more resilient — tests that pass only for specific hard-coded inputs often hide assumptions about the data rather than verifying behaviour.

## Compatibility

`any-toolkit` works with any test framework. The e2e suite covers:

- **vitest** (via `any-toolkit-vitest`)
- **Jest**
- **vitest** without the integration wrapper

## License

MIT