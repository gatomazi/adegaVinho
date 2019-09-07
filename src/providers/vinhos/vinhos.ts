import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Vinho } from "../../models/vinho";
import { Api } from "../api/api";

import { Settings } from "../settings/settings";

@Injectable()
export class Vinhos {
  vinhos: Vinho[] = [];
  usuario:any;

  constructor(
    public api: Api, 
    public storage: Storage,
    public settings: Settings
    ) {
      
    this.getVinhos();
  }

  query(params?: any) {
    if (!params) {
      return this.vinhos;
    }

    return this.vinhos.filter(item => {
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
    this.vinhos.push(item);
    console.log("add items", this.vinhos);
    this.setAllStorage("vinhos", this.vinhos);
    this.exportVinhos();
  }

  async edit(item: Vinho) {
    console.log(item);
    let res = await this.api.sendReq("vinhos/" + item.id, "PUT", item);
    console.log("vinhos edit res", res);
  }

  async delete(item: Vinho) {
    //Dando pau pra achar o item
    this.vinhos.splice(this.vinhos.indexOf(item), 1);
    this.setAllStorage("vinhos", this.vinhos);

    if (item.id) {
      await this.api.sendReq("vinhos/" + item.id, "DELETE");
    }
  }

  async getVinhos(arrVinhos?){
    let res: any;
    if(!arrVinhos){
      let usuario = await this.getUser();
      console.log(usuario)
      res =  await this.api.sendReq("vinhos/"+usuario.id_usuario, "GET");
    }else{
      this.vinhos = [];
      res = arrVinhos;
    }
    if(res.vinhos){
      for (let vinho of res.vinhos) {
        this.vinhos.push(new Vinho(vinho));
      }
      this.setAllStorage("vinhos", this.vinhos);
    }
    
  }

  async getUser(){
    return await this.settings.getValue("usuario");
  }

  setAllStorage(key: string, value: any) {
    return this.storage.set(key, value);
  }

  getValueStorage(key: string) {
    return this.storage.get(key).then(vinhos => {
      return vinhos;
    });
  }

  async exportVinhos() {
    // await this.api.post("vinhos", this.vinhos);
    console.log("Export items", this.vinhos);
    let res = await this.api.sendReq("vinhos", "POST", this.vinhos);
    this.getVinhos(res)
  }
}
