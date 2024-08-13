import type { Slots, StyleConfig, StyleValue } from "./types";

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
