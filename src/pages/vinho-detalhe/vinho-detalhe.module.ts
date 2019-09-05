import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";

import { VinhoDetalhePage } from "./vinho-detalhe";

@NgModule({
  declarations: [VinhoDetalhePage],
  imports: [
    IonicPageModule.forChild(VinhoDetalhePage),
    TranslateModule.forChild()
  ],
  exports: [VinhoDetalhePage]
})
export class VinhoDetalhePageModule {}
