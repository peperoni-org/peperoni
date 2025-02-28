import { getAllStyleValues } from "./getAllStyleValues";
import resolveStyleValues from "./resolveStyleValues";
import type { StyleConfig, VariantsProps } from "./types";

/**
 * Creates a resolver function for slot classes.
 *
 * @param slotName - The name of the slot.
 * @param config - The style configuration.
 * @returns A resolver function that takes variants values and returns a string of resolved style values.
 */

const createSlotClassesResolver =
  (slotName: string, config: StyleConfig, variantsProps?: VariantsProps) =>
  (specifVariantsValues?: VariantsProps): string => {
    const mergedVariantsValues: VariantsProps = {
      ...variantsProps,
      ...specifVariantsValues,
    };

    const styleValues = getAllStyleValues(
      slotName,
      config,
      mergedVariantsValues
    );
    return resolveStyleValues(styleValues);
  };

export default createSlotClassesResolver;
