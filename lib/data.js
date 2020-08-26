// BÒLIDS
const spider = new Bolid("488 Spider", 720, 340, "blanc", 256000, "Ferrari");
const gtb = new Bolid("488 GTB", 670, 330, "blau nacarat", 238000, "Ferrari");
const amgR = new Bolid("AMG GT R", 585, 318, "verd metalitzat", 198000, "AMG");
const amgS = new Bolid("AMG GT S", 510, 330, "groc", 187000, "AMG");
const viper = new Bolid("Viper GTS", 649, 332, "vermell", 141000, "Dodge");

// ESCUDERIES
const ferrari = new Escuderia("Ferrari", 3421000000, "Itàlia", [spider, gtb]);
const mercedes = new Escuderia("AMG", 6837000000, "Alemanya", [amgR, amgS]);
const dodge = new Escuderia("Dodge", 1814000000, "USA", [viper]);

const escuderies = [ferrari, mercedes, dodge];

// preloaded data
let pilot1 = new Pilot("Miguel", "Molina", 40, 20, "Ferrari", 170, 70);
let mecanic1 = new Mecanic("Jesús", "Álvarez", 50, 29, "Ferrari", true);
let pilot2 = new Pilot("Raffaele", "Marciello", 38, 12, "AMG", 165, 60);
let mecanic2 = new Mecanic("Sivadas", "Inthrathas", 45, 15, "AMG", false);
let pilot3 = new Pilot("Jonathan", "Bomarito", 28, 7, "Dodge", 160, 66);
let mecanic3 = new Mecanic("Quintin", "Imann", 24, 5, "Dodge", false);

escuderies[0].treballadors.push(pilot1, mecanic1); // Ferrari
escuderies[1].treballadors.push(pilot2, mecanic2); // AMG
escuderies[2].treballadors.push(pilot3, mecanic3); // Dodge
