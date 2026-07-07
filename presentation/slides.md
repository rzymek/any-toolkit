---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
info: 'any-toolkit: Because 42 Is a Lie'
# some information about your slides (markdown enabled)
title: any-toolkit
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
addons:
  - slidev-addon-qrcode
---

# The Case Against 123.45

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

# Domain specific with overrides

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
function anOrder(overrides: Partial<Order> = {}): Order {
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
    quantity: anyOf(anyNegativeInteger(), 0)
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

# Pros:

* Document acceptable values
* Highlight essential input among irrelevant data
* More test surface via random data generation

<div v-click style="margin-top: 2em">

# Cons:

* False negative – e.g. you may actually require anyPrintableString() not anyString()
* Failures in builds triggered independently
* Non-deterministic test runs
* Obscured Failure Messages during Debugging

</div>

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
//                                                                         🔽 🔽 🔽
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
layout: two-cols-header
---

# Thank you!

::left::

* https://github.com/rzymek/any-toolkit
* https://npmjs.com/package/any-toolkit
* https://npmjs.com/package/any-toolkit-vitest
* https://github.com/grzesiek-galezowski/tdd-ebook
* https://linkedin.com/in/krzysztof-rzymkowski/

::right::

<QRCode
:width="300"
:height="300"
type="svg"
data="https://www.linkedin.com/in/krzysztof-rzymkowski/"
align="right"
:margin="10"
:imageOptions="{ margin: 10 }"
:dotsOptions="{ color: '#007EBB' }"
image="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
/>
