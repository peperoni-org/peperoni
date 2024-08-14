import { StyleConfig, StyleValue, VariantsProps } from "./types";

/**
 * Retrieves all style values for a given slot.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration.
 * @param variantsProps - The values of the variants.
 * @returns An array of style values.
 */

const getSlotVariancesStyleValues = (
  slotName: string,
  config: StyleConfig,
  variantsProps: VariantsProps
): StyleValue[] => {
  const variants = config.variants;

  if (!variants) {
    return [];
  }

  return Object.entries(variants).reduce(
    (acc, [variantName, variantValues]) => {
      if (!variantsProps[variantName]) {
        return acc;
      }

      const variantValue = variantValues[variantsProps[variantName]];

      if (!variantValue) {
        return acc;
      }

      const styleValue = variantValue[slotName];

      if (!styleValue) {
        return acc;
      }

      return [...acc, styleValue];
    },
    [] as StyleValue[]
  );
};

export default getSlotVariancesStyleValues;
