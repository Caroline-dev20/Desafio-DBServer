let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (predicate) {
    // Implemente aqui seu algoritmo
    var list = Object(this); 
    var length = list.length; 
    var thisArg = arguments[1]; 
    var value;

    for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)){
           return value;
        }
    }
    return null

}

Array.prototype.customSome = function (predicate) {
    // Implemente aqui seu algoritmo
    var list = Object(this); 
    var length = list.length; 
    var thisArg = arguments[1]; 
    
    for (var i = 0; i < length; i++) {
        // call (argumento, elemento, indice, lista)
        if (i in list && predicate.call(thisArg, list[i], i, list)) {
        return true;
    }
  }
    return false;
}

Array.prototype.customFilter = function (callback) {
    // Implemente aqui seu algoritmo
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArray.push(this[i]);
        }
    }
    return newArray;
}

Array.prototype.customMap = function (callback) {
    // Implemente aqui seu algoritmo
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
}

Array.prototype.customReduce = function (callback, initialValue) {
    // Implemente aqui seu algoritmo
    const initialIndex = initialValue ? 0 : 1;
    let accumulator = initialValue || this[0];
    for (let i = initialIndex; i < this.length; i++) {
        accumulator = callback (accumulator, this[i], i, this);
    }
    return accumulator;
}

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
// const paisAfricano =  <seu código aqui>;
// console.log(paisAfricano);

// função de teste .find para continente africano

const paisAfricano = function (continent) {
    return continent.continent === "AFRICA"
}

console.log("Único país africano: ");
console.log(olympicsMedalTable.customFilter(paisAfricano));
console.log(olympicsMedalTable.customSome(paisAfricano));

// 2 - Crie um algoritmo que retorne o total de medalhas por país
// const medalhasPorPais =  <seu código aqui>;
// console.log(medalhasPorPais);

const medalhasPorPais = function (country) {
    let totalMedalhas = country.gold + country.silver + country.bronze;
    return country.country + " - " + totalMedalhas;
}

console.log("Total de medalhas por país: ");
console.log(olympicsMedalTable.customMap(medalhasPorPais));

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
// const paisesCom10MedalhasOuroNoMinimo =  <seu código aqui>;
// console.log(paisesCom10MedalhasOuroNoMinimo);

const paisesCom10MedalhasOuroNoMinimo = function (medalhasOuro) {
    return medalhasOuro.gold >= 10;  
}

console.log("Países que conquistaram mais de dez medalhas de ouro: ");
console.log(olympicsMedalTable.customFilter(paisesCom10MedalhasOuroNoMinimo));

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
// const paisesCom30MedalhasNoMinimo =  <seu código aqui>;
// console.log(paisesCom30MedalhasNoMinimo);

const paisesCom30MedalhasNoMinimo = function (country) {
    let totalMedalhas = country.gold + country.silver + country.bronze;
    return totalMedalhas >= 30;   
}

console.log("Países que conquistaram no minímo trinta medalhas (Ouro, Prata e Bronze): ");
console.log(olympicsMedalTable.customFilter(paisesCom30MedalhasNoMinimo));

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
// const paisesComPeloMenos20MedalhasDeOUro =  <seu código aqui>;
// console.log(paisesComPeloMenos20MedalhasDeOUro);

const paisesComPeloMenos20MedalhasDeOUro = function (element) {
    return element >= 20;   
}

const verificaContinente = function (continent) {
    if (continent.continent === "AMERICA DO SUL") {
        return continent.country;
    }
}

const soma = function (accumulator, value) {
    return accumulator + value;
}

console.log("América do Sul conquistou pelo menos vinte medalhas de ouro? ");

console.log(paisesComPeloMenos20MedalhasDeOUro(olympicsMedalTable.customFilter(verificaContinente).customMap(medalhasOuro => medalhasOuro.gold).customReduce(soma, 0)));

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA") // JAPÃO e CHINA 
    .map(i => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
    .customMap(i => i.gold)
    .customReduce((total, quantity) => total + quantity);

console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);
