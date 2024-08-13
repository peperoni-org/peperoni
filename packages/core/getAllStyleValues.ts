import getAllSlotBaseStyleValues from "./getAllSlotBaseStyleValues";
import getSlotVariancesStyleValuesRecursively from "./getSlotVariancesStyleValuesRecursively";
import type { StyleConfig, StyleValue, VariantsValues } from "./types";

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
