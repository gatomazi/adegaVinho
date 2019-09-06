import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Item } from "../../models/item";
import { Api } from "../api/api";

@Injectable()
export class Items {
  items: Item[] = [];
  constructor(public api: Api, public storage: Storage) {
    this.getValueStorage("vinhos").then(items => {
      for (let item of items) {
        this.items.push(new Item(item));
      }
    });
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter(item => {
      for (let key in params) {
        let field = item[key];
        if (
          typeof field == "string" &&
          field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0
        ) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
    this.setAllStorage("vinhos", this.items);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.setAllStorage("vinhos", this.items);
  }

  setAllStorage(key: string, value: any) {
    return this.storage.set(key, value);
  }

  getValueStorage(key: string) {
    return this.storage.get(key).then(vinhos => {
      return vinhos;
    });
  }

  async exportItems() {
    console.log("hm");
    // let obj = { vinhos: this.items };
    // console.log(JSON.stringify(obj));
    // let teste = await this.api.post("vinhos", { vinhos: this.items });
    // console.log(teste);
    let teste = await this.api.get("vinhos");
    console.log(teste);
  }
}
