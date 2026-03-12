import { AWG_TABLE, standardWireSizes } from "./constants.mjs";

/**
 * Konverterar en area i mm² till motsvarande AWG-storlek.
 * arean räknas om till standard storlek innan konvertering.
 *
 * @param {number} area - area i mm²
 * @returns {string} AWG‑storlek
 */
export function oldmmToAWG(area) {
    const standardArea = areaToStandardSize(area);
    if (!standardArea) return null;

    return AWG_TABLE[standardArea] ?? null;
}

export function calculatedmm2ToAWG(area) {
    const standardArea = areaToStandardSize(area);

    if (!Number.isFinite(standardArea) || standardArea <= 0) return null;

    // area → diameter
    const diameter = Math.sqrt((4 * standardArea) / Math.PI);

    // diameter → AWG
    const awg = 36 - 39 * (Math.log(diameter / 0.127) / Math.log(92));

    console.log(awg);

    return Math.round(awg);
}

export function mmToAWG(area) {
    const awg = calculatedmm2ToAWG(area);
    if (awg === null) return null;

    if (awg >= 1) return String(awg);

    const zeroSize = `${Math.abs(awg) + 1}/0`;

    if (
        (zeroSize == "1/0") | (zeroSize == "2/0") ||
        zeroSize == "3/0" ||
        zeroSize == "4/0"
    ) {
        return zeroSize;
    } else {
        return "4/0";
    }
}

/**
 * Hitta minsta standardkabelarea som är större än eller lika med
 * angivet område.
 *
 * @param {number} requiredArea - den teoretiskt nödvändiga kabelarean
 * @returns {number|null} den rekommenderade standardarean eller `null`
 * om inget standardmått är tillräckligt stort
 */
export function areaToStandardSize(requiredArea) {
    // Validera att input är ett nummer
    if (!Number.isFinite(requiredArea)) {
        return null;
    }

    // Hantera negativa värden
    if (requiredArea < 0) {
        return null;
    }

    // Hantera noll
    if (requiredArea === 0) {
        return 0.75;
    }

    const recommended = standardWireSizes.find((size) => size >= requiredArea);
    return recommended != null ? recommended : null;
}
