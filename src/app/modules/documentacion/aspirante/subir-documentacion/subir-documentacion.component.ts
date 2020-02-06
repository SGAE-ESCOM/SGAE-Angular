import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_SUBIR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { SubirDocumentacionService } from '@services/documentacion/subir-documentacion.service';
import { UsuarioInterface } from '@models/persona/usuario';
import { TipoDato } from '@models/documentacion/tipo-dato';


@Component({
  selector: 'app-subir-documentacion',
  templateUrl: './subir-documentacion.component.html',
  styleUrls: ['./subir-documentacion.component.scss']
})
export class SubirDocumentacionComponent implements OnInit {

  formularioRequisito: FormGroup;
  tituloFormulario = 'Formulario de requisitos';
  requisitos: any[];
  requisitosGuardados: any;
  private usuario: UsuarioInterface;

  /*listaRequisitos = [ //DEBUG
    { "id": "1", "nombre": "Nombres", "requerido": true, "tipo": "campo", "subtipo": "texto", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" } },
    { "id": "2", "nombre": "Apellidos", "requerido": true, "tipo": "campo", "subtipo": "texto", "max": 50, "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" } },
    { "id": "3", "nombre": "CURP", "requerido": true, "tipo": "campo", "subtipo": "texto", "min": 18, "max": 18, "expresionRegular": { "espacios": false, "valor": "0-9A-ZÁ-Ú" } },
    { "id": "4", "nombre": "Edad", "requerido": true, "tipo": "campo", "subtipo": "número", "min": 18 },
    { "id": "5", "nombre": "Género", "requerido": true, "tipo": "seleccion", "subtipo": "unica", "opciones": { "Hombre": "Hombre", "Mujer": "Mujer", "Otro": "Otro" } },
    { "id": "6", "nombre": "Acta de Nacimiento PDF", "requerido": true, "tipo": "archivo", "subtipo": "pdf", "descripcion": "Archivos menores a 215 KB" },
    { "id": "7", "nombre": "Fecha egreso Min-Max", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMin": "2020-01-09T06:00:00.000Z" },
  ];*/

  constructor(private _toast: ToastrService, private _swal: SweetalertService, private _subirDoc: SubirDocumentacionService) {
    BreadcrumbComponent.update(BC_SUBIR_DOCUMENTACION);
    this.usuario  = { id: 'kigHobwLkyZNYs9BXx0mJnvgaFA3', roles: { aspirante: true } }; //DEBUG
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
    this._subirDoc.getRequisitos().subscribe( (documentos:TipoDato[]) => this.requisitos = documentos ); //PRODUCCION
    this._subirDoc.getDocumentacion(this.usuario).subscribe( requisito => {this.requisitosGuardados = requisito;}); //PRODUCCION
    //this.requisitos = this.listaRequisitos; //DEBUG
  }

  console(){
    console.log(this.formularioRequisito );
  }

  //Peticiones REST
  finalizarFormulario(formularioRecivido: FormGroup) {
    if (formularioRecivido.invalid) {
      this._toast.error("El formulario no es valido", "Mensaje de prueba");
    } else {
      this._swal.confirmarFinalizar('¿Deseas finalizar la documentación?');
    }
  }
  
  guardarFormulario(formularioRecivido: FormGroup) {
    let requisitosValidos = this.getRequisitosValidos(formularioRecivido);
    if(Object.keys(requisitosValidos ).length )
      this._subirDoc.saveDocumentacion( this.usuario, requisitosValidos)
        .then(result => this._toast.info("La información se guardo correctamente"))
        .catch(error => this._toast.error(error));
    else{
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
}
