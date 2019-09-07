import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { Vinhos } from "../../providers";

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  page: string = "main";
  pageTitleKey: string = "SETTINGS_TITLE";
  pageTitle: string;

  exportItems: any;

  constructor(
    public navCtrl: NavController,
    public vinhos: Vinhos,
    public navParams: NavParams,
    public translate: TranslateService,
    public toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.pageTitleKey = this.navParams.get("pageTitleKey") || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe(res => {
      this.pageTitle = res;
    });
  }

  async exportarAdega() {
    await this.vinhos.exportVinhos();
    let toast = this.toastCtrl.create({
      message: "Adega exportada com sucesso",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
}
