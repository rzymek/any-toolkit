---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: any-toolkit
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply UnoCSS classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
# enable Comark Syntax: https://comark.dev/syntax/markdown
comark: true
# duration of the presentation
duration: 15min

---

# Testing with anyThing

---
layout: image-right
image: https://d2sofvawe08yqg.cloudfront.net/tdd-ebook/s_hero?1734375643&1734375643
backgroundSize: contain
---

# Attribution


* Inspired by "Test-Driven Development" book by Grzegorz Gałęzowski
* An [open-source](https://github.com/grzesiek-galezowski/tdd-ebook) book available on
  * Github 
  * Leanpub 
* "Anonymous input"

---
layout: two-cols-header
---

# Classic
::left::
```ts
it("should create and order", async () => {
  // given
  const order: Order = {
    item: "Laptop",
    quantity: 1,
    price: 123.45,
    currency: 'PLN',
  }
  // when
  const created = await api.createOrder(order);
  const fetched = await api.getOrder(created.id);

  // then
  expect(created.status).toBe("201 Created");
  expect(fetched).toEqual({
    id: created.id,
    ...order,
  });
});
```
<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>
---
layout: two-cols-header
---

# Anonymous Input
::left::
```ts
it("should create and order", async () => {
  // given
  const order: Order = {
    item: "Laptop",
    quantity: 1,
    price: 123.45,
    currency: 'PLN',
  }
  // when
  const created = await api.createOrder(order);
  const fetched = await api.getOrder(created.id);

  // then
  expect(created.status).toBe("201 Created");
  expect(fetched).toEqual({
    id: created.id,
    ...order,
  });
});
```
::right::
```ts
it("should create and order", async () => {
  // given
  const order: Order = {
    item: anyPrintableString(),
    quantity: anyPositiveInteger({ max: 100 }),
    price: anyFloat({ min: 0.01, max: 100.00 }),
    currency: anyOf("PLN", "EUR")
  }
  // when
  const created = await api.createOrder(order);
  const fetched = await api.getOrder(created.id);

  // then
  expect(created.status).toBe("201 Created");
  expect(fetched).toEqual({
    id: created.id,
    ...order,
  });
});
```
<style>
.two-cols-header {
  column-gap: 20px; /* Adjust the gap size as needed */
}
</style>
---


```ts
it("should create and order", async () => {
  // given
  const order = anOrder()

  // when
  const created = await api.createOrder(order);
  const fetched = await api.getOrder(created.id);

  // then
  expect(created.status).toBe("201 Created");
  expect(fetched).toEqual({
    id: created.id,
    ...order
  });
});
```
```ts
function anyOrder(overrides: Partial<Order> = {}): Order {
  return {
    item: anyPrintableString(),
    quantity: anyPositiveInteger({ max: 100 }),
    price: anyFloat({ min: 0.01, max: 100.00 }),
    currency: anyOf("PLN", "EUR")
  };
}
```

---

```ts
import { anOrder } from "./__fixtures__/order";

it("should reject non-positive quantity", async () => {
  // given
  const order = anOrder({
    quantity: anyInteger({ max: 0 })
  });

  // when
  const created = await api.createOrder(order);

  // then
  expect(created.status).toBe("400 Bad Request");
  expect(created.error).toBe("Quantity must be a greater than 0");
});

```

---

# any-toolkit


#### Install:
```bash
pnpm install any-toolkit;
```

#### Import:
```ts
import {
  anyBoolean,
  anyDate,
  anyError,
  anyFloat,
  anyPercentage,
  anyInteger,
  anyPositiveInteger,
  anyNegativeInteger,
  anyOf,
  anyString,
  anyPrintableString,
  anyIdentifier,
} from "any-toolkit";
```

---

Pros:

* document acceptable values
* highlight essential test input among irrelevant data
* more test surface via random data generation

Cons:

* false negative – e.g. you may actually require anyPrintableString() not anyString()
* failures in builds triggered independently

---

### Pros

* **Clear Expression of Intent**
  Using `Any.String()` instead of a literal like `"John"` explicitly signals to future readers that the exact value does
  not matter for this test scenario. This keeps the reader focused entirely on the data that *does* drive the behavior.
* **Protection Against Accidental Coupling**
  When you reuse hardcoded strings (like `"test"`) across multiple inputs, your production code might accidentally pass
  because two distinct fields happen to match. `Any` helpers usually generate unique, sequential, or randomized values
  every time they are called, preventing code from passing due to lucky coincidences.
* **Easier Refactoring and Maintenance**
  If the structural constraints of a data type change (e.g., if an ID format changes from an integer to a GUID, or a
  string requires a specific prefix), you only need to update the logic inside the `Any` helper method rather than
  hunting down and rewriting hundreds of hardcoded literals across your entire test suite.
* **Reduced Test Clutter**
  It eliminates the cognitive overhead of coming up with arbitrary names, numbers, or dummy objects, significantly
  shortening the "Arrange" phase of your tests.
* more test surface via random data generation

---

### Cons

* false negative – e.g. you may actually require anyPrintableString() not anyString()
* non-deterministic test runs
* failures in builds triggered independently
* Obscured Failure Messages during Debugging

---
src: ./pages/any-toolkit-failure.md
---
---

<img
src="https://camo.githubusercontent.com/464f04d0a5ced9ad38d581c5e98a56d6c79df048985b62be26f065ead432f6e5/68747470733a2f2f7669746573742e6465762f7669746573742d6c696768742e737667"
style="width: 50%" class="mx-auto"
alt="vitest"/>

Use `any-toolkit-vitest` instead of `any-toolkit`:
```
pnpm uninstall any-toolkit
pnpm install any-toolkit-vitest
```
The API is the same:
```
import { anyFloat, anyOf, anyPositiveInteger, anyPrintableString } from "any-toolkit";
//  🔽 🔽 🔽
import { anyFloat, anyOf, anyPositiveInteger, anyPrintableString } from "any-toolkit-vitest";

```
<div class="h-4" />

* `any-toolkit` 
  * pure & generic. no tools dependency
* `any-toolkit-vitest` 
  * print the values used on vitest failure 
  * wrapper for any-toolkit with `vitest` integration.

---
src: ./pages/any-toolkit-failure.md
transition: fade
---

---
---

```ts
import { anyFloat, anyOf, anyPositiveInteger, anyPrintableString } from "any-toolkit-vitest";
//                                                                                  ^^^^^^^ 
it("should create and order", async () => {
  const order = {
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
expected '401 Bad Request' to be '201 Created' // Object.is equality

any-toolkit: 
- anyPrintableString               | t$(;mk4]<dOZWu@U
- anyPositiveInteger(max=100)      | 16
- anyFloat(min=0.01, max=100)      | 19.5127459742196
- anyOf(PLN,EUR)                   | EUR
Expected :201 Created
Actual   :401 Bad Request

    at /.../demo.test.ts:13:29
    at file:///...@vitest/runner/dist/chunk-hooks.js:155:11
```

---



```ts [filename-example.ts]
it(`should create backup filename`, () => {
  // given:
  const hostname = 'localhost';
  // when
  const name = backupFilename(hostname);
  //then
  expect(name).toBe('backup_localhost.zip');
})
```

::right::

```ts [filename-example.ts]
it(`should create backup filename`, () => {
  // given:
  const hostname = anyHostname();
  // when
  const name = backupFilename(hostname);
  //then
  expect(name).toBe(`backup_${hostname}.zip`);
})

const anyHostname = () =>
  anyString(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/)
```
