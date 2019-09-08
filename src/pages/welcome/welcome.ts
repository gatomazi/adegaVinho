import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { User, Settings } from "../../providers";





@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
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
    private alertCtrl: AlertController
    ) 
    {
      
    }

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
    if(signup.id){
      this.account.nome = "";
      this.account.usuario = "";
      this.account.password = "";
      let alert = this.alertCtrl.create({
        title: "Usuário cadastrado com sucesso",
        // subTitle: '10% of battery remaining',
        buttons: ['Fechar']
      });
      alert.present();
      this.login();
    }else{
      let alert = this.alertCtrl.create({
        title: signup.message,
        // subTitle: '10% of battery remaining',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }
  
  async doLogin() {
    let login = await this.user.login(this.account);
    if(login.token){
      this.settings.setValue("usuario", login);
      this.navCtrl.push('TabsPage');
    }else{
      let alert = this.alertCtrl.create({
        title: login.message,
        // subTitle: '10% of battery remaining',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }
}
