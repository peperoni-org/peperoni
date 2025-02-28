import type { Slots, StyleConfig } from "./types";

/**
 * Retrieves the names of all elements in the given StyleConfig.
 *
 * @param config - The StyleConfig object.
 * @returns An array of strings representing the names of all elements.
 */

const getAllElementsNames = (config: StyleConfig): string[] => {
  const slots = (config.slots || {}) as Slots;
  const slotsNames = Object.keys(slots);
  const { extend } = config;

  if (extend) {
    return [...getAllElementsNames(extend.config), ...slotsNames];
  }
  return slotsNames;
};

export default getAllElementsNames;
