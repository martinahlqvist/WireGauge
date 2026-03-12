import { describe, it, expect, vi } from "vitest";
import { fusingCurrent } from "./fusingCurrent.mjs";

// Vi mockar calculateResistivity för att ha full kontroll över testerna
vi.mock("./calculateResistivity.mjs", () => ({
    calculateResistivity: vi.fn((material) => {
        const mapping = {
            copper: 1.7241e-8,
            silver: 1.642e-8,
            aluminium: 2.826e-8,
        };
        return mapping[material] || 1.7241e-8;
    }),
}));

describe("fusingCurrent", () => {
    it("bör returnera förväntad smältström för standard 1.5mm2 koppar", () => {
        const result = fusingCurrent(1.5, "copper");
        // Diameter ~1.38mm. 80 * 1.38^1.5 ≈ 129A (beroende på avrundning i formeln)
        expect(result).toBeGreaterThan(120);
        expect(result).toBeLessThan(140);
    });

    it("bör visa att silver smälter vid högre ström än koppar", () => {
        const copper = fusingCurrent(1.0, "copper");
        const silver = fusingCurrent(1.0, "silver");

        expect(silver).toBeGreaterThan(copper);
    });

    it("bör visa att aluminium smälter vid lägre ström än koppar", () => {
        const copper = fusingCurrent(2.5, "copper");
        const aluminium = fusingCurrent(2.5, "aluminium");

        expect(aluminium).toBeLessThan(copper);
    });

    it("bör skala proportionellt när arean ökar", () => {
        const small = fusingCurrent(0.5, "copper");
        const large = fusingCurrent(4.0, "copper");

        expect(large).toBeGreaterThan(small * 2);
    });

    it("bör hantera 0mm2 area genom att returnera 0", () => {
        expect(fusingCurrent(0, "copper")).toBe(0);
    });

    it("bör returnera ett heltal (round)", () => {
        const result = fusingCurrent(1.234, "copper");
        expect(Number.isInteger(result)).toBe(true);
    });
});
