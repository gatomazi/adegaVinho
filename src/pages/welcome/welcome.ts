import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";

import { User, Settings } from "../../providers";

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
    public loadingCtrl: LoadingController
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
      this.navCtrl.push("TabsPage");
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
