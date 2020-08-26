class Escuderia {
	constructor(nom, pressupost, pais, bolids) {
		this.nom = nom;
		this.pressupost = pressupost;
		this.pais = pais;
		this.bolids = bolids;
		this.treballadors = [];
	}

	// getters
	get getNom() {
		return this.nom;
	}

	// methods
	toString() {
		return `
    <h3>${this.nom}</h3>
    <ul>     
      <li>Pressupost: ${this.pressupost}€</li>
      <li>País: ${this.pais}</li>
      <li>Flota: ${this.bolids.length} bòlids</li>
      <li>Staff: ${this.treballadors.length} treballadors</li>
    </ul>
    `;
	}
}

class Bolid {
	constructor(nom, potencia, maxSpeed, color, preu, escuderia) {
		this.nom = nom;
		this.potencia = potencia;
		this.maxSpeed = maxSpeed;
		this.color = color;
		this.preu = preu;
		this.escuderia = escuderia;
	}

	// getters
	get getNom() {
		return this.nom;
	}

	// methods
	toString() {
		return `
    <h3>${this.nom}</h3>
    <ul>    
      <li>Potència: ${this.potencia}CV</li>
      <li>Velocitat màxima: ${this.maxSpeed}Km/h</li>
      <li>Color: ${this.color}</li>
      <li>Preu: ${this.preu}€</li>
      <li>Escuderia: <em>${this.escuderia}</em></li>  
    </ul>
    `;
	}
}

class Treballador {
	constructor(nom, cognom, edat, antiguitat, escuderia) {
		this.nom = nom;
		this.cognom = cognom;
		this.edat = edat;
		this.antiguitat = antiguitat;
		this.escuderia = escuderia;
		this.souBase = 50000;
	}

	// abstract sou(){}
}

class Pilot extends Treballador {
	constructor(nom, cognom, edat, antiguitat, escuderia, alzada, pes) {
		super(nom, cognom, edat, antiguitat, escuderia);
		this.alzada = alzada;
		this.pes = pes;
	}

	// getters
	// get getSouBase() {
	// 	return this.souBase;
	// }

	// polimorfisme
	sou() {
		const plusAntiguitat = 10000 * this.antiguitat;
		const perillositat = 50000;
		return this.souBase + plusAntiguitat + perillositat;
	}

	// methods
	fullName() {
		return this.nom + " " + this.cognom;
	}

	toString() {
		return `
  <h3>${this.nom} ${this.cognom}</h3>
  <ul>    
    <li>Edat: ${this.edat} anys</li>
    <li>Antiguitat: ${this.antiguitat} anys</li>
    <li>Alçada: ${this.alzada}cm</li>
    <li>Pes: ${this.pes}Kg</li>
    <li>Sou: ${this.sou()}€</li>
    <li>Escuderia: <em>${this.escuderia}</em></li>    
  </ul>
  `;
	}
}

class Mecanic extends Treballador {
	constructor(nom, cognom, edat, antiguitat, escuderia, estudis) {
		super(nom, cognom, edat, antiguitat, escuderia);
		this.estudis = estudis; // boolean
	}

	// getters
	// get getSouBase() {
	// 	return this.souBase;
	// }

	// polimorfisme
	sou() {
		const plusAntiguitat = 10000 * this.antiguitat;
		return this.souBase + plusAntiguitat;
	}

	// methods
	fullName() {
		return this.nom + " " + this.cognom;
	}

	teEstudis() {
		return this.estudis ? "Sí" : "No";
	}

	toString() {
		return `
  <h3>${this.nom} ${this.cognom}</h3>
  <ul>    
    <li>Edat: ${this.edat} anys</li>
    <li>Antiguitat: ${this.antiguitat} nys</li>
    <li>Estudis Superiors Mecànica: ${this.teEstudis()}</li>
    <li>Sou: ${this.sou()}€</li>
    <li>Escuderia: <em>${this.escuderia}</em></li>    
  </ul>
  `;
	}
}
