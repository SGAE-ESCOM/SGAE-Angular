import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DOCUMENTACION } from "@breadcrumb/ListLinks";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EnumTipoDato } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { Dato } from '@models/documentacion/enums/dato';


export interface TypeOfData {
  name: string;
  description: string;
  subdata : TypeOfData[];
}

@Component({
  selector: 'app-main-documentacion',
  templateUrl: './main-documentacion.component.html',
  styleUrls: ['./main-documentacion.component.scss']
})
export class MainDocumentacionComponent implements OnInit {

  tipoDatos: any = EnumTipoDato.ALL;
  dato: Dato;
  subDato: Dato;
  fcTipoDato: FormControl = new FormControl('', [Validators.required]);
  fcTipoSubDato: FormControl = new FormControl('', [Validators.required]);

  constructor(private _fb: FormBuilder) {
    BreadcrumbComponent.update(BC_DOCUMENTACION);
    this.dato = EnumTipoDato.CAMPO;
    //this.subDato = this.dato.subDato;
    console.log(this.tipoDatos)
  }

  ngOnInit() {
  }

  cambiarSubData(){
    this.dato = this.fcTipoDato.value;
  }

}
