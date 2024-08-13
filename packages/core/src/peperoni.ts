import createSlotClassesResolver from "./createSlotClassesResolver";
import getAllSlotsNames from "./getAllSlotsNames";
import type {
  Slots,
  PReturn,
  StyleConfig,
  Variants,
  VariantsValues,
} from "./types";

export function p<
  S extends Slots,
  V extends Variants,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>
>(config: StyleConfig<S, V, X>): PReturn<S, V, X, StyleConfig<S, V>> {
  const slotsNames = getAllSlotsNames(config as StyleConfig);

  const applyStyles = (variantsValues?: VariantsValues) => {
    return slotsNames.reduce((acc, slotName) => {
      return {
        ...acc,
        [slotName]: createSlotClassesResolver(
          slotName,
          config as StyleConfig,
          variantsValues
        ),
      };
    }, {});
  };
  return Object.assign(applyStyles, {
    config,
    slotsNames: slotsNames,
    variantsValues: {},
    variantsDefinition: {},
  }) as unknown as PReturn<S, V, X, StyleConfig<S, V>>;
}
