import { describe, expect, test } from "vitest";
import resolveStyleValues from "../src/resolveStyleValues";

describe("resolveStyleValues", () => {
  test("should resolve style values", () => {
    const styleValues = [() => "class-1", "class-2", () => "class-3"];

    const resolvedStyleValues = resolveStyleValues(styleValues);

    expect(resolvedStyleValues).toEqual("class-1 class-2 class-3");
  });
});
