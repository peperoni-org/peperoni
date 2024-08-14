import { PReturn } from "./types";

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
