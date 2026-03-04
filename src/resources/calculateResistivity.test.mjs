import { expect, test } from "vitest";
import { calculateResistivity } from "./calculateResistivity.mjs";

test("Copper resistivity", () => {
    expect(calculateResistivity("copper")).toBe(1.7241e-8);
});

test("Silver resistivity", () => {
    expect(calculateResistivity("silver")).toBe(1.6419999999999997e-8);
});
