import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  IonicPage,
  NavController,
  ViewController,
  NavParams,
  ActionSheetController
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
    params: NavParams,
    public actionSheetCtrl: ActionSheetController
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
      this.form.patchValue({ imagem: this.item.imagem });
    }
  }

  updatePicture2() {
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

  updatePicture() {
    let actionSheet;
    actionSheet = this.actionSheetCtrl.create({
      title: "Editar foto do perfil",
      buttons: [
        {
          text: "Escolher da biblioteca",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Escolher da biblioteca sem camera",
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        },
        {
          text: "Usar a câmera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });

    actionSheet.present();
  }

  takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: sourceType,
      correctOrientation: true,
      targetWidth: 250,
      targetHeight: 250,
      cameraDirection: 0,
      saveToPhotoAlbum: false
    };
    "";
    this.camera.getPicture(options).then(
      imageData => {
        this.form.patchValue({
          imagem: "data:image/jpg;base64," + imageData
        });
      },
      () => {}
    );
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      let imageData = (readerEvent.target as any).result;
      console.log(imageData);
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
