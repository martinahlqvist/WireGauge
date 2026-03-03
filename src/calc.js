/*

A = cross-sectional area in square meters
p = conductor resistivity in ohm-meters (Ω·m)
L = length in meters
I = current in amps
V = allowable voltage drop in volts

*/

/**
 * Räknar ut 
 * @param {*} material 
 * @returns resistivity in 
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


/**
 * 
 * @param {*} amps 
 * @param {*} volt 
 * @param {*} length i meter
 * @param {*} material 
 * @returns 
 */
function minimumWireSizeFormula(amps, volt, length, material, allowableDropPercent = 0.03) {
  // Hämta resistiviteten för materialet (vid 20°C)
  const rho = calculateResistivity(material);
  const maxVoltageDrop = volt * allowableDropPercent;
  const areaVoltageDrop = (2 * length * amps * rho) / maxVoltageDrop * 1e6;

  // Tumregel för att undvika överhettning
  const areaHeatSafety = amps / 5;
  
  // Kolla vilket värde som är störst
  const requiredArea = Math.max(areaVoltageDrop, areaHeatSafety);

  // Hitta match bland standardstorlekar
  const standardSizes = [0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];
  const recommended = standardSizes.find(s => s >= requiredArea) || "Specialdimension krävs";

  return {
    theoretical: requiredArea.toFixed(2),
    recommended: recommended
  };

}



console.log("Kopparresistivitet:", calculateResistivity("copper"), "Ω·m");
console.log("Aluminiumresistivitet:", calculateResistivity("aluminium"), "Ω·m");
console.log("Guldresistivitet:", calculateResistivity("gold"), "Ω·m");


console.log(minimumWireSizeFormula(10, 230, 25, "copper"), "mm2");

console.log(minimumWireSizeFormula(10, 12, 25, "copper").recommended, "mm2");
console.log(minimumWireSizeFormula(65, 12, 0.5, "copper", 0.01).recommended, "mm2");
console.log(minimumWireSizeFormula(10, 12, 7).recommended, "mm2");
