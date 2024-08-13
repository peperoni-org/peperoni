import { StyleValue } from "./types";

/**
 * Resolves all style values into a single string.
 *
 * @param styleValues - An array of style values.
 * @returns A single string of style values.
 */

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
