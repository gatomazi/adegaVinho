import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = "https://example.com/api/v1";

  constructor(public http: HttpClient) {}

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + "/" + endpoint, body, reqOpts);
  }
}
