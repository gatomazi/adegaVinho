// import { Injectable } from "@angular/core";

// import { Vinho } from "../../models/item";

// @Injectable()
// export class Items {
//   items: Vinho[] = [];

//   defaultItem: any = {
//     name: "Burt Bear",
//     profilePic: "assets/img/speakers/bear.jpg",
//     about: "Burt is a Bear."
//   };

//   constructor() {
//     let items = [
//       {
//         id: 1,
//         nome: "Corte Balda Nero di Troia",
//         safra: 2018,
//         pais: "Itália",
//         regiao: "Puglia",
//         produtor: "Angelo Rocca e Figli Srl",
//         qtd: 5,
//         imagem: "assets/img/vinhos/corte-balda.png",
//         descricao:
//           "A vinícola Rocca ganhou o prêmio de Melhor vinícola de 2018 pela Golden League.",
//         teorAlc: 14.0,
//         tipoVinho: "Tinto",
//         uva: ["Nero di Troia"]
//       },
//       {
//         id: 2,
//         nome: "Casillero Del Diablo Red Blend",
//         safra: 2017,
//         pais: "Chile",
//         regiao: "Valle Central",
//         produtor: "Concha Y Toro",
//         qtd: 17,
//         imagem: "assets/img/vinhos/casillero.png",
//         descricao:
//           "Casillero Del Diablo é um vinho potente e de muita personalidade, que foi inspirado em pessoas que gostam de quebrar regras.",
//         teorAlc: 13.5,
//         tipoVinho: "Tinto",
//         uva: ["Cabernet Sauvignon", "Syrah"]
//       },
//       {
//         id: 3,
//         nome: "Les Calandières Rosé Méditerranée",
//         safra: 2017,
//         pais: "França",
//         regiao: "Provence",
//         produtor: "Castel",
//         qtd: 2,
//         imagem: "assets/img/vinhos/calandieres.png",
//         descricao:
//           "O território da Provence fica aos pés dos Alpes e é banhada pelo Mediterrâneo, e é de onde saem alguns dos melhores rosés do mundo.",
//         teorAlc: 12.0,
//         tipoVinho: "Rosé",
//         uva: ["Grenache", "Syrah", "Merlot", "Cabernet Sauvignon"]
//       }
//     ];

//     for (let item of items) {
//       this.items.push(new Item(item));
//     }
//   }

//   query(params?: any) {
//     if (!params) {
//       return this.items;
//     }

//     return this.items.filter(item => {
//       for (let key in params) {
//         let field = item[key];
//         if (
//           typeof field == "string" &&
//           field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0
//         ) {
//           return item;
//         } else if (field == params[key]) {
//           return item;
//         }
//       }
//       return null;
//     });
//   }

//   add(item: Vinho) {
//     this.items.push(item);
//   }

//   delete(item: Vinho) {
//     this.items.splice(this.items.indexOf(item), 1);
//   }
// }
