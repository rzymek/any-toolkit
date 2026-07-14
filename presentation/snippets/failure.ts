import { anyFloat, anyOf, anyPositiveInteger, anyPrintableString } from "any-toolkit";

it("should create an order", async () => {
  const order = {
    item: anyPrintableString(),
    quantity: anyPositiveInteger({ max: 100 }),
    price: anyFloat({ min: 0.01, max: 100.00 }),
    currency: anyOf("PLN", "EUR")
  };
  // ...
  expect('401 Bad Request').toBe("201 Created");
});
