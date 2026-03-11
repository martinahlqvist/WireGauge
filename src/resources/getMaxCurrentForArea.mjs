/**
 * Maximal ström för ytan i mm2
 * @param {*} area
 * @param {*} isBundled
 * @returns Max ampere
 */
export function getMaxCurrentForArea(area, isBundled = false) {
    // En förenklad modell av IEC-tabeller för PVC-kabel i luft
    // Kapaciteten ökar inte linjärt med arean
    const baseCapacity = 13.5 * Math.pow(area, 0.625);
    let factor = 1.0;
    if (isBundled) factor *= 0.7; // Sänk kapacitet om kablar ligger tätt
    return baseCapacity * factor;
}
