import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";

import { VinhoCriacaoPage } from "./vinho-criacao";

@NgModule({
  declarations: [VinhoCriacaoPage],
  imports: [
    IonicPageModule.forChild(VinhoCriacaoPage),
    TranslateModule.forChild()
  ],
  exports: [VinhoCriacaoPage]
})
export class VinhoCriacaoPageModule {}
