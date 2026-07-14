# any-toolkit — Speaker Transcript

Extracted from the speaker notes (`<!-- -->` comments) in `slides.md`, in slide order, for recording a full audio narration of the presentation.

---

## Slide 1 — The Case Against 123.45

Today I want to make a case against magic values in tests.
Numbers like 123.45, strings like "Laptop" - values that look meaningful but aren't.
I'll show a simple pattern that makes test intent much clearer and broadens test coverage at the same time.

---

## Slide 2 — Attribution

First of all - credit where credit is due.
The techniques and patterns I'm presenting today are inspired by the book I've read some time ago.
It's an open source ebook called "Test-Driven Development" by Grzegorz Gałęzowski. It's available on Github and Leanpub. Links at the end of presentation.
The concept I'm going to focus on is what the author called "anonymous input"

---

## Slide 3 — Classic

I'll explain on a classic example.
This is a familiar test to verify creation using an api.
I create a sample order and verify it's there for retrieval.
To call `create` endpoint, I need to define a valid order object.
Typically a lot of magic meaningless values are used here: 123.45, Laptop, 1.
This does not convey what input is valid and essential.
Just adds noise to the test's code.

---

## Slide 4 — Anonymous Input

Instead I can use simple methods that better document the constraints of the data.

An item name can be any printable string.

Quantity is a positive integer up to 100. etc.

---

## Slide 5 — Domain specific with overrides

This can be elevated to more complex objects.

I've extracted order creation to `anOrder()` function.

By default it creates the complete objects with random values. But every aspect of it can be optionally overridden.

---

## Slide 6 — (overrides example, quantity constraint)

These overrides allow to highlight the parts of the object that is essential in a specific test case.

Here I'm testing order's quantity constraints.
Other parts of the order are irrelevant.
This pattern makes is really explicit in the code.

---

## Slide 7 — any-toolkit (install / import)

These any* functions are quite trivial to implement.

And that is what we did in the project where I've first introduced it.
Then after parting ways with the company, I wanted to use it in another project.

The book mentioned libraries for C# and Java.
A quick search on Google and Perplexity did not yield results for Typescript on npm.

So in alignment with the rule - *generalize on the second use* - I've published my own set of functions for everyone to use.

---

## Slide 8 — Pros / Cons

The pros make tests cleaner and more honest about their intent.
The cons are real - random data means random failures that are hard to reproduce.
The last con - obscured failure messages - is the one we can actually fix.

---

## Slide 9 — Failure example (plain any-toolkit)

Here's what a failure looks like with plain any-toolkit.
The error tells you what went wrong - but not which random values triggered it.
To reproduce, you'd have to know what each any* function returned that particular run.

---

## Slide 10 — any-toolkit-vitest

The solution is any-toolkit-vitest.
It's a drop-in replacement - the API is identical, just change the import path.
Under the hood it wraps each function to report the generated values when a test fails.

---

## Slide 11 — Failure example (revisited)

Back to the same failure.
We know what went wrong - but still not which values triggered it.
This is exactly the problem any-toolkit-vitest solves.

---

## Slide 12 — Failure output with any-toolkit-vitest

Now the failure output includes an any-toolkit section listing each generated value alongside its constraint.
You can immediately see what was used and reproduce the failure deterministically.
The obscured failure message con is solved.

---

## Slide 13 — Thank you! / Questions?

Links to the packages and the book are on the left.
Happy to take questions.
