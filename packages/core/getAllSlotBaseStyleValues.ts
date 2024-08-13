import type { Slots, StyleConfig, StyleValue } from "./types";

/**
 * Retrieves all base style values for a given slot name.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration object.
 * @returns An array of style values for the slot.
 */

const getAllSlotBaseStyleValues = (
  slotName: string,
  config: StyleConfig
): StyleValue[] => {
  const slots = (config.slots || {}) as Slots;
  const styleValue = slots[slotName] || "";

  if (config.extend) {
    return [
      ...getAllSlotBaseStyleValues(slotName, config.extend.config),
      styleValue,
    ].filter(Boolean);
  }

  return [styleValue];
};

export default getAllSlotBaseStyleValues;
