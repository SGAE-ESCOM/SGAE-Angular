import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BC_ORDENAR_REQUISITOS, BC_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { AdministrarDocumentacionService } from '@services/documentacion/administrar-documentacion.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { heapsort } from "@shared/utilerias/heapsort";
import { comprobarPermisos, GESTION_DOC } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenar-requisitos',
  templateUrl: './ordenar-requisitos.component.html',
  styleUrls: ['./ordenar-requisitos.component.scss']
})
export class OrdenarRequisitosComponent implements OnInit {

  requisitos: TipoDato[];
  regresar = BC_ORDENAR_REQUISITOS.links[2].url;

  constructor(private _toast: ToastrService, private _swal: SweetalertService, 
        private _ads: AdministrarDocumentacionService, private _authServices: AuthService, private router: Router) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_DOCUMENTACION);
    if(comprobarPermisos(usuario, GESTION_DOC, router)){
      BreadcrumbComponent.update(BC_ORDENAR_REQUISITOS);
    }
  }

  ngOnInit(): void {
    this._ads.getDocumentos().subscribe((requisitos: TipoDato[]) => this.requisitos = heapsort(requisitos)); //PRODUCCION
  }

  //HTTP
  onGuardarOrdenRequisitos() {
    this._ads.ordenarRequisitos(this.requisitos).then(res => {
      this._toast.success('Se ha cambiado el orden de los requisitos exitosamente');
    }).then().catch(err => this._toast.error('Ha ocurrido un error'));
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.requisitos, event.previousIndex, event.currentIndex);
  }

}