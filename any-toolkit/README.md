# any-toolkit

A toolkit of utility methods for generating random values in tests.

## Motivation

Inspired by [Test-Driven Development: Extensive Tutorial](https://leanpub.com/tdd-ebook) by [Grzesiek Galezowski](https://github.com/grzesiek-galezowski/tdd-ebook).

Using random values in tests makes them more resilient — tests that pass only for specific hard-coded inputs often hide assumptions. `any-toolkit` provides helpers that generate valid random values so your tests focus on behaviour, not data.

## Installation

```bash
npm install any-toolkit
```

## Usage

```ts
import { anyString, anyInteger, anyOf } from "any-toolkit";

it("should store and retrieve a user", () => {
  const name = anyString();
  const age = anyPositiveInteger({ max: 120 });
  const role = anyOf("admin", "editor", "viewer");
  // ...
});
```

> **Using vitest?** See [any-toolkit-vitest](https://github.com/rzymek/any-toolkit/tree/master/any-toolkit-vitest) — a drop-in replacement that prints the generated values in the error output when a test fails.

## API

### `anyBoolean()`

Returns a random `true` or `false`.

### `anyDate(options?)`

Returns a random `Date`.

| Option | Default | Description |
|--------|---------|-------------|
| `from` | `new Date(0)` (Unix epoch) | Lower bound |
| `to`   | `new Date()` (now)         | Upper bound |

```ts
anyDate()                                          // between epoch and now
anyDate({ from: new Date(2020, 0, 1) })            // from 2020-01-01 until now
anyDate({ from: new Date(2020, 0, 1), to: new Date(2020, 11, 31) })
```

### `anyError(message?)`

Returns a `new Error` with a random printable message, or the provided message.

```ts
anyError()              // Error with random message
anyError("boom")        // Error("boom")
```

### `anyFloat(options?)`

Returns a random floating-point number.

| Option | Default | Description |
|--------|---------|-------------|
| `min`  | `Number.MIN_VALUE` | Lower bound (inclusive) |
| `max`  | `Number.MAX_VALUE` | Upper bound (inclusive) |

```ts
anyFloat()                        // any float
anyFloat({ min: 10, max: 20 })    // float in [10, 20]
anyFloat({ min: -20, max: -10 })  // negative float
```

### `anyPercentage()`

Returns a random float in `[0, 1]`. Shorthand for `anyFloat({ min: 0, max: 1 })`.

### `anyInteger(options?)`

Returns a random safe integer.

| Option | Default | Description |
|--------|---------|-------------|
| `min`  | `Number.MIN_SAFE_INTEGER` | Lower bound (inclusive) |
| `max`  | `Number.MAX_SAFE_INTEGER` | Upper bound (inclusive) |

```ts
anyInteger()                      // any safe integer
anyInteger({ min: 1, max: 100 }) // integer in [1, 100]
```

### `anyPositiveInteger(options?)`

Returns a random integer ≥ 1.

| Option | Default | Description |
|--------|---------|-------------|
| `max`  | `Number.MAX_SAFE_INTEGER` | Upper bound (inclusive) |

### `anyNegativeInteger(options?)`

Returns a random integer ≤ −1.

| Option | Default | Description |
|--------|---------|-------------|
| `min`  | `Number.MIN_SAFE_INTEGER` | Lower bound (inclusive) |

### `anyOf(...values)`

Returns a random element from the provided arguments.

```ts
anyOf("a", "b", "c")          // one of "a", "b", or "c"
anyOf(1, 2, 3)                 // one of 1, 2, or 3
```

### `anyString(length?)` / `anyString(regexp)`

Returns a random string of the given length (default 16), or a string matching a regular expression.

```ts
anyString()                          // 16-character random string
anyString(32)                        // 32-character random string
anyString(/[A-Z]{3}-\d{4}/)         // e.g. "XKM-0472"
```

### `anyPrintableString(length?)`

Returns a random string of printable ASCII characters (codes 32–126). Default length: 16.

### `anyIdentifier(length?)`

Returns a random string that is a valid JS/TS identifier (`[a-zA-Z_][a-zA-Z0-9_]*`). Default length: 16.

## License

MIT