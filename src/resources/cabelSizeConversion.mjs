const AWG_TABLE = {
    0.75: "18",
    1: "17",
    1.5: "15",
    2.5: "13",
    4: "11",
    6: "9",
    10: "7",
    16: "6",
    25: "3",
    35: "2",
    50: "1/0",
    70: "2/0",
    95: "3/0",
    120: "4/0",
    150: "4/0",
    185: "4/0",
    240: "4/0",
};

/**
 * Konverterar en area i mm² till motsvarande AWG-storlek enligt
 * tabellen nedan. Förväntar sig ett numeriskt värde och returnerar
 * en sträng som representerar AWG‑storleken.
 *
 * 1.0  ->  "17"
 * 1.5  ->  "15"
 * 2.5  ->  "13"
 * 4.0  ->  "11"
 * 6.0  ->  "9"
 * 10.0 ->  "7"
 * 16.0 ->  "6"
 * 25.0 ->  "3"
 * 35.0 ->  "2"
 * 50.0 ->  "1/0"
 * 70.0 ->  "2/0"
 * 95.0 ->  "3/0"
 * 120.0->  "4/0"
 *
 * Om värdet inte finns i tabellen returneras en tom sträng. Eventuell
 * avrundning eller hantering av mellanvärden sköts av den som anropar
 * funktionen.
 *
 * @param {number} area - area i mm²
 * @returns {string} AWG‑storlek
 */
export function mmToAWG(area) {
    const standardArea = areaToStandardSize(area);
    if (!standardArea) return null;

    return AWG_TABLE[standardArea] ?? null;
}

export function mm2ToAWG(area) {
    q;

    if (!Number.isFinite(area) || area <= 0) return null;

    // area → diameter
    const diameter = Math.sqrt((4 * area) / Math.PI);

    // diameter → AWG
    const awg = 36 - 39 * (Math.log(diameter / 0.127) / Math.log(92));

    return Math.round(awg);
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

    const standardSizes = [
        0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240,
    ];

    const recommended = standardSizes.find((size) => size >= requiredArea);
    return recommended != null ? recommended : null;
}
