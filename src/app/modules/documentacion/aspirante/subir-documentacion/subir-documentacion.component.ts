import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_SUBIR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { SubirDocumentacionService } from '@services/documentacion/subir-documentacion.service';
import { UsuarioInterface } from '@models/persona/usuario';


@Component({
  selector: 'app-subir-documentacion',
  templateUrl: './subir-documentacion.component.html',
  styleUrls: ['./subir-documentacion.component.scss']
})
export class SubirDocumentacionComponent implements OnInit {

  tituloFormulario = 'Formulario de requisitos';
  requisitos: any[];
  private usuario: UsuarioInterface = {
    id: 'AvNmqzvWHLQBddC6ZSe5KsUSoLS2',
    roles: { aspirante: true }
  };

  listaRequisitos = [ //DEBUG
    { "id": "1", "nombre": "Nombres", "requerido": true, "tipo": "campo", "subtipo": "texto", "expresionRegular": { "espacios": true, "valor": "a-zá-úA-ZÁ-Ú" } },
    { "id": "2", "nombre": "Apellidos", "requerido": true, "tipo": "campo", "subtipo": "texto", "max": 50, "expresionRegular": { "espacios": false, "valor": "a-zá-úA-ZÁ-Ú0-9" } },
    { "id": "3", "nombre": "CURP", "requerido": true, "tipo": "campo", "subtipo": "texto", "min": 18, "max": 18, "expresionRegular": { "espacios": false, "valor": "0-9A-ZÁ-Ú" } },
    { "id": "4", "nombre": "Edad", "requerido": true, "tipo": "campo", "subtipo": "número", "min": 18 },
    { "id": "5", "nombre": "Género", "requerido": true, "tipo": "seleccion", "subtipo": "unica", "opciones": { "Hombre": "Hombre", "Mujer": "Mujer", "Otro": "Otro" } },
    { "id": "6", "nombre": "Acta de Nacimiento PDF", "requerido": true, "tipo": "archivo", "subtipo": "pdf", "descripcion": "Archivos menores a 215 KB" },
    { "id": "7", "nombre": "Fecha egreso Min-Max", "requerido": true, "tipo": "fecha", "subtipo": "rango", "fechaMin": "2020-01-09T06:00:00.000Z", "fechaMax": "2020-01-23T06:00:00.000Z" },
  ];

  constructor(private _toast: ToastrService, private _swal: SweetalertService, private _subirDoc: SubirDocumentacionService) {
    BreadcrumbComponent.update(BC_SUBIR_DOCUMENTACION);
  }

  ngOnInit() {
    //this.requisitos = 
    this.requisitos = this.listaRequisitos; //DEBUG
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
    this._subirDoc.saveDocumentacion( this.usuario, requisitosValidos)
      .then(result => this._toast.info("La información se guardo correctamente"))
      .catch(error => this._toast.error(error));
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
