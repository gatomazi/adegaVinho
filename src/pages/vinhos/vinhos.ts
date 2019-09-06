import { Component } from "@angular/core";
import { IonicPage, ModalController, NavController } from "ionic-angular";

import { Vinho } from "../../models/item";
import { Items } from "../../providers";
import { Settings } from "../../providers";

@IonicPage()
@Component({
  selector: "page-vinhos",
  templateUrl: "vinhos.html"
})
export class VinhosPage {
  currentItems: Vinho[];

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public settings: Settings,
    public modalCtrl: ModalController
  ) {
    // this.currentItems = this.items.query();

    // this.settings.setAllStorage("vinhos", this.currentItems);

    this.currentItems = this.items.query();
  }

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = this.items.query();
      return;
    }
    this.currentItems = this.items.query({
      nome: val
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create("VinhoCriacaoPage");
    addModal.onDidDismiss(res => {
      if (res) {
        if (res.item) {
          this.items.add(res.item);
        }
      }
    });
    addModal.present();
  }

  editItem(item) {
    item.edicao = true;

    let editModal = this.modalCtrl.create("VinhoCriacaoPage", { item: item });
    editModal.onDidDismiss(res => {
      if (res) {
        if (res.item) {
          if (res.edicao) {
            this.items.delete(res.item);
          }
          this.items.add(res.item);
        }
      }
    });

    editModal.present();
  }

  deleteItem(item: Vinho) {
    this.items.delete(item);
  }

  openItem(item: Vinho) {
    this.navCtrl.push("VinhoDetalhePage", {
      item: item
    });
  }
}
