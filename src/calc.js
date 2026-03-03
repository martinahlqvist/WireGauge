/**
 * Beräkna resistivitet hos olika material
 * @param {*} material
 * @returns resistivitet i Ω·m
 */
function calculateResistivity(material) {
  let iacsPercent;

  switch (material) {
    case "copper":
      iacsPercent = 100.0; // Standard mjukglödgad koppar är 100%
      break;
    case "silver":
      iacsPercent = 105.0; // Silver leder bättre än koppar
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

  // Resistivitet för 100% IACS vid 20°C i Ω·m
  const baseResistivity = 1.7241e-8;

  // Dividera med procentandelen (som decimal) eftersom
  // bättre ledningsförmåga = lägre resistivitet
  const resistivity = baseResistivity / (iacsPercent / 100);

  return resistivity;
}

function getMaxCurrentForArea(area, isBundled = false) {
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

/**
 * Beräkna minsta rekommenderade tjocklek på kabel
 * @param {*} amps
 * @param {*} volt
 * @param {*} length i meter
 * @param {*} material
 * @returns
 */
function minimumWireSizeFormula(
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
  const standardSizes = [0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];

  // Hitta den första storleken som uppfyller BÅDE spänningsfall och värmekrav
  const recommended = standardSizes.find((size) => {
    const voltageDropOk = size >= requiredArea;
    const heatOk = amps <= getMaxCurrentForArea(size); // Kolla om storleken tål strömmen
    return voltageDropOk && heatOk;
  });

  return {
    theoreticalAreaByDrop: requiredArea.toFixed(2)*1,
    recommended: recommended || "Specialdimension krävs",
  };
}



console.log("10amp 230v 25m:", minimumWireSizeFormula(10, 230, 25, "copper").recommended, "mm2");

console.log("10amp 12v 5m:", minimumWireSizeFormula(10, 12, 5, "copper").recommended, "mm2");
console.log("65amp 12v 0.25m:", 
  minimumWireSizeFormula(65, 12, 0.25, "copper", 0.01).recommended,
  "mm2",
);
console.log("10amp 12v 7m:", minimumWireSizeFormula(10, 12, 7, "copper", 0.01).recommended, "mm2");

console.log("3amp 5V 1m:", minimumWireSizeFormula(3, 5, 1, "copper").recommended, "mm2");

console.log("50amp 12V 3.5m:", minimumWireSizeFormula(50, 12, 3.5, "copper", 0.01).recommended, "mm2");