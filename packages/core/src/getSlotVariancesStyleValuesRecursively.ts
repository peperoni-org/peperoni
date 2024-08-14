import getSlotVariancesStyleValues from "./getSlotVariancesStyleValues";
import type { StyleConfig, StyleValue, VariantsProps } from "./types";

/**
 * Retrieves all style values for a given slot recursively.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration.
 * @param variantsProps - The values of the variants.
 * @returns An array of style values.
 */

const getSlotVariancesStyleValuesRecursively = (
  slotName: string,
  config: StyleConfig,
  variantsProps: VariantsProps
): StyleValue[] => {
  const traverse = (acc: StyleValue[], config: StyleConfig): StyleValue[] => {
    const styleValues = getSlotVariancesStyleValues(
      slotName,
      config,
      variantsProps
    );
    const parentConfig = config.extend?.config;
    if (parentConfig) {
      return traverse([...styleValues, ...acc], parentConfig);
    }
    return [...styleValues, ...acc];
  };

  return traverse([], config);
};

export default getSlotVariancesStyleValuesRecursively;
