import { describe, expect, test } from "vitest";
import { p } from "../src/peperoni";
import getSlotVariancesStyleValues from "../src/getSlotVariancesStyleValues";

describe("getSlotVariancesStyleValues", () => {
  test("should get slot variances style values", () => {
    const s1 = p({
      slots: {
        el1: "class-1",
        el2: "class-2",
      },
      variants: {
        v1: {
          a: {
            el1: "class-3",
            el2: "class-4",
          },
          b: {
            el1: "class-5",
            el2: "class-6",
          },
        },
      },
    });

    const el1_v1_a = getSlotVariancesStyleValues("el1", s1.config, {
      v1: "a",
    });
    const el1_v1_b = getSlotVariancesStyleValues("el1", s1.config, {
      v1: "b",
    });

    const el2_v1_a = getSlotVariancesStyleValues("el2", s1.config, {
      v1: "a",
    });
    const el2_v1_b = getSlotVariancesStyleValues("el2", s1.config, {
      v1: "b",
    });

    expect(el1_v1_a).toEqual(["class-3"]);
    expect(el1_v1_b).toEqual(["class-5"]);
    expect(el2_v1_a).toEqual(["class-4"]);
    expect(el2_v1_b).toEqual(["class-6"]);
  });
});
