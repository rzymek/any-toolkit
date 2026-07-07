---

```ts
import { anyFloat, anyOf, anyPositiveInteger, anyPrintableString } from "any-toolkit";

it("should create and order", async () => {
  const order= {
    item: anyPrintableString(),
    quantity: anyPositiveInteger({ max: 100 }),
    price: anyFloat({ min: 0.01, max: 100.00 }),
    currency: anyOf("PLN", "EUR")
  };
  // ...
  expect('401 Bad Request').toBe("201 Created");
});
```
```
AssertionError: expected '401 Bad Request' to be '201 Created' // Object.is equality
Expected :201 Created
Actual   :401 Bad Request
<Click to see difference>

    at /.../demo.test.ts:13:29
    at file:///...@vitest/runner/dist/chunk-hooks.js:155:11
```
---