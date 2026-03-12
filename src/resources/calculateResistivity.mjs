import { baseResistivity } from "./constants.mjs";

/**
 * Beräkna resistivitet hos olika material
 * @param {*} material
 * @returns resistivitet i Ω·m
 */
export function calculateResistivity(material) {
    let iacsPercent;

    switch (material) {
        case "copper":
            iacsPercent = 100.0; // Standard mjukglödgad koppar är 100%
            break;
        case "silver":
            iacsPercent = 105.0;
            break;
        case "gold":
            iacsPercent = 70.0;
            break;
        case "aluminium":
            iacsPercent = 61.0; // legerat aluminium EC61 (rent aluminium (1350-grad) 64.94)
            break;
        default:
            iacsPercent = 100.0;
    }

    // Dividera med procentandelen (som decimal) eftersom
    // bättre ledningsförmåga = lägre resistivitet
    const resistivity = baseResistivity / (iacsPercent / 100);

    return resistivity;
}
