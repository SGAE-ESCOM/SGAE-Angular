import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { OPC_TIPO_DATO } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { OPC_CAMPO } from '@models/documentacion/enums/enum-tipo-campo.enum'
import { OPC_SELECCION } from '@models/documentacion/enums/enum-tipo-seleccion.enum'
import { OPC_FECHA } from '@models/documentacion/enums/enum-tipo-fecha.enum'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnChanges {

  public readonly OPC = OPC_TIPO_DATO;
  objectKeys = Object.keys;
  fgFormulario: FormGroup;

  @Input() titulo = '';
  @Input() documentos: TipoDato[];
  @Output() formulario = new EventEmitter<FormGroup>();

  constructor(private fg: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentos']) {
      this.documentos.forEach(
        documento => this.fgFormulario.addControl(documento.nombre, this.validarFormulario(documento))
      );
    }
  }

  initForm() {
    this.fgFormulario = this.fg.group({});
  }

  validarFormulario(documento): FormControl {
    let validadores = [];
    if (documento.requerido)
      validadores.push(Validators.required);
    switch (documento.subtipo) {
      case OPC_CAMPO.TEXTO: {
        if (documento.min != null)
          validadores.push(Validators.minLength(documento.min));
        if (documento.max != null)
          validadores.push(Validators.maxLength(documento.max));
        break;
      }
      case OPC_CAMPO.NUMERO: {
        if (documento.min != null)
          validadores.push(Validators.min(documento.min));
        if (documento.max != null)
          validadores.push(Validators.max(documento.max));
        break;
      }
      case OPC_SELECCION.MULTIPLE: {
        break;
      }
      case OPC_SELECCION.UNICA: {
        break;
      }
      case OPC_FECHA.RANGO: {
        break;
      }
      default: {
        break;
      }
    }
    //console.log(`${ documento.subtipo } => ${ validadores }`);
    return new FormControl('', validadores);
  }

  enviarFormulario(formulario) {
    this.formulario.emit(formulario);
  }

  handleUpload(event: any, documento) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let jsonFile = {
          nombre: file.name,
          archivo: reader.result
        };
        this.fgFormulario.get(documento).patchValue(jsonFile);
      };
    }
  }

}