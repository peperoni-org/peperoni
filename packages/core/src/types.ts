/* eslint-disable @typescript-eslint/ban-ts-comment */
import { If } from "ts-toolbelt/out/Any/If";
import { Keys } from "ts-toolbelt/out/Any/_api";
import { List } from "ts-toolbelt/out/List/List";

import { Merge, Optional, Partial } from "ts-toolbelt/out/Object/_api";
import { ListOf, Merge as UnionMerge } from "ts-toolbelt/out/Union/_api";
import {
  HasExtendedSlotsNames,
  IsEmpty,
  IsSlotsEmpty,
  MergeVariantProps,
  VariantPropsToValues,
} from "./util.types";

export type StyleValue = string | (() => string);

export type Slots = Record<string, StyleValue>;

export type BaseVariants<slotsNames extends List = []> = {
  [variantName: string]: {
    [variantValue: string]: {
      [slotName in slotsNames[number]]?: string;
    };
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

export type BaseRules = {
  if: {
    variants: {
      [variantName: string]: string[];
    };
  };
  slots: Record<string, string>;
};

export type Rules<VV extends BaseRules = BaseRules, EN extends List = List> = {
  if: {
    variants: {
      // @ts-expect-error
      [variantName in keyof VV]?: VV[variantName][number][];
    };
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
  V extends BaseVariants<slotsNames> = BaseVariants,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>,
  // derived
  slotsNames extends List = PReturn<S, V, X>["slotsNames"],
  variantsDefinition extends object = PReturn<S, V, X>["variantsDefinition"],
  variantsValues extends object = PReturn<S, V, X>["variantsValues"]
> = {
  extend?: X;
  slots?:
    | S
    | {
        [K in slotsNames[number]]?: string;
      };
  // variants?: V & Partial<variantsDefinition, "deep">;
  variants?: V & {
    [K in keyof variantsDefinition]?: {
      [K2 in keyof variantsDefinition[K]]?: {
        [K3 in slotsNames[number]]?: string;
      };
    };
  };
  // @ts-expect-error
  rules?: Rules<variantsValues, slotsNames>[];
};
