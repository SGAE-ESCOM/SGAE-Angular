import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { OPC_TIPO_DATO } from '@models/documentacion/enums/enum-tipo-dato.enum';
import { OPC_CAMPO } from '@models/documentacion/enums/enum-tipo-campo.enum'
import { OPC_ARCHIVO } from '@models/documentacion/enums/enum-tipo-archivo.enum'
import { OPC_SELECCION } from '@models/documentacion/enums/enum-tipo-seleccion.enum'
import { OPC_FECHA } from '@models/documentacion/enums/enum-tipo-fecha.enum'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { REGEX_MAYUSCULAS, REGEX_NUMEROS, REGEX_MINUSCULAS } from '@shared/utils/validators/regex';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnChanges {

  public readonly OPC = OPC_TIPO_DATO;
  OPC_CAMPO = OPC_CAMPO;
  OPC_ARCHIVO = OPC_ARCHIVO;
  objectKeys = Object.keys;
  fgFormulario: FormGroup;
  documentosAux = {};

  @Input() titulo = '';
  @Input() documentos: TipoDato[];
  @Input() valoresDefault: any;
  @Output() finalizarForm = new EventEmitter<FormGroup>();
  @Output() guardarForm = new EventEmitter<FormGroup>();

  constructor(private fg: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentos'] && this.documentos != null) {
      this.documentosAux = {};
      this.documentos.forEach(
        (documento:any) => {
          this.fgFormulario.addControl(documento.nombre, this.validarFormulario(documento));
          this.documentosAux[documento.nombre] = documento.tipo;
        }
      );
    }
    if (changes['valoresDefault'] && this.valoresDefault != null) {
      this.setValores();
    }
  }

  enviarFormulario(formulario) {
    this.finalizarForm.emit(formulario);
  }

  guardarFormulario(formulario){
    this.guardarForm.emit(formulario);
  }

  /* Eventos */
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

  getErrorPattern( formControl : FormControl, documento: any){
    let error = '';
    let patron = formControl.validator( formControl ).pattern.requiredPattern;
    if( documento.expresionRegular.espacios == null ){
      error+=`Debe coincidir con la expresion ${documento.expresionRegular.valor}`;
    }else{
      error = 'Sólo ';
      if(patron.includes(REGEX_MAYUSCULAS)){ error+='mayúsculas, ' }
      if(patron.includes(REGEX_MINUSCULAS)){ error+='minúsculas, ' }
      if(patron.includes(REGEX_NUMEROS)){ error+='números, ' }
      if(patron.includes(' ')){ error+= 'y sin espacios al inicio y final' }else { error+= 'y sin espacios' }  
    }
    return error;
  }

  /* Logica Formularios */
  initForm() {
    this.fgFormulario = this.fg.group({});
  }

  private setValores(){
    Object.entries(this.valoresDefault).forEach( ([nombre,requisito]:any) => {
      if(this.documentosAux[nombre] === this.OPC.FECHA )
        this.fgFormulario.get(nombre).setValue(new Date(requisito.valor));
      else
        this.fgFormulario.get(nombre).setValue(requisito.valor);
      if(requisito.valido)
        this.fgFormulario.get(nombre).disable();
    });
  }

  private validarFormulario(documento): FormControl {
    let validadores = [];
    if (documento.requerido)
      validadores.push(Validators.required);
    switch (documento.subtipo) {
      case OPC_CAMPO.TEXTO: {
        if (documento.min != null)
          validadores.push(Validators.minLength(documento.min));
        if (documento.max != null)
          validadores.push(Validators.maxLength(documento.max));
        if( documento.expresionRegular.espacios == null ){
          validadores.push(Validators.pattern( documento.expresionRegular.valor));
        }else{
          if( documento.expresionRegular.espacios ){
            validadores.push(Validators.pattern( `^[${documento.expresionRegular.valor}]+( [${documento.expresionRegular.valor}]+)*$` ));
          }else{
            validadores.push(Validators.pattern( `[${documento.expresionRegular.valor}]+` ));
          }
        }
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
        documento.fechaMin = new Date(documento.fechaMin);
        documento.fechaMax = new Date(documento.fechaMax);
        break;
      }
      default: {
        break;
      }
    }
    return new FormControl('', validadores);
  }

}