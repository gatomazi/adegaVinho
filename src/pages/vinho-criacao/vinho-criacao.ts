import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import {
  IonicPage,
  NavController,
  ViewController,
  NavParams
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-vinho-criacao",
  templateUrl: "vinho-criacao.html"
})
export class VinhoCriacaoPage {
  @ViewChild("fileInput") fileInput;

  isReadyToSave: boolean;

  item: any = {
    nome: "",
    descricao: "",
    edicao: false,
    imagem: ""
  };

  editItem: any;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    params: NavParams
  ) {
    this.form = formBuilder.group({
      nome: ["", Validators.required],
      safra: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{4}$")
        ])
      ],
      pais: ["", Validators.required],
      regiao: [""],
      produtor: [""],
      qtd: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      imagem: [""],
      descricao: [""],
      teorAlc: [
        "",
        Validators.compose([
          Validators.pattern(
            "(^100(.0{1,2})?$)|(^([1-9]([0-9])?|0)(.[0-9]{1,2})?$)"
          )
        ])
      ],
      tipoVinho: [""],
      uva: [""],
      edicao: [""]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
    this.editItem = params.get("item");
    if (this.editItem != null) {
      this.item = this.editItem;
      this.form.patchValue({ edicao: true });
      this.form.patchValue({ imagem: this.item.imagem });
    }
  }

  getPicture() {
    if (Camera["installed"]()) {
      this.camera
        .getPicture({
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 250,
          targetHeight: 250
        })
        .then(
          data => {
            this.form.patchValue({
              imagem: "data:image/jpg;base64," + data
            });
          },
          err => {
            alert("Unable to take photo");
          }
        );
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ imagem: imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return "url(" + this.form.controls["imagem"].value + ")";
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  done() {
    if (!this.form.valid) {
      return;
    }
    this.viewCtrl.dismiss({
      item: this.form.value,
      edicao: this.editItem != null ? true : false
    });
  }
}
