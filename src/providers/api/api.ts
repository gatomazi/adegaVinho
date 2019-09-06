import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = "http://localhost:8081/api/";

  constructor(public http: HttpClient) {}

  async post(endpoint: string, body: any, reqOpts?: any) {
    const rawResponse = await fetch(this.url + endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
    return await rawResponse.json();
  }

  async get(endpoint: string) {
    const rawResponse = await fetch(this.url + endpoint, {
      method: "GET"
    });
    return await rawResponse.json();
  }

  async sendReq(endpoint: string, method: string, body?: any, reqOpts?: any) {
    const rawResponse = await fetch(this.url + endpoint, {
      method: method,
      body: body ? JSON.stringify(body) : ""
    });
    return await rawResponse.json();
  }
}
