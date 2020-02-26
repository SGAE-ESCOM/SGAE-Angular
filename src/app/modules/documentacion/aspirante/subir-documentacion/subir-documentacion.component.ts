import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_SUBIR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { SubirDocumentacionService } from '@services/documentacion/subir-documentacion.service';
import { UsuarioInterface } from '@models/persona/usuario';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-subir-documentacion',
  templateUrl: './subir-documentacion.component.html',
  styleUrls: ['./subir-documentacion.component.scss']
})
export class SubirDocumentacionComponent implements OnInit {

  private usuario: UsuarioInterface;
  formularioRequisito: FormGroup;
  requisitosValidos: any;
  tituloFormulario = 'Formulario de requisitos';
  requisitos: any[];
  requisitosGuardados: any;
  //getAtributos = Object.entries;

  listaRequisitos: Array<any> = [
    { "id": "JqFqP8AhC4PmfY4zLRrp", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" }, "max": 50, "nombre": "Nombres", "requerido": true, "subtipo": "texto", "tipo": "campo" },
    { "id": "9alPjAsQmUfUAVYqK6r2", "descripcion": "Sin tachaduras ni enmendaras", "nombre": "Acta de Nacimiento", "requerido": true, "subtipo": "pdf", "tipo": "archivo" },
    { "id": "MOBJdY7vaN50cNUE962g", "min": 18, "nombre": "Edad", "requerido": true, "subtipo": "número", "tipo": "campo" },
    { "id": "QKrSvodcGlR9QrnVw1Xo", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" }, "max": 50, "min": 10, "nombre": "Apellidos", "requerido": true, "subtipo": "texto", "tipo": "campo" },
    { "id": "oUS6gWm9fItBkznvMFwU", "expresionRegular": { "espacios": false, "valor": "0-9A-ZÁ-Ú" }, "max": 18, "min": "18", "nombre": "CURP", "requerido": true, "subtipo": "texto", "tipo": "campo" },
    { "id": "pgYSsgwBCrQh2CDK16ry", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú0-9" }, "max": 100, "min": 15, "nombre": "Calle", "requerido": true, "subtipo": "texto", "tipo": "campo" }
  ];

  constructor(private _toast: ToastrService, private _swal: SweetalertService, private _subirDoc: SubirDocumentacionService, private _authService: AuthService) {
    BreadcrumbComponent.update(BC_SUBIR_DOCUMENTACION);
    //this.usuario = { id: 'kigHobwLkyZNYs9BXx0mJnvgaFA3', roles: { aspirante: true } }; //DEBUG
    this.usuario = this._authService.getUsuarioC();
  }

  /**
   * Para llevar otro tipo de control, crear una funcion en cadena. 
   * 1. Se piden los requisitos
   * 2. Se piden los valores previos guardados
   * 3. Si es null termina, si existen valores hacer una funcion para anexar el valor en el valor que se le envia al componente.
   * 4. Pintar y continuar con el valor.
   */
  ngOnInit() {
    /* */
    this._subirDoc.getRequisitos().subscribe((documentos: TipoDato[]) => this.requisitos = documentos ); //PRODUCCION
    this._subirDoc.getDocumentacion(this.usuario).subscribe( requisito => {this.requisitosGuardados = requisito;}); //PRODUCCION
    //this.requisitos = this.listaRequisitos; //DEBUG
  }

  //Peticiones REST
  finalizarFormulario(formularioRecivido: FormGroup) {
    if (formularioRecivido.invalid) {
      this._toast.error("El formulario no es válido", "Mensaje de prueba");
    } else {
      this._swal.confirmarFinalizar('¿Deseas finalizar la documentación?');
    }
  }

  guardarFormulario(formularioRecivido: FormGroup) {
    this.requisitosValidos = this.getRequisitosValidos(formularioRecivido);
    this.requisitosValidos = this.addAtributoValidacion(this.requisitosValidos);
    if (Object.keys(this.requisitosValidos).length)
      this._subirDoc.saveDocumentacion(this.usuario, this.requisitosValidos)
        .then(result => this._toast.info("La información se guardo correctamente"))
        .catch(error => this._toast.error(error));
    else {
      this._toast.error("Debe existir por lo menos un valor para guardar", "Valor invalido");
    }
  }

  private getRequisitosValidos(formulario: FormGroup) {
    let listaRequisitosValidos = {};
    for (let [nombre, requisito] of Object.entries(formulario.controls)) {
      if (!requisito.invalid)
        listaRequisitosValidos[nombre] = requisito.value;
    }
    return listaRequisitosValidos;
  }

  private addAtributoValidacion(requisitos){
    let requisitosConValidacion = {};
    for (let [nombre, requisito] of Object.entries(requisitos)) {
      requisitosConValidacion[nombre] = { valor: requisito, valido: false}
    }
    return requisitosConValidacion;
  }
}
