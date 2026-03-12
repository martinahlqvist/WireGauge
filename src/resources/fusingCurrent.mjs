import { calculateResistivity } from "./calculateResistivity.mjs";
import { baseResistivity } from "./constants.mjs";

/**
 * Beräknar smältström baserat på materialets resistivitet
 * @param {number} areaMm2 - Trådens area i mm²
 * @param {string} material - Namnet på materialet
 * @returns {number} - Ungefärlig smältström i Ampere
 */
export function fusingCurrent(areaMm2, material) {
    const materialPreeceConstant = calculatePreeceConstant(material);
    const diameter = 2 * Math.sqrt(areaMm2 / Math.PI);
    const ampere = materialPreeceConstant * Math.pow(diameter, 1.5);
    return Math.round(ampere);
}

export function calculatePreeceConstant(material) {
    const materialResistivity = calculateResistivity(material);

    /**
     * Justeringsfaktor baserat på resistivitet:
     * Eftersom Preece's Law bygger på k * d^1.5 för koppar,
     * kan vi skala den med sqrt(rho_koppar / rho_material)
     * eftersom värmeutvecklingen P = I² * R.
     */
    const kCopper = 80;
    const materialFactor = Math.sqrt(baseResistivity / materialResistivity);
    return kCopper * materialFactor;
}
