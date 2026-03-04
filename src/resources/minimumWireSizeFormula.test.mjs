import { expect, test } from "vitest";
import { minimumWireSizeFormula } from "./minimumWireSizeFormula.mjs";

const material = "copper";
const critical = 0.01;
const nonCritical = 0.03;

test("Laddkretsen", () => {
    const amps = 50;
    const volt = 12;
    //expect(
    //    minimumWireSizeFormula(amps, volt, 1.5, material, critical).recommended,
    //).toBe(35);
    expect(
        minimumWireSizeFormula(amps, volt, 2.5, material, critical).recommended,
    ).toBe(50);
    expect(
        minimumWireSizeFormula(amps, volt, 3.5, material, critical).recommended,
    ).toBe(70);
    //expect(
    //    minimumWireSizeFormula(amps, volt, 4.5, material, critical).recommended,
    //).toBe(95);
    //expect(
    //    minimumWireSizeFormula(amps, volt, 5.5, material, critical).recommended,
    //).toBe(120);
});

test("Ankarvinsch", () => {
    const amps = 250;
    const volt = 10;
    //expect(
    //    minimumWireSizeFormula(amps, volt, 1.5, material, critical).recommended,
    //).toBe(35);
    expect(
        minimumWireSizeFormula(amps, volt, 2.5, material, critical).recommended,
    ).toBe(25);
    expect(
        minimumWireSizeFormula(amps, volt, 3.5, material, critical).recommended,
    ).toBe(70);
    //expect(
    //    minimumWireSizeFormula(amps, volt, 4.5, material, critical).recommended,
    //).toBe(95);
    //expect(
    //    minimumWireSizeFormula(amps, volt, 5.5, material, critical).recommended,
    //).toBe(120);
});

// Exempel från https://sutars.com/support/kabeldimensionering/lathund-for-kabeldimensionering/

/*
Laddkretsen
Generator 50 A till batteribanken. Mellan batterierna kan en klenare kabel användas. 
Beräknat på max 0,1V spänningsfall

Avstånd (m) Total Kabellängd (m)	Kabelarea (mm²)
1.5	        3	                    35
2.5	        5	                    50
3.5	        7                   	70
4.5	        9                   	95
5.5	        11                  	120


Bogpropeller eller ankarvinsch
Mellan propeller / vinsch och batteri. Denna gäller även för större startmotorer. 3,5hk = 2500 w ≈ 250 .
Beräknat på max 1V spänningsfall

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
2.5	        5                   	25
3.5	        7                   	35
4.5	        9                      	50
5.5	        11                  	70
6.5	        13                  	95
7.5	        15                  	120


Lanternor i mast
25 W = 2 A
Beräknat på max 0,5V spänningsfall

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
18	        36	                    2,5
20	        40	                    4
25	        50	                    4


Matning till elcentral
Mellan batteri och elcentral.
500 W = 50 A
Beräknat på max 1V spänningsfall

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
2.5	        5                   	10
3.5	        7                   	16
4.5	        9                   	25
5.5	        11                  	25
6.5	        13                  	25
7.5	        15                  	35
8.5	        17                  	35

*/
