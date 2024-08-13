import { getAllStyleValues } from "./getAllStyleValues";
import resolveStyleValues from "./resolveStyleValues";
import type { StyleConfig, VariantsValues } from "./types";

const createSlotClassesResolver =
  (slotName: string, config: StyleConfig) =>
  (variantsValues: VariantsValues): string => {
    const styleValues = getAllStyleValues(slotName, config, variantsValues);
    return resolveStyleValues(styleValues);
  };

export default createSlotClassesResolver;
