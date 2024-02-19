import sum from "./sum";
import { expect, it } from "vitest";

it("sum", () => {
  expect(sum(1, 2)).toBe(3);
});
