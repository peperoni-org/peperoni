import { StyleValue } from "./types";

const resolveStyleValues = (styleValues: StyleValue[]): string => {
  return styleValues
    .reduce<string>((acc, styleValue) => {
      if (typeof styleValue === "function") {
        return acc + " " + styleValue();
      }
      return acc + " " + styleValue;
    }, "")
    .trim();
};

export default resolveStyleValues;
