// 	<select #selection> - reactive
let optgroup1 = document.querySelector('optgroup[label="Escuderies"]');
let optgroup2 = document.querySelector('optgroup[label="Bòlids"]');
let optgroup3 = document.querySelector('optgroup[label="Pilots"]');
let optgroup4 = document.querySelector('optgroup[label="Mecànics"]');

// 1. Escuderies - harcoded lib/data.js
let i = 1;
for (escuderia of escuderies) {
	optgroup1.innerHTML += `<option id="escuderia${i}" value="${escuderia.getNom}">${escuderia.getNom}</option>`;
	i++;
}

// 2. Bòlids - harcoded lib/data.js
for (escuderia of escuderies) {
	let j = 1;
	for (idx in escuderia.bolids) {
		let bolidNom = escuderia.bolids[idx].getNom;
		optgroup2.innerHTML += `<option id="bolid${j}" value="${bolidNom}">${bolidNom}</option>`;
		j++;
	}
}

// 3. Treballadors - reactive update <optgroup>
function updateConsultaTreballadors() {
	// clear on refresh
	optgroup3.innerHTML = "";
	optgroup4.innerHTML = "";

	// inject <option>
	for (escuderia of escuderies) {
		let k = 1;
		for (idx in escuderia.treballadors) {
			let treballadorNom = "";
			let text = escuderia.treballadors[idx].fullName();

			// get rid of " "
			let wildcard = escuderia.treballadors[idx].fullName().toLowerCase();

			wildcard = wildcard.split(" ");

			for (word of wildcard) {
				treballadorNom += word;
			}

			// class check
			if (escuderia.treballadors[idx] instanceof Pilot) {
				optgroup3.innerHTML += `<option id="pilot${k}" value="${treballadorNom}">${text}</option>`;
			} else if (escuderia.treballadors[idx] instanceof Mecanic) {
				optgroup4.innerHTML += `<option id="mecanic${k}" value="${treballadorNom}">${text}</option>`;
			} else void 0; // do nothing
			// else if ... instanceof Sanitaries, etc.

			k++;
		}
	}
}

updateConsultaTreballadors(); // first update 
