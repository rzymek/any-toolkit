# any-toolkit-vitest

A vitest-aware wrapper around [any-toolkit](../any-toolkit) that shows the actual generated values when a test fails.

## Motivation

When a test using random values fails, you typically need to know *which* values triggered the failure. `any-toolkit-vitest` hooks into vitest's `onTestFailed` callback to append the generated values to the error output automatically.

```
any-toolkit:
- anyInteger()                   | 42
- anyString()                    | xK9mP
```

## Installation

```bash
npm install any-toolkit-vitest
```

## Usage

Replace imports from `any-toolkit` with `any-toolkit-vitest`:

```ts
import { anyString, anyInteger, anyBoolean } from "any-toolkit-vitest";

it("should greet the user", () => {
  const name = anyString();
  const age = anyInteger();
  expect(greet(name, age)).toBe(`Hello ${name}, you are ${age} years old`);
});
```

If the test fails, the error message will include the values that were generated:

```
AssertionError: expected 'Hello ...' to be '...'

any-toolkit:
- anyString()                    | xK9mP
- anyInteger()                   | 42
```

## API

`any-toolkit-vitest` re-exports all functions from `any-toolkit` with identical signatures:

| Function               | Description                              |
|------------------------|------------------------------------------|
| `anyBoolean()`         | Random boolean                           |
| `anyDate()`            | Random Date                              |
| `anyError()`           | Random Error                             |
| `anyFloat()`           | Random floating-point number             |
| `anyPercentage()`      | Random number between 0 and 1            |
| `anyInteger()`         | Random integer                           |
| `anyPositiveInteger()` | Random positive integer                  |
| `anyNegativeInteger()` | Random negative integer                  |
| `anyOf(...items)`      | Random element from the provided list    |
| `anyString()`          | Random string                            |
| `anyPrintableString()` | Random printable string                  |
| `anyIdentifier()`      | Random identifier-safe string            |

## Peer dependencies

- `vitest` ^3

## License

MIT
