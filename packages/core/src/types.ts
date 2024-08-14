/* eslint-disable @typescript-eslint/ban-ts-comment */
import { If } from "ts-toolbelt/out/Any/If";
import { Cast, Compute, Is, Keys } from "ts-toolbelt/out/Any/_api";
import { List } from "ts-toolbelt/out/List/List";
import { Merge, Optional, Partial } from "ts-toolbelt/out/Object/_api";
import { ListOf, Merge as MergeUnion } from "ts-toolbelt/out/Union/_api";
import {
  HasExtendedSlotsNames,
  IsEmpty,
  IsSlotsEmpty,
  MergeVariantProps,
  VariantPropsToValues,
} from "./util.types";

export type StyleValue = string | (() => string);

export type Slots = Record<string, StyleValue>;

export type BaseVariants = {
  [variantName: string]: {
    [variantValue: string]: Slots;
  };
};

export type VariantsProps<V extends BaseVariants = BaseVariants> = {
  [variantName in keyof V]: keyof V[variantName];
};

export type VariantsValues<V extends BaseVariants = BaseVariants> = {
  [variantName in keyof V]: ListOf<keyof V[variantName]>;
};

export type Variants<V extends BaseVariants, slotNames extends List> = {
  [variantName in keyof V]: {
    [variantValue in keyof V[variantName]]: Record<slotNames[number], string>;
  };
};

export type Rules<VV extends object, EN extends List> = {
  if: {
    variants: Partial<NoInfer<VV>>;
  };
  slots: {
    [slotName in EN[number]]?: string;
  };
};

export type PReturn<
  S extends Slots = Slots,
  V extends BaseVariants = BaseVariants,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  C extends object = {}
> = {
  config: NoInfer<C>;
  slotsNames: If<
    HasExtendedSlotsNames<X>,
    If<
      IsSlotsEmpty<S>,
      X["slotsNames"],
      ListOf<Keys<S> | X["slotsNames"][number]>
    >,
    ListOf<Keys<S>>
  >;
  selfSlots: NoInfer<S>;
  variantsProps: MergeVariantProps<V, X["variantsProps"]>;
  variantsValues: VariantPropsToValues<
    MergeVariantProps<V, X["variantsProps"]>
  >;
  extendedVariantsValues: X["variantsValues"];
  variantsDefinition: If<
    IsEmpty<X["variantsDefinition"]>,
    Variants<V, PReturn<S, V, X>["slotsNames"]>,
    Merge<
      Variants<V, PReturn<S, V, X>["slotsNames"]>,
      X["variantsDefinition"],
      "deep"
    >
  >;
  (props?: Optional<PReturn<S, V, X>["variantsProps"]>): {
    [slotName in PReturn<S, V, X>["slotsNames"][number]]: (
      props?: Optional<PReturn<S, V, X>["variantsProps"]>
    ) => string;
  };
};

export type StyleConfig<
  S extends Slots = Slots,
  V extends BaseVariants = BaseVariants,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>,
  // derived
  slotsNamesType extends List = PReturn<S, V, X>["slotsNames"],
  variantsDefinition extends object = PReturn<S, V, X>["variantsDefinition"],
  variantsProps extends object = PReturn<S, V, X>["variantsProps"]
> = {
  extend?: X;
  slots?:
    | S
    | {
        [K in slotsNamesType[number]]?: string;
      };
  variants?: V & Partial<variantsDefinition, "deep">;
  rules?: Rules<variantsProps, PReturn<S, V, X>["slotsNames"]>[];
};
