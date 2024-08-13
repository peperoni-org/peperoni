import { describe, expect, test } from "vitest";
import { p } from "../src/peperoni";
import getSlotVariancesStyleValuesRecursively from "../src/getSlotVariancesStyleValuesRecursively";

describe("getSlotVariancesStyleValuesRecursively", () => {
  test("should get slot variances style values recursively", () => {
    const s1 = p({
      slots: {
        el1: "s1-el1",
        el2: "s1-el2",
      },
      variants: {
        v1: {
          a: {
            el1: "s1-v1-a-el1",
            el2: "s1-v1-a-el2",
          },
          b: {
            el1: "s1-v1-b-el1",
            el2: "s1-v1-b-el2",
          },
        },
      },
    });

    const s2 = p({
      extend: s1,
      slots: {
        el1: "s2-el1",
      },
      variants: {
        v1: {
          a: {
            el1: "s2-v1-a-el1",
          },
          b: {
            el1: "s2-v1-b-el1",
          },
        },
      },
    });

    const s3 = p({
      extend: s2,
      slots: {
        el1: "s3-el1",
      },
      variants: {
        v1: {
          a: {
            el1: "s3-v1-a-el1",
          },
          b: {
            el1: "s3-v1-b-el1",
          },
        },
      },
    });

    const v1_config_a = {
      v1: "a",
    };

    const v1_config_b = {
      v1: "b",
    };

    const el1_s1_v1_a = getSlotVariancesStyleValuesRecursively(
      "el1",
      s1.config,
      v1_config_a
    );

    const el1_s2_v1_a = getSlotVariancesStyleValuesRecursively(
      "el1",
      s2.config,
      v1_config_a
    );

    const el1_s3_v1_a = getSlotVariancesStyleValuesRecursively(
      "el1",
      s3.config,
      v1_config_a
    );

    const el1_s1_v1_b = getSlotVariancesStyleValuesRecursively(
      "el1",
      s1.config,
      v1_config_b
    );

    const el1_s2_v1_b = getSlotVariancesStyleValuesRecursively(
      "el1",
      s2.config,
      v1_config_b
    );

    const el1_s3_v1_b = getSlotVariancesStyleValuesRecursively(
      "el1",
      s3.config,
      v1_config_b
    );

    expect(el1_s1_v1_a).toEqual(["s1-v1-a-el1"]);
    expect(el1_s2_v1_a).toEqual(["s1-v1-a-el1", "s2-v1-a-el1"]);
    expect(el1_s3_v1_a).toEqual(["s1-v1-a-el1", "s2-v1-a-el1", "s3-v1-a-el1"]);

    expect(el1_s1_v1_b).toEqual(["s1-v1-b-el1"]);
    expect(el1_s2_v1_b).toEqual(["s1-v1-b-el1", "s2-v1-b-el1"]);
    expect(el1_s3_v1_b).toEqual(["s1-v1-b-el1", "s2-v1-b-el1", "s3-v1-b-el1"]);
  });
});
