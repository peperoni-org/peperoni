import createSlotClassesResolver from "./createSlotClassesResolver";
import getAllSlotsNames from "./getAllSlotsNames";
import type {
  Slots,
  PReturn,
  StyleConfig,
  BaseVariants,
  VariantsProps,
} from "./types";

export function p<
  S extends Slots,
  V extends BaseVariants,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>
>(config: StyleConfig<S, V, X>): PReturn<S, V, X, StyleConfig<S, V>> {
  const slotsNames = getAllSlotsNames(config as StyleConfig);

  const variantsApplier = (variantsProps?: VariantsProps) => {
    return slotsNames.reduce((acc, slotName) => {
      return {
        ...acc,
        [slotName]: createSlotClassesResolver(
          slotName,
          config as StyleConfig,
          variantsProps
        ),
      };
    }, {});
  };
  return Object.assign(variantsApplier, {
    config,
    slotsNames: slotsNames,
    variantsProps: {},
    variantsDefinition: {},
  }) as unknown as PReturn<S, V, X, StyleConfig<S, V>>;
}
