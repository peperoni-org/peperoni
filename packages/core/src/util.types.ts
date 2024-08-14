import { If } from "ts-toolbelt/out/Any/If";
import { ListOf, Merge as MergeUnion } from "ts-toolbelt/out/Union/_api";
import { BaseVariants, PReturn, VariantsProps } from "./types";
import { Compute } from "ts-toolbelt/out/Any/Compute";

export type IsEmpty<T, X = { [x: string]: string | number | symbol }> = [
  T
] extends [X]
  ? [X] extends [T]
    ? 1
    : 0
  : 0;

export type IsStringNumberSymbol<T> = T extends [string, number, symbol]
  ? false
  : true;
export type HasExtendedSlotsNames<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X extends PReturn<any, any, any> = PReturn<any, any, any>
> = IsStringNumberSymbol<X["slotsNames"]> extends true ? 1 : 0;

export type IsSlotsEmpty<T> = string extends keyof T ? 1 : 0;

export type MergeVariantProps<
  V extends BaseVariants,
  VP extends object
> = Compute<
  If<IsEmpty<VP>, VariantsProps<V>, MergeUnion<VP | VariantsProps<V>>>
>;

export type VariantPropsToValues<VV extends object> = Compute<{
  [variantName in keyof VV]: ListOf<VV[variantName]>;
}>;
