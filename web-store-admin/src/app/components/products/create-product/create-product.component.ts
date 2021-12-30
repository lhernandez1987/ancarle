import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
})
export class CreateProductComponent implements OnInit {

  product: any = {};
  file : File = undefined;
  imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  config : any = {};

  constructor(private _messageService: MessageService) {
    this.config = {
      height: 500
    }
  }

  ngOnInit() {}

  regitration(registrationForm) {

    if (registrationForm.valid) {
      console.log(this.product);
      console.log(this.file);
    }

  }

  fileChangeEvent(event: any): void {

    if (event.target.files && event.target.files[0]) {

      this.file = event.target.files[0];

      this.validateImag(this.file);

      console.log(this.file);

    } else {
      this._messageService.getMessageError("No hay una imagen");
      $('#front-page').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file =undefined;
    }

  }

  validateImag(file: File) {

    if (file.size <= 4000000) {

      this.validateImageSize(file);

    } else {
      this._messageService.getMessageError("La imagen no puede superar los 4MG");
      $('#front-page').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file =undefined;

    }
  }

  validateImageSize(file: File) {

    if (
      file.type == "image/png" ||
      file.type == "image/webp" ||
      file.type == "image/jpg" ||
      file.type == "image/gif" ||
      file.type == "image/jpeg"
    ) {

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(file);

      $('#front-page').text(file.name);

    } else {

      this._messageService.getMessageError("El archivo debe ser una imagen");
      $('#front-page').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file =undefined;
    }
  }
}
