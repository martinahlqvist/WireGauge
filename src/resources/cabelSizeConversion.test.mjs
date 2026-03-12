import { expect, test } from "vitest";
import { mmToAWG, areaToStandardSize } from "./cabelSizeConversion.mjs";

test("mmToAWG less then 1mm conversions", () => {
    expect(mmToAWG(0.05)).toBe("30");
    expect(mmToAWG(0.08)).toBe("28");
    expect(mmToAWG(0.14)).toBe("26");
    expect(mmToAWG(0.25)).toBe("23");
    expect(mmToAWG(0.34)).toBe("22");
    expect(mmToAWG(0.38)).toBe("21");
    expect(mmToAWG(0.5)).toBe("20");
    expect(mmToAWG(0.75)).toBe("18");
});

test("mmToAWG less then 1mm conversions", () => {
    expect(mmToAWG(1)).toBe("17");
});

test("mmToAWG larger then 1mm conversions", () => {
    expect(mmToAWG(1.5)).toBe("15");
    expect(mmToAWG(2.5)).toBe("13");
    expect(mmToAWG(4)).toBe("11");
    expect(mmToAWG(6)).toBe("9");
    expect(mmToAWG(10)).toBe("7");
    expect(mmToAWG(16)).toBe("5");
    expect(mmToAWG(25)).toBe("3");
    expect(mmToAWG(35)).toBe("2");
    expect(mmToAWG(50)).toBe("1/0");
    expect(mmToAWG(70)).toBe("2/0");
    expect(mmToAWG(95)).toBe("3/0");
    expect(mmToAWG(120)).toBe("4/0");
});

// prettier-ignore
test("mmToAWG: return empty string for null", () => {
    expect(mmToAWG(null)).toBe(null);
});

// prettier-ignore
test("areaToStandardSize: return 0.14 for requiredArea 0.1", () => {
    expect(areaToStandardSize(0.1)).toBe(0.14);
});

// prettier-ignore
test("areaToStandardSize: return 0.75 for requiredArea 0.75", () => {
    expect(areaToStandardSize(0.75)).toBe(0.75);
});

// prettier-ignore
test("areaToStandardSize: return 1 for requiredArea 0.8", () => {
    expect(areaToStandardSize(0.8)).toBe(1);
});

// prettier-ignore
test("areaToStandardSize: return 1 for requiredArea 1.0", () => {
    expect(areaToStandardSize(1.0)).toBe(1);
});

// prettier-ignore
test("areaToStandardSize: return 1.5 for requiredArea 1.1", () => {
    expect(areaToStandardSize(1.1)).toBe(1.5);
});

// prettier-ignore
test("areaToStandardSize: return 2.5 for requiredArea 1.6", () => {
    expect(areaToStandardSize(1.6)).toBe(2.5);
});

// prettier-ignore
test("areaToStandardSize: return 4 for requiredArea 2.6", () => {
    expect(areaToStandardSize(2.6)).toBe(4);
});

// prettier-ignore
test("areaToStandardSize: return 6 for requiredArea 4.1", () => {
    expect(areaToStandardSize(4.1)).toBe(6);
});

// prettier-ignore
test("areaToStandardSize: return 10 for requiredArea 6.5", () => {
    expect(areaToStandardSize(6.5)).toBe(10);
});

// prettier-ignore
test("areaToStandardSize: return 16 for requiredArea 10.5", () => {
    expect(areaToStandardSize(10.5)).toBe(16);
});

// prettier-ignore
test("areaToStandardSize: return 25 for requiredArea 16.5", () => {
    expect(areaToStandardSize(16.5)).toBe(25);
});

// prettier-ignore
test("areaToStandardSize: return 35 for requiredArea 25.5", () => {
    expect(areaToStandardSize(25.5)).toBe(35);
});

// prettier-ignore
test("areaToStandardSize: return 50 for requiredArea 35.5", () => {
    expect(areaToStandardSize(35.5)).toBe(50);
});

// prettier-ignore
test("areaToStandardSize: return 70 for requiredArea 50.5", () => {
    expect(areaToStandardSize(50.5)).toBe(70);
});

// prettier-ignore
test("areaToStandardSize: return 95 for requiredArea 70.5", () => {
    expect(areaToStandardSize(70.5)).toBe(95);
});

// prettier-ignore
test("areaToStandardSize: return 120 for requiredArea 95.5", () => {
    expect(areaToStandardSize(95.5)).toBe(120);
});

// prettier-ignore
test("areaToStandardSize: return 150 for requiredArea 120.5", () => {
    expect(areaToStandardSize(120.5)).toBe(150);
});

// prettier-ignore
test("areaToStandardSize: return 185 for requiredArea 150.5", () => {
    expect(areaToStandardSize(150.5)).toBe(185);
});

// prettier-ignore
test("areaToStandardSize: return 240 for requiredArea 185.5", () => {
    expect(areaToStandardSize(185.5)).toBe(240);
});

// prettier-ignore
test("areaToStandardSize: return null for requiredArea exceeding max", () => {
    expect(areaToStandardSize(250)).toBe(null);
    expect(areaToStandardSize(1000)).toBe(null);
});

// prettier-ignore
test("areaToStandardSize: return null for negative values", () => {
    expect(areaToStandardSize(-5)).toBe(null);
});

// prettier-ignore
test("areaToStandardSize: handle 0 gracefully", () => {
    expect(areaToStandardSize(0)).toBe(0.75);
});

// prettier-ignore
test("areaToStandardSize: return null for non-number types", () => {
    expect(areaToStandardSize("5")).toBe(null);
    expect(areaToStandardSize(undefined)).toBe(null);
    expect(areaToStandardSize(null)).toBe(null);
});

// prettier-ignore
test("areaToStandardSize: return null for NaN", () => {
    expect(areaToStandardSize(NaN)).toBe(null);
});

// prettier-ignore
test("areaToStandardSize: return null for Infinity", () => {
    expect(areaToStandardSize(Infinity)).toBe(null);
    expect(areaToStandardSize(-Infinity)).toBe(null);
});

test("areaToStandardSize rounds up correctly", () => {
    expect(areaToStandardSize(3)).toBe(4);
    expect(areaToStandardSize(4)).toBe(4);
    expect(areaToStandardSize(4.1)).toBe(6);
});

test("mmToAWG conversion", () => {
    expect(mmToAWG(2.5)).toBe("13");
    expect(mmToAWG(4)).toBe("11");
    expect(mmToAWG(50)).toBe("1/0");
});
