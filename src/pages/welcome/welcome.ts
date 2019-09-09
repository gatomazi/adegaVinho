import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { Network } from "@ionic-native/network";

import { User, Settings } from "../../providers";
import { App } from "ionic-angular";

import { LoggedPage } from "../";

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  account: { nome: string; usuario: string; password: string } = {
    nome: "",
    usuario: "",
    password: ""
  };

  makeLogin: boolean = false;
  makeSignup: boolean = false;
  constructor(
    public navCtrl: NavController,
    public user: User,
    public settings: Settings,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public network: Network,
    private app: App
  ) {}

  login() {
    this.makeLogin = true;
    this.makeSignup = false;
    // this.navCtrl.push('LoginPage');
  }

  signup() {
    this.makeLogin = false;
    this.makeSignup = true;
    // this.navCtrl.push('SignupPage');
  }

  verifyConnection() {
    if (this.network.type == "none") {
      this.createDefaultAlert("Sem conexão com internet");
    }
  }

  async doSignup() {
    let signup = await this.user.signup(this.account);
    if (signup.id) {
      this.account.nome = "";
      this.account.usuario = "";
      this.account.password = "";

      this.createDefaultAlert("Usuário cadastrado com sucesso");
      this.login();
    } else {
      this.createDefaultAlert(signup.message);
    }
  }

  async doLogin() {
    let loading = this.loadingCtrl.create({
      content: "Verificando credenciais"
    });

    loading.present();
    let login = await this.user.login(this.account);

    loading.dismiss();
    if (login.token) {
      this.settings.setValue("usuario", login);
      this.app.getRootNavs()[0].setRoot(LoggedPage);
      // this.navCtrl.push("TabsPage");
    } else {
      this.createDefaultAlert(login.message);
    }
  }

  createDefaultAlert(text: string, txtCancelBtn: string = "Fechar") {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ["Fechar"]
    });

    alert.present();
    return alert;
  }
}
