import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
@IonicPage()
@Component({
  selector: "page-vinho-detalhe",
  templateUrl: "vinho-detalhe.html"
})
export class VinhoDetalhePage {
  item: any;
  uvasSplit: any;

  // objIcons = {
  iconTipoVinho: any = "../../assets/icon/taca.png";
  iconSafra: any = "../../assets/icon/harvest.png";
  iconTeorAlc: any = "../../assets/icon/teor.png";
  iconQtd: any = "../../assets/icon/wine-box.png";
  iconVinicola: any = "../../assets/icon/farm.png";
  iconUva: any = "../../assets/icon/grape2.png";
  // };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer
  ) {
    this.item = this.navParams.get("vinho");
    console.log(this.item);
    this.uvasSplit = this.item.uva.split(",");

    this.item.flag = this.converteImagem(
      "https://res.cloudinary.com/evino/image/upload/dpr_1.0,w_16,f_auto,q_auto:best/v1/web/assets/" +
        this.item.pais
    );
    // Object.keys(this.objIcons).forEach(function(key) {
    //   this.objIcons[key] = this.converteImagem(this.objIcons[key]);
    // });

    this.iconUva = this.converteImagem(this.iconUva);
    this.iconVinicola = this.converteImagem(this.iconVinicola);
    this.iconQtd = this.converteImagem(this.iconQtd);
    this.iconTeorAlc = this.converteImagem(this.iconTeorAlc);
    this.iconSafra = this.converteImagem(this.iconSafra);
    this.iconTipoVinho = this.converteImagem(this.iconTipoVinho);
  }

  public converteImagem(imagem) {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }
}
