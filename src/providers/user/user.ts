import "rxjs/add/operator/toPromise";

import { Injectable } from "@angular/core";

import { Api } from "../api/api";

@Injectable()
export class User {
  constructor(public api: Api) {}

  async login(accountInfo: any) {
    let seq = await this.api.sendReq('login', "POST", accountInfo);
    return seq;
  }

  async signup(accountInfo: any) {
    let seq = await this.api.sendReq('signup', "POST", accountInfo);
    return seq;
  }
}
