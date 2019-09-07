import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Settings } from "../settings/settings";
@Injectable()
export class Api {
  url: string = "http://localhost:8081/api/";

  constructor(public http: HttpClient,
    public settings: Settings) {}
  async sendReq(endpoint: string, method: string, body?: any, reqOpts?: any) {

    let objSent: any = {
      method: method
    }

    if(body){
      objSent.body = JSON.stringify(body);
    }

    let usuario:any = await this.getUser();
    if(usuario.token){
      objSent.headers = {
        Authorization: "Bearer " + usuario.token
      }
    }
    const rawResponse = await fetch(this.url + endpoint, objSent);
    return await rawResponse.json();
  }

  async getUser(){
    return await this.settings.getValue("usuario");
  }
}
