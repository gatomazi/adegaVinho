import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Item } from "../../models/item";
import { Items } from "../../providers";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  currentItems: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public items: Items
  ) {
    this.fetchData();
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      nome: val
    });
  }

  async fetchData() {
    let url = "http://localhost:8100/api";
    let obj = {
      q: "",
      perPage: 10
    };
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });

    let response = await rawResponse;
    console.log(response);
  }

  openItem(item: Item) {
    this.navCtrl.push("VinhoDetalhePage", {
      item: item
    });
  }
}
