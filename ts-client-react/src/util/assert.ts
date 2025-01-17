import { AssertionError } from "assert";

export function must<T>(input: T, message: string = "Cannot be null or undefined"): NonNullable<T> {
  assert(input !== null && input !== undefined, message);

  return input as NonNullable<T>;
}

export function assert(condition: any, message: string = "assertion failed"): asserts condition {
  if (!condition) {
    throw new AssertionError({ message, actual: condition, expected: true });
  }
}

