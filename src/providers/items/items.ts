import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Vinho } from "../../models/item";
import { Api } from "../api/api";

@Injectable()
export class Items {
  items: Vinho[] = [];
  constructor(public api: Api, public storage: Storage) {
    this.getValueStorage("vinhos").then(items => {
      for (let item of items) {
        this.items.push(new Vinho(item));
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

  async add(item: Vinho) {
    this.items.push(item);
    this.setAllStorage("vinhos", this.items);
    if (item.id) {
      await this.api.sendReq("vinhos/" + item.id, "DELETE");
    }
  }

  async delete(item: Vinho) {
    //Dando pau pra achar o item
    this.items.splice(this.items.indexOf(item), 1);
    this.setAllStorage("vinhos", this.items);

    if (item.id) {
      await this.api.sendReq("vinhos/" + item.id, "DELETE");
    }
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
    // await this.api.post("vinhos", this.items);
    await this.api.sendReq("vinhos", "POST", this.items);
  }
}
