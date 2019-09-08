import { Component } from "@angular/core";
import { IonicPage, ModalController, NavController, LoadingController } from "ionic-angular";

import { Vinho } from "../../models/vinho";
import { Vinhos } from "../../providers";

@IonicPage()
@Component({
  selector: "page-vinhos",
  templateUrl: "vinhos.html"
})
export class VinhosPage {
  currentVinhos: Vinho[];

  constructor(
    public navCtrl: NavController,
    public vinhos: Vinhos,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter(){
    console.log("hmm");
    this.currentVinhos = [];
    this.getItens();
  }

  getVinhos(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.getItens();
      return;
    }
    this.currentVinhos = this.vinhos.query({
      nome: val
    });
  }

  addVinho() {
    let addModal = this.modalCtrl.create("VinhoCriacaoPage");
    addModal.onDidDismiss(async res => {
      if (res) {
        if (res.vinho) {
          await this.vinhos.add(new Vinho(res.vinho));
          this.getItens();
        }
      }
    });
    addModal.present();
  }

  editVinho(vinho) {
    let editModal = this.modalCtrl.create("VinhoCriacaoPage", { vinho: vinho });
    console.log("Edit Vinho");
    editModal.onDidDismiss(async res => {
      if (res) {
        if (res.vinho) {
          console.log("Edit vinho", res.vinho);
          await this.vinhos.edit(new Vinho(res.vinho));
          this.getItens();
        }
      }
    });

    editModal.present();
  }

  async getItens(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando vinhos'
    });
  
    loading.present();
  
    
    
    this.currentVinhos = await this.vinhos.returnVinhos();
    loading.dismiss();
    
  }

  deleteVinho(vinho: Vinho) {
    this.vinhos.delete(vinho);
  }

  openVinho(vinho: Vinho) {
    this.navCtrl.push("VinhoDetalhePage", {
      vinho: vinho
    });
  }
}
