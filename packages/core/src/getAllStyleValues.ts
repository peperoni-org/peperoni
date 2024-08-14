import getAllSlotBaseStyleValues from "./getAllSlotBaseStyleValues";
import getSlotVariancesStyleValuesRecursively from "./getSlotVariancesStyleValuesRecursively";
import type { StyleConfig, StyleValue, VariantsProps } from "./types";

/**
 * Retrieves all style values for a given slot.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration.
 * @param variantsProps - The values of the variants.
 * @returns An array of style values.
 */

export const getAllStyleValues = (
  slotName: string,
  config: StyleConfig,
  variantsProps: VariantsProps
): StyleValue[] => {
  const baseStyleValues = getAllSlotBaseStyleValues(slotName, config);
  const varianceStyleValues = getSlotVariancesStyleValuesRecursively(
    slotName,
    config,
    variantsProps
  );

  return [...baseStyleValues, ...varianceStyleValues];
};
