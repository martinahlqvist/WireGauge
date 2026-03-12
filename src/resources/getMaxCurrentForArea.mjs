import { fusingCurrent } from "./fusingCurrent.mjs";

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

/**
 * Returnerar en profil för kabelns strömgränser
 */
export function getCableSafetyProfile(area, material, isBundled = false) {
    const maxSafe = getMaxCurrentForArea(area, isBundled);
    const fusingPoint = fusingCurrent(area, material);

    return {
        safeLimit: Math.round(maxSafe), // Gräns för daglig drift
        fusingLimit: Math.round(fusingPoint), // Gräns för totalt haveri
        safetyMargin: Math.round((fusingPoint / maxSafe) * 100) + "%",
    };
}
