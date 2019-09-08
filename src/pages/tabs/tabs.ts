import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController } from "ionic-angular";

import { Tab1Root, Tab2Root, Tab3Root, MainPage } from "../";
import { App } from 'ionic-angular';

import { Settings } from "../../providers";

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    private app: App,
    private settings: Settings   
  ) {
    
    translateService
      .get(["TAB1_TITLE", "TAB2_TITLE", "TAB3_TITLE"])
      .subscribe(values => {
        this.tab1Title = values["TAB1_TITLE"];
        this.tab2Title = values["TAB2_TITLE"];
        this.tab3Title = values["TAB3_TITLE"];
      });
  }
  logout(){
    this.settings.removeValue("usuario");
    this.app.getRootNavs()[0].setRoot(MainPage);
  }
}
