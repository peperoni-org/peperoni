import { expect, test, describe } from "vitest";
import { p } from "../src/peperoni";

describe("slots", () => {
  test("define slots", () => {
    const style = p({
      slots: {
        button: "class-1",
        card: "class-2",
      },
    });

    const { button, card } = style();

    expect(typeof style).toBe("function");
    expect(typeof button).toBe("function");
    expect(typeof card).toBe("function");

    expect(button()).toEqual("class-1");
    expect(card()).toEqual("class-2");
  });

  test("define slots with extend", () => {
    const parent = p({
      slots: {
        button: "class-1",
        card: "class-2",
      },
    });

    const style = p({
      extend: parent,
      slots: {
        button: "class-3",
        container: "class-4",
      },
    });

    const { button, card, container } = style();

    expect(typeof style).toBe("function");
    expect(typeof button).toBe("function");
    expect(typeof card).toBe("function");
    expect(typeof container).toBe("function");

    expect(button()).toEqual("class-1 class-3");
    expect(card()).toEqual("class-2");
    expect(container()).toEqual("class-4");
  });
});

describe("variants", () => {
  test("should not apply variants if not provided", () => {
    const style = p({
      slots: {
        button: "class-1",
        card: "class-2",
      },
      variants: {
        variant1: {
          variantValue: {
            button: "class-3",
            card: "class-4",
          },
        },
      },
    });

    const { button, card } = style();

    expect(button()).toEqual("class-1");
    expect(card()).toEqual("class-2");
  });

  test("should not apply changes if variant does not reach the slot", () => {
    const style = p({
      slots: {
        button: "class-1",
        card: "class-2",
      },
      variants: {
        variant1: {
          variantValue: {
            card: "class-4",
          },
        },
      },
    });

    const { button, card } = style({ variant1: "variantValue" });

    expect(button()).toEqual("class-1");
    expect(card()).toEqual("class-2 class-4");
  });

  test("should be possible to extend only variants without slots", () => {
    const parent = p({
      slots: {
        button: "class-1",
        card: () => "class-2",
      },
    });

    const style = p({
      extend: parent,
      variants: {
        variant1: {
          variantValue: {
            button: "class-3",
            card: "class-4",
          },
        },
      },
    });

    const { button, card } = style({ variant1: "variantValue" });

    expect(button()).toEqual("class-1 class-3");
    expect(card()).toEqual("class-2 class-4");
  });

  test("should not apply changes if variant value does not exist", () => {
    const style = p({
      slots: {
        button: "class-1",
        card: "class-2",
      },
      variants: {
        variant1: {
          variantValue: {
            button: "class-3",
            card: "class-4",
          },
        },
      },
    });

    // @ts-expect-error (this scenario can happen in javascript, not in typescript)
    const { button, card } = style({ variant1: "nonExistentValue" });

    expect(button()).toEqual("class-1");
  });
});

describe("rules", () => {
  test("should apply rules", () => {
    const style = p({
      slots: {
        slot1: "class-1",
        slot2: "class-2",
      },
      variants: {
        variant1: {
          variantValue: {
            slot1: "class-3",
            slot2: "class-4",
          },
          variantValue2: {
            slot1: "class-3",
            slot2: "class-4",
          },
        },
        disabled: {
          true: {
            slot1: "class-5",
            slot2: "class-6",
          },
        },
      },
      rules: [
        {
          if: {
            variants: {
              variant1: ["variantValue"],
              disabled: ["true"],
            },
          },
          slots: {
            slot1: "class-6",
          },
        },
        {
          if: {
            variants: {
              variant1: ["variantValue"],
              disabled: ["true"],
            },
          },
          slots: {
            slot2: "class-12",
          },
        },
      ],
    });

    const { slot1: s1 } = style({ disabled: "true", variant1: "variantValue" });
    const { slot1: s2 } = style({
      disabled: "true",
      variant1: "variantValue2",
    });
    // @ts-expect-error
    const { slot1: s3 } = style({ disabled: "true", variant1: "invalidValue" });
    const { slot1: s4 } = style({
      disabled: "true",
      // @ts-expect-error
      invalidVariant: "invalidValue",
    });

    expect(s2()).toEqual("class-1 class-3 class-5");
    expect(s1()).toEqual("class-1 class-3 class-5 class-6");
    expect(s3()).toEqual("class-1 class-5");
    expect(s4()).toEqual("class-1 class-5");
  });
});
