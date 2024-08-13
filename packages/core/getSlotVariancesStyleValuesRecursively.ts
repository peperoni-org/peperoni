import getSlotVariancesStyleValues from "./getSlotVariancesStyleValues";
import type { StyleConfig, StyleValue, VariantsValues } from "./types";

const getSlotVariancesStyleValuesRecursively = (
  slotName: string,
  config: StyleConfig,
  variantsValues: VariantsValues
): StyleValue[] => {
  const traverse = (acc: StyleValue[], config: StyleConfig): StyleValue[] => {
    const styleValues = getSlotVariancesStyleValues(
      slotName,
      config,
      variantsValues
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
