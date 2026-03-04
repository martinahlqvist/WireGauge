import { minimumWireSizeFormula } from "./src/resources/minimumWireSizeFormula.mjs";
import { getMaxCurrentForArea } from "./src/resources/getMaxCurrentForArea.mjs";
import { calculateResistivity } from "./src/resources/calculateResistivity.mjs";

console.log(
    "10amp 230v 25m:",
    minimumWireSizeFormula(10, 230, 25, "copper").recommended,
    "mm2",
);

console.log(
    "10amp 12v 5m:",
    minimumWireSizeFormula(10, 12, 5, "copper").recommended,
    "mm2",
);
console.log(
    "65amp 12v 0.25m:",
    minimumWireSizeFormula(65, 12, 0.25, "copper", 0.01).recommended,
    "mm2",
);
console.log(
    "10amp 12v 7m:",
    minimumWireSizeFormula(10, 12, 7, "copper", 0.01).recommended,
    "mm2",
);

console.log(
    "3amp 5V 1m:",
    minimumWireSizeFormula(3, 5, 1, "copper").recommended,
    "mm2",
);

console.log(
    "50amp 12V 3.5m:",
    minimumWireSizeFormula(50, 12, 3.5, "copper", 0.01).recommended,
    "mm2",
);

console.log(
    "Max antal ampere för 15mm2 kabel :",
    getMaxCurrentForArea(15),
    "A",
);

console.log("Resistivitet för guld", calculateResistivity("gold"), "Ω·m");
