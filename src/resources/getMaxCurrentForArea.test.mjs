import { expect, test } from "vitest";
import { getMaxCurrentForArea } from "./getMaxCurrentForArea.mjs";

test("Ampacity approximation from chart", () => {
    expect(getMaxCurrentForArea(1.5)).toBeGreaterThanOrEqual(15);
    expect(getMaxCurrentForArea(1.5)).toBeLessThanOrEqual(20);

    expect(getMaxCurrentForArea(2.5)).toBeGreaterThanOrEqual(20);
    expect(getMaxCurrentForArea(2.5)).toBeLessThanOrEqual(30);

    expect(getMaxCurrentForArea(4)).toBeGreaterThanOrEqual(28);
    expect(getMaxCurrentForArea(4)).toBeLessThanOrEqual(38);

    expect(getMaxCurrentForArea(6)).toBeGreaterThanOrEqual(36);
    expect(getMaxCurrentForArea(6)).toBeLessThanOrEqual(46);

    expect(getMaxCurrentForArea(10)).toBeGreaterThanOrEqual(50);
    expect(getMaxCurrentForArea(10)).toBeLessThanOrEqual(65);

    expect(getMaxCurrentForArea(16)).toBeGreaterThanOrEqual(70);
    expect(getMaxCurrentForArea(16)).toBeLessThanOrEqual(85);

    expect(getMaxCurrentForArea(25)).toBeGreaterThanOrEqual(90);
    expect(getMaxCurrentForArea(25)).toBeLessThanOrEqual(110);

    expect(getMaxCurrentForArea(35)).toBeGreaterThanOrEqual(110);
    expect(getMaxCurrentForArea(35)).toBeLessThanOrEqual(140);

    expect(getMaxCurrentForArea(50)).toBeGreaterThanOrEqual(135);
    expect(getMaxCurrentForArea(50)).toBeLessThanOrEqual(165);

    expect(getMaxCurrentForArea(70)).toBeGreaterThanOrEqual(170);
    expect(getMaxCurrentForArea(70)).toBeLessThanOrEqual(210);
});

test("Ampacity increases with cable size", () => {
    const sizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];

    for (let i = 1; i < sizes.length; i++) {
        expect(getMaxCurrentForArea(sizes[i])).toBeGreaterThan(
            getMaxCurrentForArea(sizes[i - 1]),
        );
    }
});
