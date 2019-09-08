import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Config, Nav, Platform } from "ionic-angular";

import { FirstRunPage, LoggedPage } from "../pages";
import { Settings } from "../providers";

@Component({
  template: `
    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  
  rootPage: any;
  usuario:any;

  @ViewChild(Nav) nav: Nav;


  constructor(
    private translate: TranslateService,
    platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private settings: Settings
  ) {
    platform.ready().then(() => {
      this.getUser();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
    this.initTranslate();
  }

 

  async getUser(){
    this.usuario = await this.settings.getValue("usuario");
    console.log(this.usuario);
    if(this.usuario && this.usuario.token){
      // this.rootPage = LoggedPage;
      this.nav.setRoot(LoggedPage);
    }else{
      this.nav.setRoot(FirstRunPage);
      this.rootPage = FirstRunPage;
    }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang("pt-br");
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === "zh") {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use("zh-cmn-Hans");
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use("zh-cmn-Hant");
        }
      } else if (browserLang === "pt") {
        this.translate.use("pt-br"); // Set your language here
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use("pt-br"); // Set your language here
    }

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
