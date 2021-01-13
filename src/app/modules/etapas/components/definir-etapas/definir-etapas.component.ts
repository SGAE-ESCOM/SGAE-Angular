import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DEFINIR_ETAPAS, BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETAPAS_ESTADO_ASPIRANTE, ETAPAS, ETAPAS_BUSCAR } from '@models/etapas/etapa.enum';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { EtapasService } from '@services/etapas/etapas.service';
import { Router } from '@angular/router';
import { fadeInDown } from '@shared/utils/animations/router.animations';
import { comprobarPermisos, GESTION_ETAPAS } from '@shared/admin-permissions/permissions';
import { AuthService } from '@services/auth.service';
import { Etapa } from '@models/etapas/etapa';

@Component({
  selector: 'app-definir-etapas',
  templateUrl: './definir-etapas.component.html',
  styleUrls: ['./definir-etapas.component.scss'],
  animations: [fadeInDown()],
})
export class DefinirEtapasComponent implements OnInit {

  //Variables del Stepper
  isLinear = true;
  //Variables para EtapasPrevias
  existDefinirEtapas = false;
  etapasPrevias = [];
  //Formularios
  fgEtapaUsar: FormGroup;
  etapasDisponibles = ETAPAS_ESTADO_ASPIRANTE;
  etapas: Etapa[] = [];

  constructor(private _fb: FormBuilder, private _etapaService: EtapasService, private router: Router,
    private _toast: ToastrService, private _swal: SweetalertService, private _authServices: AuthService) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_ETAPAS);
    if (comprobarPermisos(usuario, GESTION_ETAPAS, router)) {
      BreadcrumbComponent.update(BC_DEFINIR_ETAPAS);
      this.fgEtapaUsar = this._fb.group({
        etapas: ['', Validators.required],
      });
    }
  }

  ngOnInit() {
    this._etapaService.getEstadosAspirante().then(estadosAspirante => {
      if (estadosAspirante.exists) {
        this.etapasPrevias = this.getEtapasSeleccionadas(estadosAspirante.data());
        this.etapasPrevias.unshift(ETAPAS[0], ETAPAS[1]);
        this.existDefinirEtapas = true;
      }
    });
  }

  /******************************************** REST HTTP ***********************************************/
  finalizarStepper() {
    this._swal.confirmarFinalizar('¿Estás seguro de finalizar la gestión de etapas?').then(
      result => {
        if (result.value) {
          let estadoParaAspirantes = this.createEstadoAspirante();
          //Se salvan los estados del usuario
          this._etapaService.saveEstadosAspirante(estadoParaAspirantes).then(result => {
            //Se salva el orden de las etapas
            let ordenEtapas = this.createOrdenEtapas();
            this._etapaService.saveEtapas(ordenEtapas).then(result => {
              this._toast.success("Etapas definidas y seleccionadas correctamente");
              this.router.navigate([BC_DEFINIR_ETAPAS.links[1].url]);
            })
          }).catch(err => { this._toast.error("Ha ocurrido un error"); console.error(err)});
          if (this.existDefinirEtapas) {
            this._etapaService.deleteAllFechas(this.etapasPrevias).then(result => result)
              .catch(err => {this._toast.error("Ha ocurrido un error"); console.error(err) });
          }
        }
      }
    );
  }

  /******************************************** ACCIONES ***********************************************/
  definirEtapas() {
    this.etapas = ETAPAS.concat(this.fgEtapaUsar.get('etapas').value);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    const ultimo = this.etapas.length-1;
    if ((event.previousIndex * event.currentIndex) == 0)
      this._toast.warning("No puedes cambiar el orden de la convocatoria");
    else if (event.previousIndex == 1 || event.currentIndex == 1)
      this._toast.warning("No puedes cambiar el orden del registro");
    else if ( (event.previousIndex == ultimo || event.currentIndex == ultimo ) && this.etapas[this.etapas.length-1].valor === "publicacionResultados")
      this._toast.warning("No puedes cambiar el orden de publicación de resultados");
    else
      moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
  }

  /******************************************** UTILS ***********************************************/
  /**
   * Crear el atributo que tendra el estado de los aspirante
   */
  private createEstadoAspirante(): any {
    let estadoAspirante = {};
    this.etapas.slice(2).forEach(etapa => {
      estadoAspirante[etapa.valor] = "invalida";
    });
    return estadoAspirante;
  }

  private createOrdenEtapas(): any {
    let estadoAspirante = {};
    this.etapas.slice(2).forEach((etapa, i) => {
      estadoAspirante[etapa.valor] = { id: i+2, nombre: etapa.nombre, valor: etapa.valor};
    });
    return estadoAspirante;
  }

  private getEtapasSeleccionadas(etapas) {
    return Object.entries(etapas).map(([nombre]: any) => ETAPAS_BUSCAR[nombre]);
  }
}
