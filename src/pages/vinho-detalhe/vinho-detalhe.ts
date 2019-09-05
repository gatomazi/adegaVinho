import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-vinho-detalhe",
  templateUrl: "vinho-detalhe.html"
})
export class VinhoDetalhePage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get("item");
    console.log(this.item.uva);
  }
}
