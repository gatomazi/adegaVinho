import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Items } from "../../providers";

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
    public items: Items,
    public navParams: NavParams,
    public translate: TranslateService
  ) {}

  ionViewWillEnter() {
    this.pageTitleKey = this.navParams.get("pageTitleKey") || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe(res => {
      this.pageTitle = res;
    });
  }

  async exportarAdega() {
    await this.items.exportItems();
  }
}
