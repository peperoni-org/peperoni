import getAllSlotBaseStyleValues from "./getAllSlotBaseStyleValues";
import getSlotVariancesStyleValuesRecursively from "./getSlotVariancesStyleValuesRecursively";
import type { StyleConfig, StyleValue, VariantsValues } from "./types";

/**
 * Retrieves all style values for a given slot.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration.
 * @param variantsValues - The values of the variants.
 * @returns An array of style values.
 */

export const getAllStyleValues = (
  slotName: string,
  config: StyleConfig,
  variantsValues: VariantsValues
): StyleValue[] => {
  const baseStyleValues = getAllSlotBaseStyleValues(slotName, config);
  const varianceStyleValues = getSlotVariancesStyleValuesRecursively(
    slotName,
    config,
    variantsValues
  );

  return [...baseStyleValues, ...varianceStyleValues];
};
