/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or an "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Vinho implements InterfaceVinho {
  id: number;
  id_usuario: number;
  nome: string;
  safra: number;
  pais: string;
  regiao: string;
  produtor: string;
  qtd: number;
  imagem: string;
  descricao: string;
  teorAlc;
  tipoVinho: string;
  uva: string;

  constructor(fields: any) {
    for (const f in fields) {
      // @ts-ignore
      switch (f) {
        case "safra":
        case "qtd":
        case "id_usuario":
        case "id":
          this[f] = parseInt(fields[f]);
          break;
        case "teorAlc":
          this[f] = parseFloat(fields[f]);
          break;
        default:
          this[f] = fields[f];
          break;
      }
    }
  }
}

export interface InterfaceVinho {
  // [prop: string]: any;
  id: number;
  id_usuario: number;
  nome: string;
  safra: number;
  pais: string;
  regiao: string;
  produtor: string;
  qtd: number;
  imagem: string;
  descricao: string;
  teorAlc;
  tipoVinho: string;
  uva: string;
}
