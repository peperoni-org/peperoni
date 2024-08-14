/* eslint-disable @typescript-eslint/ban-ts-comment */
import { If } from "ts-toolbelt/out/Any/If";
import { Cast, Keys } from "ts-toolbelt/out/Any/_api";
import { List } from "ts-toolbelt/out/List/List";
import { Merge, Optional, Partial } from "ts-toolbelt/out/Object/_api";
import { ListOf, Merge as MergeUnion } from "ts-toolbelt/out/Union/_api";
import { HasExtendedSlotsNames, IsEmpty } from "./util.types";

export type StyleValue = string | (() => string);

export type Slots = Record<string, StyleValue>;

export type BaseVariants = {
  [variantName: string]: {
    [variantValue: string]: Slots;
  };
};

export type VariantsValues<V extends BaseVariants = BaseVariants> = {
  [variantName in keyof V]: keyof V[variantName];
};

export type Variants<V extends BaseVariants, slotNames extends List> = {
  [variantName in keyof V]: {
    [variantValue in keyof V[variantName]]: Record<slotNames[number], string>;
  };
};

export type Conditions<VV extends object, EN extends List> = {
  variants: Partial<NoInfer<VV>>;
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
  config: Cast<NoInfer<C>, StyleConfig>;
  slotsNames: If<
    HasExtendedSlotsNames<X>,
    ListOf<Keys<S> | X["slotsNames"][number]>,
    ListOf<Keys<S>>
  >;
  variantsValues: If<
    IsEmpty<X["variantsValues"]>,
    VariantsValues<V>,
    MergeUnion<X["variantsValues"] | VariantsValues<V>>
  >;
  variantsDefinition: If<
    IsEmpty<X["variantsDefinition"]>,
    Variants<V, PReturn<S, V, X>["slotsNames"]>,
    Merge<
      Variants<V, PReturn<S, V, X>["slotsNames"]>,
      X["variantsDefinition"],
      "deep"
    >
  >;
  (props?: Optional<PReturn<S, V, X>["variantsValues"]>): {
    [slotName in PReturn<S, V, X>["slotsNames"][number]]: (
      props?: Optional<PReturn<S, V, X>["variantsValues"]>
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
  variantsValues extends object = PReturn<S, V, X>["variantsValues"]
> = {
  extend?: X;
  slots?:
    | S
    | {
        [K in slotsNamesType[number]]?: string;
      };
  variants?: V & Partial<variantsDefinition, "deep">;
  conditions?: Conditions<variantsValues, PReturn<S, V, X>["slotsNames"]>[];
};
