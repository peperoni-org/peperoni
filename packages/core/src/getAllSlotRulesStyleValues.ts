import type {
  BaseRules,
  StyleConfig,
  StyleValue,
  VariantsProps,
} from "./types";

/**
 * Retrieves all base style values for a given slot name.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration object.
 * @returns An array of style values for the slot.
 */

const matchVariants = (
  variantsQuery: BaseRules["if"]["variants"],
  variantsProps: VariantsProps
) => {
  return Object.entries(variantsQuery).every(([variantName, variantValues]) => {
    if (!(variantName in variantsProps)) {
      return false;
    }

    const variantPropValue = variantsProps[variantName] as string; // dunno why this is coming as string | number

    return variantValues.includes(variantPropValue);
  });
};

const getAllSlotRulesStyleValues = (
  slotName: string,
  config: StyleConfig,
  variantsProps: VariantsProps
): StyleValue[] => {
  const { rules } = config;

  if (!rules) {
    return [];
  }

  return rules.reduce<StyleValue[]>((acc, rule) => {
    if (!rule.slots[slotName]) {
      return acc;
    }

    const variants = rule.if.variants as BaseRules["if"]["variants"]; // TODO: fix this type later
    const matchesVariants = matchVariants(variants, variantsProps);

    if (!matchesVariants) {
      return acc;
    }

    const styleValue = rule.slots[slotName];

    return [...acc, rule.slots[slotName]];
  }, []);
};

export default getAllSlotRulesStyleValues;
