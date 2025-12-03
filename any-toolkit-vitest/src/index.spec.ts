import * as anyToolkit from "any-toolkit";
import * as anyToolkitVitest from "./index.js"
import { describe, expect, it } from "vitest";

describe("index", () => {
  it('should export all the methods as any-toolkit',()=>{
    expect(Object.keys(anyToolkit)).toEqual(Object.keys(anyToolkitVitest))
  })

  it.each(Object.entries(anyToolkit))('should have the same return types [%s]',(name,fn)=>{
    const wrappedFn = anyToolkitVitest[name as keyof typeof anyToolkitVitest];
    expect(typeof fn()).toEqual(typeof wrappedFn())
  })
});