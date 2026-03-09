import { expect, test } from "vitest";
import { minimumWireSizeFormula } from "./minimumWireSizeFormula.mjs";

test("Laddkretsen", () => {
    const A = 50;
    const drop = 0.1;
    expect(minimumWireSizeFormula(A, 1.5, drop).recommended).toBe(25);
    expect(minimumWireSizeFormula(A, 2.5, drop).recommended).toBe(50);
    expect(minimumWireSizeFormula(A, 3.5, drop).recommended).toBe(70);
    expect(minimumWireSizeFormula(A, 4.5, drop).recommended).toBe(95);
    expect(minimumWireSizeFormula(A, 5.5, drop).recommended).toBe(120);
});

test("Ankarvinsch", () => {
    const A = 250;
    const drop = 1;
    expect(minimumWireSizeFormula(A, 2.5, drop).recommended).toBe(25);
    expect(minimumWireSizeFormula(A, 3.5, drop).recommended).toBe(70);
    expect(minimumWireSizeFormula(A, 4.5, drop).recommended).toBe(95);
    expect(minimumWireSizeFormula(A, 5.5, drop).recommended).toBe(120);
});

test("Lanternor i mast", () => {
    const A = 2;
    const drop = 0.5;
    expect(minimumWireSizeFormula(A, 18, drop).recommended).toBe(2.5);
    expect(minimumWireSizeFormula(A, 20, drop).recommended).toBe(4);
    expect(minimumWireSizeFormula(A, 25, drop).recommended).toBe(4);
});

test("Matning till elcentral", () => {
    const A = 50;
    const drop = 1; // V
    expect(minimumWireSizeFormula(A, 2.5, drop).recommended).toBe(10);
    expect(minimumWireSizeFormula(A, 3.5, drop).recommended).toBe(16);
    expect(minimumWireSizeFormula(A, 4.5, drop).recommended).toBe(25);
    expect(minimumWireSizeFormula(A, 5.5, drop).recommended).toBe(25);
    expect(minimumWireSizeFormula(A, 6.5, drop).recommended).toBe(25);
    expect(minimumWireSizeFormula(A, 7.5, drop).recommended).toBe(35);
    expect(minimumWireSizeFormula(A, 8.5, drop).recommended).toBe(35);
});

test("Solpanel eller laddare", () => {
    const A = 4;
    const drop = 0.1; // V
    expect(minimumWireSizeFormula(A, 2.5, drop).recommended).toBe(4);
    expect(minimumWireSizeFormula(A, 3.5, drop).recommended).toBe(6);
    expect(minimumWireSizeFormula(A, 4.5, drop).recommended).toBe(10);
    expect(minimumWireSizeFormula(A, 5.5, drop).recommended).toBe(10);
    expect(minimumWireSizeFormula(A, 6.5, drop).recommended).toBe(10);
    expect(minimumWireSizeFormula(A, 7.5, drop).recommended).toBe(10);
    expect(minimumWireSizeFormula(A, 8.5, drop).recommended).toBe(16);
});

// Exempel från https://sutars.com/support/kabeldimensionering/lathund-for-kabeldimensionering/

/*
Laddkretsen
Generator 50 A till batteribanken. Mellan batterierna kan en klenare kabel användas. 
Beräknat på max 0,1V drop

Avstånd (m) Total Kabellängd (m)	Kabelarea (mm²)
1.5	        3	                    35
2.5	        5	                    50
3.5	        7                   	70
4.5	        9                   	95
5.5	        11                  	120


Bogpropeller eller ankarvinsch
Mellan propeller / vinsch och batteri. Denna gäller även för större startmotorer. 3,5hk = 2500 w ≈ 250 .
Beräknat på max 1V drop

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
2.5	        5                   	25
3.5	        7                   	35
4.5	        9                      	50
5.5	        11                  	70
6.5	        13                  	95
7.5	        15                  	120


Lanternor i mast
25 W = 2 A
Beräknat på max 0,5V drop

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
18	        36	                    2,5
20	        40	                    4
25	        50	                    4


Matning till elcentral
Mellan batteri och elcentral.
500 W = 50 A
Beräknat på max 1V drop

Avstånd (m)	Total Kabellängd (m)	Kabelarea (mm²)
2.5	        5                   	10
3.5	        7                   	16
4.5	        9                   	25
5.5	        11                  	25
6.5	        13                  	25
7.5	        15                  	35
8.5	        17                  	35

*/
