import { getMaxCurrentForArea } from "./getMaxCurrentForArea.mjs";
import { calculateResistivity } from "./calculateResistivity.mjs";

/**
 * Beräkna minsta rekommenderade tjocklek på kabel
 * @param {*} amps
 * @param {*} volt
 * @param {*} length i meter
 * @param {*} material
 * @returns
 */
export function minimumWireSizeFormula(
    amps,
    volt,
    length,
    material,
    allowableDropPercent = 0.03,
) {
    const rho = calculateResistivity(material);
    const maxVoltageDrop = volt * allowableDropPercent;

    // Beräkna minsta area baserat på spänningsfall
    let requiredArea = ((2 * length * amps * rho) / maxVoltageDrop) * 1e6;

    // Kontrollera mot värme (Standardstorlekar)
    const standardSizes = [
        0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120,
    ];

    // Hitta den första storleken som uppfyller BÅDE spänningsfall och värmekrav
    const recommended = standardSizes.find((size) => {
        const voltageDropOk = size >= requiredArea;
        const heatOk = amps <= getMaxCurrentForArea(size); // Kolla om storleken tål strömmen
        return voltageDropOk && heatOk;
    });

    return {
        theoreticalAreaByDrop: requiredArea.toFixed(2) * 1,
        recommended: recommended || "Specialdimension krävs",
    };
}
