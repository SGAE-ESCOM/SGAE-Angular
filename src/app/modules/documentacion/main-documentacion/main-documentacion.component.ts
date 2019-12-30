import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DOCUMENTACION } from "@breadcrumb/ListLinks";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EnumTipoDato } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { fallIn } from '@shared/router.animations';
import { ToastrService } from 'ngx-toastr';

export interface TypeOfData {
  name: string;
  description: string;
  subdata : TypeOfData[];
}

@Component({
  selector: 'app-main-documentacion',
  templateUrl: './main-documentacion.component.html',
  styleUrls: ['./main-documentacion.component.scss'],
  animations: [ fallIn() ]
})
export class MainDocumentacionComponent implements OnInit {

  tipoComplemento: string = ""; 
  tipoDatos: any = EnumTipoDato.ALL;
  fcTipoDato: FormControl = new FormControl('', [Validators.required]);
  fcTipoSubDato: FormControl = new FormControl('', [Validators.required]);
  //Validacion para fechas
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(private _fb: FormBuilder, private toast: ToastrService) {
    BreadcrumbComponent.update(BC_DOCUMENTACION);
  }

  ngOnInit() {
  }

  cambiarSubData(){
    this.fcTipoSubDato =  new FormControl('', [Validators.required]);
    this.tipoComplemento =this.fcTipoDato.value.nombre;
  }

  alert2(){
    this.toast.success("Hola perro ");
  }

}
