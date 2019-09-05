import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Settings } from "../../providers";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  // Our local settings object

  page: string = "main";
  pageTitleKey: string = "SETTINGS_TITLE";
  pageTitle: string;

  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    public translate: TranslateService
  ) {}

  ionViewWillEnter() {
    this.pageTitleKey = this.navParams.get("pageTitleKey") || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe(res => {
      this.pageTitle = res;
    });
  }

  ngOnChanges() {
    console.log("Ng All Changes");
  }
}
