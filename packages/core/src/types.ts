/* eslint-disable @typescript-eslint/ban-ts-comment */
import { If } from "ts-toolbelt/out/Any/If";
import { Cast, Keys } from "ts-toolbelt/out/Any/_api";
import { List } from "ts-toolbelt/out/List/List";
import { Merge, Optional, Partial } from "ts-toolbelt/out/Object/_api";
import { ListOf, Merge as MergeUnion } from "ts-toolbelt/out/Union/_api";

export type IsEmpty<T, X = { [x: string]: string | number | symbol }> = [
  T
] extends [X]
  ? [X] extends [T]
    ? 1
    : 0
  : 0;

export type StyleValue = string | (() => string);
export type Slots = Record<string, StyleValue>;
export type Variants<E extends Slots = Slots> = {
  [variantName: string]: {
    [variantValue: string]: E;
  };
};

export type VariantsValues<V extends Variants = Variants> = {
  [variantName in keyof V]: keyof V[variantName];
};

export type VariantsDefinition<V extends Variants, slotNames extends List> = {
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

export type IsStringNumberSymbol<T> = T extends [string, number, symbol]
  ? false
  : true;
export type HasExtendedSlotsNames<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>
> = IsStringNumberSymbol<X["slotsNames"]> extends true ? 1 : 0;

export type PReturn<
  S extends Slots = Slots,
  V extends Variants = Variants,
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
    VariantsDefinition<V, PReturn<S, V, X>["slotsNames"]>,
    Merge<
      VariantsDefinition<V, PReturn<S, V, X>["slotsNames"]>,
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
  V extends Variants = Variants,
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
