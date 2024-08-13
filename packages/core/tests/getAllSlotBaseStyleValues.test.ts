import { describe, expect, test } from "vitest";
import getAllSlotBaseStyleValues from "../src/getAllSlotBaseStyleValues";
import resolveStyleValues from "../src/resolveStyleValues";
import { p } from "../src/peperoni";

describe("getAllSlotBaseStyleValues", () => {
  test("should get all slot base style values", () => {
    const s1 = p({
      slots: {
        el1: "class-1",
        el2: "class-2",
      },
    });

    const s2 = p({
      extend: s1,
      slots: {
        el1: () => "class-3",
      },
    });

    const s3 = p({
      extend: s2,
      slots: {
        el1: "class-4",
        el2: () => "class-5",
      },
    });

    const el1_s1 = getAllSlotBaseStyleValues("el1", s1.config);
    const el1_s2 = getAllSlotBaseStyleValues("el1", s2.config);
    const el1_s3 = getAllSlotBaseStyleValues("el1", s3.config);

    const el2_s1 = getAllSlotBaseStyleValues("el2", s1.config);
    const el2_s2 = getAllSlotBaseStyleValues("el2", s2.config);
    const el2_s3 = getAllSlotBaseStyleValues("el2", s3.config);

    expect(resolveStyleValues(el1_s1)).toEqual("class-1");
    expect(resolveStyleValues(el1_s2)).toEqual("class-1 class-3");
    expect(resolveStyleValues(el1_s3)).toEqual("class-1 class-3 class-4");

    expect(resolveStyleValues(el2_s1)).toEqual("class-2");
    expect(resolveStyleValues(el2_s2)).toEqual("class-2");
    expect(resolveStyleValues(el2_s3)).toEqual("class-2 class-5");
  });
});
