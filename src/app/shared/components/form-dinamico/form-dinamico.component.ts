import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TipoDato } from './models/tipo-dato';
import { OPC_TIPO_DATO } from './models/enums/enum-tipo-dato.enum';
import { OPC_CAMPO } from './models/enums/enum-tipo-campo.enum'
import { OPC_ARCHIVO } from './models/enums/enum-tipo-archivo.enum'
import { OPC_SELECCION } from './models/enums/enum-tipo-seleccion.enum'
import { OPC_FECHA } from './models/enums/enum-tipo-fecha.enum'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { REGEX_MAYUSCULAS, REGEX_NUMEROS, REGEX_MINUSCULAS } from '@shared/utils/validators/regex';

@Component({
  selector: 'app-form-dinamico',
  templateUrl: './form-dinamico.component.html',
  styleUrls: ['./form-dinamico.component.scss']
})
export class FormDinamicoComponent implements OnInit, OnChanges {

  public readonly OPC = OPC_TIPO_DATO;
  OPC_CAMPO = OPC_CAMPO;
  OPC_ARCHIVO = OPC_ARCHIVO;
  objectKeys = Object.keys;
  fgFormulario: FormGroup;
  documentosAux = {};
  documentosHTML : TipoDato[];

  @Input() titulo = '';
  @Input() documentos: TipoDato[];
  @Input() valoresDefault: any;
  @Input() tema: string = 'outline';

  @Input() cancel: boolean = false;
  @Input() add: boolean = false;
  @Input() update: boolean = false;

  @Output() onCancel = new EventEmitter<Boolean>();
  @Output() onAdd = new EventEmitter<FormGroup>();
  @Output() onUpdate = new EventEmitter<FormGroup>();

  constructor(private fg: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    //this.initForm();
  }

  onClickCancel(){
    this.onCancel.emit(true);
  }

  onClickAdd(formulario) {
    this.onAdd.emit(formulario);
  }

  onClickUpdate(formulario){
    this.onUpdate.emit(formulario);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentos'] && this.documentos != null) {
      this.documentosAux = {};
      this.initForm();
      this.documentos.forEach(
        (documento:any) => {
          this.fgFormulario.addControl(documento.nombre, this.validarFormulario(documento));
          this.documentosAux[documento.nombre] = documento.tipo;
        }
      );
      this.documentosHTML = this.documentos;
    }
    if (changes['valoresDefault'] && this.valoresDefault != null) {
      console.log('Valores default :v')
      this.setValores();
    }
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
      console.log("=====================>")
      console.log(nombre)
      console.log(requisito)
      console.log(this.fgFormulario.get(nombre))
      console.log(this.documentosAux)
      console.log(this.fgFormulario.get(nombre).setValue(requisito))
      if(this.documentosAux[nombre] === this.OPC.SELECCION )
        this.fgFormulario.get(nombre).setValue(requisito);
    });
  }

  private validarFormulario(documento): FormControl {
    let validadores = [];
    if (documento.requerido)
      validadores.push(Validators.required);
    switch (documento.subtipo) {
      case OPC_CAMPO.TEXT: {
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
      case OPC_CAMPO.NUMBER: {
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
