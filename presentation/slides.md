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

<!--
First of all - credit where credit is due. 
The techniques and patterns I'm presenting today are inspired by the book I've read some time ago.
It's an open source ebook called "Test-Driven Development" by Grzegorz Gałęziowski. It's available on Github and Leanpub. Links at the end of presentation.
The concept the I'm going to focus on is what the author called "anonymous input"
-->

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

<!--
I'll explain on a classic example.   
This is a familiar test to verify creation using an api.   
I create a sample order and verify it's there for retrieval.  
To call `create` endpoint, I need to define a valid order object.  
Typically a lot of magic meaningless values are used here: 123.45, Laptop, 1.  
This does not convey what input is valid and essential.   
Just adds noise to the test's code.
-->

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

<!--
Instead I can use simple methods that better document the constrains of the data.  

An item name can an any printable string.  

Quantity is a positive integer up to a 100. etc.
-->

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
    currency: anyOf("PLN", "EUR"),
    ...overrides,
  };
}
```

<!--
This can be elevated to more complex objects.   

I've extracted order creation to `anOrder()` function.  

By default it creates the complete objects with random values. But every aspect of it can be optionally overridden.
-->

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

<!--
These overrides allows to highlight the parts of the object that is essential in a specific test case.

Here I'm testing order's quantity constraints.
Other parts of the order are irrelevant. 
This pattern makes is really explicit in the code.
-->

---
layout: two-cols-header
---

# any-toolkit <img src="https://img.shields.io/npm/v/any-toolkit" alt="npm version" style="display: inline; vertical-align: middle; margin-left: 0.1em;"/> 

::left::
#### Install:
```bash
pnpm install any-toolkit;
```

#### Import:
```ts
import {
  anyBoolean,          
  anyDate,                  // anyDate({from?, to?})
  anyError,                 // anyError(message?)
  anyFloat,                 // anyFloat({min?, max?})
  anyPercentage,            
  anyInteger,               // anyInteger({min?, max?})
  anyPositiveInteger,       // anyPositiveInteger({min?})
  anyNegativeInteger,       // anyNegativeInteger({max?})
  anyOf,                    // anyOf(...values)
  anyString,                // anyString(/pattern/); anyString(length?)
  anyPrintableString,       // anyPrintableString(length? = 16) 
  anyIdentifier,            // anyIdentifier(length? = 16)
} from "any-toolkit";
```


::right::

<div class="h-full flex flex-col justify-center">
<a href="https://github.com/rzymek/any-toolkit" target="_blank" style="border:none">
<QRCode
:width="300"
:height="300"
type="svg"
data="https://github.com/rzymek/any-toolkit"
align="right"
:margin="10"
:backgroundOptions="{ color: 'white' }"
:imageOptions="{ saveAsBlob: true }"
image="/img/github-logo.svg"
/></a>
</div>

<!--
These any* functions are quite trivial to implement.

And that is what we did in the project where I've first introduced it.  
Then after parting ways with the company, I wanted to use it in another project.

The book mentioned libraries for C# and Java.  
A quick search on Google and Perplexity did not yield results for Typescript on npm.

So in aliment with the rule - *generalize on the second use* - I've published my own set of functions for everyone to use.
-->

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
layout: two-cols
---

# Thank you!
## Questions?

<div class="h-8" />

* https://github.com/rzymek/any-toolkit
* https://npmjs.com/package/any-toolkit
* https://npmjs.com/package/any-toolkit-vitest
* https://github.com/grzesiek-galezowski/tdd-ebook
* https://linkedin.com/in/krzysztof-rzymkowski/
* https://sli.dev/

::right::

<div class="h-full flex flex-col justify-center">
<a href="https://www.linkedin.com/in/krzysztof-rzymkowski/" style="border:none">
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
</a>
</div>
