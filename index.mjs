import { minimumWireSizeFormula } from "./src/resources/minimumWireSizeFormula.mjs";
import { getMaxCurrentForArea } from "./src/resources/getMaxCurrentForArea.mjs";
import { calculateResistivity } from "./src/resources/calculateResistivity.mjs";
import { mmToAWG } from "./src/resources/cabelSizeConversion.mjs";

console.log(
    "10amp 230v 25m:",
    minimumWireSizeFormula(10, 25, 0.1).recommended,
    "mm²",
);

console.log(
    "10amp 12v 5m:",
    minimumWireSizeFormula(10, 5, 0.1).recommended,
    "mm²",
);
console.log(
    "65amp 12v 0.25m:",
    minimumWireSizeFormula(65, 0.25, "copper", 0.01).recommended,
    "mm²",
);
console.log(
    "10amp 12v 7m:",
    minimumWireSizeFormula(10, 7, "copper", 0.01).recommended,
    "mm²",
);

console.log(
    "3amp 5V 1m:",
    minimumWireSizeFormula(3, 1, 0.1).recommended,
    "mm²",
);

console.log(
    "50amp 12V 3.5m:",
    minimumWireSizeFormula(50, 3.5, 0.1).recommended,
    "mm²",
);

console.log(
    "Max antal ampere för 15mm2 kabel :",
    getMaxCurrentForArea(15),
    "A",
);

console.log("Resistivitet för guld", calculateResistivity("gold"), "Ω·m");

console.log("Laddkretsen");
let A = 50;
let drop = 0.1;
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 1.5, drop).recommended,
    "ska vara",
    35,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 2.5, drop).recommended,
    "ska vara",
    50,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 3.5, drop).recommended,
    "ska vara",
    70,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 4.5, drop).recommended,
    "ska vara",
    95,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 5.5, drop).recommended,
    "ska vara",
    120,
);

console.log("Bogpropeller eller ankarvinsch");
A = 250;
drop = 1;
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 2.5, drop, "intermittent").recommended,
    "ska vara",
    25,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 3.5, drop, "intermittent").recommended,
    "ska vara",
    35,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 4.5, drop, "intermittent").recommended,
    "ska vara",
    50,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 5.5, drop, "intermittent").recommended,
    "ska vara",
    70,
);
console.log("Lanternor i mast");
A = 2;
drop = 0.5;
//console.log(
//    A + "A med spänningsfall på " + drop + "V = ",
//    minimumWireSizeFormula(A, 18, drop).recommended,
//    "ska vara",
//    2.5,
//);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 20, drop).recommended,
    "ska vara",
    4,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 25, drop).recommended,
    "ska vara",
    4,
);
console.log("Matning till elcentral");
A = 50;
drop = 0.5; // V
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 2.5, drop).recommended,
    "ska vara",
    10,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 3.5, drop).recommended,
    "ska vara",
    16,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 4.5, drop).recommended,
    "ska vara",
    25,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 5.5, drop).recommended,
    "ska vara",
    25,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 6.5, drop).recommended,
    "ska vara",
    25,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 7.5, drop).recommended,
    "ska vara",
    35,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 8.5, drop).recommended,
    "ska vara",
    35,
);
console.log("Solpanel eller laddare");
A = 4;
drop = 0.1; // V
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 2.5, drop).recommended,
    "ska vara",
    4,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 3.5, drop).recommended,
    "ska vara",
    6,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 4.5, drop).recommended,
    "ska vara",
    10,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 5.5, drop).recommended,
    "ska vara",
    10,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 6.5, drop).recommended,
    "ska vara",
    10,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 7.5, drop).recommended,
    "ska vara",
    16,
);
console.log(
    A + "A med spänningsfall på " + drop + "V = ",
    minimumWireSizeFormula(A, 8.5, drop).recommended,
    "ska vara",
    16,
);
// prettier-ignore
console.log("Konverterad storlek", mmToAWG(0.05), "ska vara 30");
console.log("Konverterad storlek", mmToAWG(0.08), "ska vara 28");
console.log("Konverterad storlek", mmToAWG(0.14), "ska vara 26");
console.log("Konverterad storlek", mmToAWG(0.25), "ska vara 24");
console.log("Konverterad storlek", mmToAWG(0.34), "ska vara 22");
console.log("Konverterad storlek", mmToAWG(0.38), "ska vara 21");
console.log("Konverterad storlek", mmToAWG(0.5), "ska vara 20");
console.log("Konverterad storlek", mmToAWG(0.75), "ska vara 19");
console.log("Konverterad storlek", mmToAWG(1), "ska vara 18");
console.log("Konverterad storlek", mmToAWG(1.5), "ska vara 16");
console.log("Konverterad storlek", mmToAWG(2.5), "ska vara 14");
console.log("Konverterad storlek", mmToAWG(4), "ska vara 12");
console.log("Konverterad storlek", mmToAWG(6), "ska vara 10");
console.log("Konverterad storlek", mmToAWG(10), "ska vara 8");
console.log("Konverterad storlek", mmToAWG(16), "ska vara 6");
console.log("Konverterad storlek", mmToAWG(25), "ska vara 4");
console.log("Konverterad storlek", mmToAWG(35), "ska vara 1 eller 2");
console.log("Konverterad storlek", mmToAWG(50), "ska vara 1/0");
console.log("Konverterad storlek", mmToAWG(70), "ska vara 3/0 eller 2/0");
console.log("Konverterad storlek", mmToAWG(95), "ska vara 4/0");
console.log("Konverterad storlek", mmToAWG(120), "ska vara 4/0");
