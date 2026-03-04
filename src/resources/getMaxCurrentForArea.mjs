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

    // En förenklad men realistisk modell för värmetålighet (PVC i rör/vägg)
    /*
  // Dessa värden är baserade på svenska standarden SS 436 40 00 (ungefärliga)
  if (area < 1.5) return area * 6; // Små kablar är känsliga
  if (area === 1.5) return 13; // 1.5 mm² tål ca 13A (vid 25°C i rör)
  if (area === 2.5) return 18; // 2.5 mm² tål ca 18A
  if (area === 4) return 24;
  if (area === 6) return 31;
  if (area === 10) return 43;

  // För större areor ökar inte kapaciteten linjärt
  return 13.5 * Math.pow(area, 0.625) * 0.8;
  */
}
