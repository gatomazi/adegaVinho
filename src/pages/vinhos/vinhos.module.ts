import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";

import { VinhosPage } from "./vinhos";

@NgModule({
  declarations: [VinhosPage],
  imports: [IonicPageModule.forChild(VinhosPage), TranslateModule.forChild()],
  exports: [VinhosPage]
})
export class VinhosPageModule {}
