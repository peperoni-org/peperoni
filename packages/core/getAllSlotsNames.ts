import type { Slots, StyleConfig } from "./types";

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
