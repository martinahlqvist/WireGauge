/**
 * Resistivitet för 100% IACS vid 20°C i Ω·m
 */
export const baseResistivity = 1.7241e-8;

/**
 * Standardstorlekar på kablar
 */
export const standardWireSizes = [
    0.05, 0.08, 0.14, 0.25, 0.34, 0.38, 0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16,
    25, 35, 50, 70, 95, 120, 150, 185, 240,
];

//https://en.wikipedia.org/wiki/American_wire_gauge
/**
 * Tabell för konvertering av kabelarea mm2 till AWG
 */
export const AWG_TABLE = {
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
