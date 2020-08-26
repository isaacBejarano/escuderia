// first load <select #selection>
updateConsultaTreballadors();

// LISTENERS
btn1.addEventListener("click", alta);
btn2.addEventListener("click", baixa);
selection.addEventListener("change", consultar);

// CONSULTA
function consultar() {
	// 1. Escuderia
	let found = escuderies.find(
		escuderia => escuderia.getNom === selection.value // save
	);

	// 2. Bolid
	if (!found) {
		for (escuderia of escuderies) {
			for (bolid of escuderia.bolids) {
				if (bolid.getNom === selection.value) found = bolid; // save
			}
		}
	}

	// 3. Treballador - reactive
	if (!found) {
		for (escuderia of escuderies) {
			for (treballador of escuderia.treballadors) {
				// get rid of empty space " "
				let wildcard = treballador.fullName().toLowerCase();
				let treballadorNom = "";

				wildcard = wildcard.split(" ");

				for (word of wildcard) {
					treballadorNom += word;
				}

				// find'm
				if (treballadorNom === selection.value) found = treballador; // save
			}
		}
	}

	// toString
	outlet.innerHTML = found.toString();
	outlet.classList.add("outlet"); // CSS
}

// ALTA
function alta() {
	let tipus = prompt(`Escriu la classe de treballador que vols donar d'alta. \
  \nPosa la inicial en majúscula i no posis cap accent.\
  \nExemple: Mecanic

  1. Pilot
  2. Mecanic
  3. Sanitari
  `);

	if (tipus) {
		let flag = 0;

		// 1. check classe
		for (escuderia of escuderies) {
			for (treballador of escuderia.treballadors) {
				flag += treballador.constructor.name === tipus ? 1 : 0;
			}
		}

		// 2. operar
		if (flag > 0 && tipus === "Pilot") altaPilot();
		else if (flag > 0 && tipus === "Mecanic") altaMecanic();
		else alert(`La classe "${tipus}" no existeix`);
		// "Sanitaris", etc. -> else if () { ... operaSanitari() }
	}
}

function altaPilot() {
	let treballadorProps = treballadorAltaPrompt();
	let alzada = +prompt("Introdueix la seva Alçada");
	let pes = +prompt("Introdueix el seu Pes");
	let escuderiaNom = prompt(
		"Introdueix el nom de l'Escuderia a la qual pertany.\
  \nEscriu el nom de l'Escuderia tal com apareix al selector 'Consulta'"
	);

	// 1. set up obj
	let treballadorX = new Pilot(
		...treballadorProps,
		alzada.toFixed(2),
		pes.toFixed(2)
	);

	// 2. troba Escuderia adient + guarda
	trobaEscuderiaPerGuardar(treballadorX, escuderiaNom);
}

function altaMecanic() {
	let treballadorProps = treballadorAltaPrompt();
	let estudis = +confirm("Té estudis superiors en Mecànica?");
	let escuderiaNom = prompt(`Introdueix el nom de l'Escuderia a la qual pertany.\
  \nEscriu el nom de l'Escuderia tal com apareix al selector "Consulta"`);

	// 1. set up obj
	let treballadorX = new Mecanic(...treballadorProps, estudis);

	// 2. troba Escuderia adient + guarda
	trobaEscuderiaPerGuardar(treballadorX, escuderiaNom);
}

// function altaSanitari(){ ... } etc.

function treballadorAltaPrompt() {
	let nom = prompt("Introdueix el seu Nom");
	let cognom = prompt("Introdueix el seu Cognom");
	let edat = +prompt("Introdueix la seva Edat");
	let antiguitat = +prompt("Introdueix la seva Antiguitat");

	return [nom, cognom, edat.toFixed(1), antiguitat.toFixed(0)];
}

function trobaEscuderiaPerGuardar(treballadorX, escuderiaNom) {
	let i = 0;
	let flag = true;
	do {
		if (escuderies[i].getNom === escuderiaNom) flag = false;
		else i++;
	} while (i < escuderies.length && flag);

	escuderies[i].treballadors.push(treballadorX); // 3. update data
	alert(`${treballadorX.fullName()} donat d'alta correctament.`);
	updateConsultaTreballadors(); // 4. update <select #selection> <-- select.js
}

// BAIXA
function baixa() {
	let segur = confirm("Segur que vols esborrar del sistem un treballador?");

	if (segur) {
		let nom = prompt("Introdueix el seu Nom");
		let cognom = prompt("Introdueix el seu Cognom");
		let escuderiaNom = prompt(`Introdueix el nom de l'Escuderia a la qual pertany.\
  \nEscriu el nom de l'Escuderia tal com apareix al selector "Consulta"`);

		// 1. set up nom a buscar
		let treballadorNom = nom + " " + cognom;

		// 2. troba Escuderia adient + guarda
		trobaEscuderiaPerBorrar(treballadorNom, escuderiaNom);
	}
}

function trobaEscuderiaPerBorrar(treballadorNom, escuderiaNom) {
	// 1. troba escuderia
	let i = 0;
	let flag = true;
	do {
		if (escuderies[i].getNom === escuderiaNom) flag = false;
		else i++;
	} while (i < escuderies.length && flag);

	// 2. troba treballador
	flag = true; // reset
	let j = 0;
	do {
		if (escuderies[i].treballadors[j].fullName() === treballadorNom)
			flag = false;
		else j++;
	} while (
		j < escuderies[i].treballadors.length &&
		escuderies[i].treballadors.length > 0 &&
		flag
	);

	// 3. treballadors [] conté treballador?
	if (!escuderies[i].treballadors[j]) {
		alert(
			`${escuderies[i].getNom} no té cap treballador de nom "${treballadorNom}".

      Nom d'Escuderia, o de Treballador incorrectes,
      o bé el treballador que vols donar de baixa
      no pertany a aquesta escuderia,`
		);
	} else {
		escuderies[i].treballadors.splice(j, 1);
		alert(`${treballadorNom} donat de baixa correctament.`);
	}

	updateConsultaTreballadors(); // 4. update <select #selection> <-- select.js
}
