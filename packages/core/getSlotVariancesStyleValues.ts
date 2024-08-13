import { StyleConfig, StyleValue, VariantsValues } from "./types";

const getSlotVariancesStyleValues = (
  slotName: string,
  config: StyleConfig,
  variantsValues: VariantsValues
): StyleValue[] => {
  const variants = config.variants;

  if (!variants) {
    return [];
  }

  return Object.entries(variants).reduce(
    (acc, [variantName, variantValues]) => {
      if (!variantsValues[variantName]) {
        return acc;
      }

      const variantValue = variantValues[variantsValues[variantName]];

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
