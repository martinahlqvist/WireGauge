import { getMaxCurrentForArea } from "./getMaxCurrentForArea.mjs";
import { calculateResistivity } from "./calculateResistivity.mjs";

/**
 * Beräkna minsta rekommenderade tjocklek på kabel
 * @param {*} ampere
 * @param {*} längd i meter (enkel väg)
 * @param {*} material
 * @param {*} spänningsfall volt
 * @returns
 */
export function minimumWireSizeFormula(amps, length, maxVoltageDrop, material) {
    if (!material) {
        material = "copper";
    }

    if (!maxVoltageDrop || isNaN(maxVoltageDrop)) {
        maxVoltageDrop = "0.3";
    }

    length = length * 2;

    const rho = calculateResistivity(material); //* 1.2; // Addera för korrision och värme
    //const theoreticArea = length * amps * rho * 1e6;
    const heatAndCorrosionFactor = 1.1;
    const rhoConverted = rho * 1e6;
    console.log("rho", rhoConverted);
    const area = amps * length * rhoConverted;
    const requiredArea = (area / maxVoltageDrop) * heatAndCorrosionFactor;

    console.log("area", area, " / ", maxVoltageDrop, " = ", requiredArea);

    const standardSizes = [
        0.75, 1, 1.5, 2.5, 4, 4.5, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185,
        240,
    ];

    const recommended = standardSizes.find((size) => {
        const voltageDropOk = size >= requiredArea;
        //const heatOk = amps <= getMaxCurrentForArea(size);
        return voltageDropOk; // && heatOk;
    });

    return {
        theoreticalAreaByDrop: requiredArea.toFixed(2) * 1,
        recommended: recommended || "Size out of range",
    };
}
