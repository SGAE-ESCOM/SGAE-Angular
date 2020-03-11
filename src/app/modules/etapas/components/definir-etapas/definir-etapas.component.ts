import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DEFINIR_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETAPAS_ESTADO_ASPIRANTE, ETAPAS, ETAPAS_BUSCAR } from '@models/etapas/etapa.enum';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { EtapasService } from '@services/etapas/etapas.service';
import { Router } from '@angular/router';
import { fadeInDown } from '@shared/animations/router.animations';

@Component({
  selector: 'app-definir-etapas',
  templateUrl: './definir-etapas.component.html',
  styleUrls: ['./definir-etapas.component.scss'],
  animations: [ fadeInDown() ],
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
  etapas = [];

  constructor(private _fb: FormBuilder, private _etapaService: EtapasService, private router: Router,
    private _toast: ToastrService, private _swal: SweetalertService) {
    BreadcrumbComponent.update(BC_DEFINIR_ETAPAS);
    this.fgEtapaUsar = this._fb.group({
      etapas: ['', Validators.required],
    });
  }

  ngOnInit() {
    this._etapaService.getEstadosAspirante().then(estadosAspirante => {
      if (estadosAspirante.exists) {
        this.etapasPrevias = this.getEtapasSeleccionadas(estadosAspirante.data());
        this.etapasPrevias.unshift( ETAPAS[0] );
        this.existDefinirEtapas = true;
      }
    });
  }

  // HTTPS 
  finalizarStepper() {
    this._swal.confirmarFinalizar('¿Estás seguro de finalizar la gestión de etapas?').then(
      result => {
        if (result.value) {
          let estadoParaAspirantes = this.createEstadoAspirante();
          this._etapaService.saveEstadosAspirante(estadoParaAspirantes).then( result =>{
            this.router.navigate([BC_DEFINIR_ETAPAS.links[1].url]);
          }).catch( err => this._toast.error("Ha ocurrido un error"));
          if(this.existDefinirEtapas){
            this._etapaService.deleteAllFechas(this.etapasPrevias).then(result => result)
            .catch( err => this._toast.error("Ha ocurrido un error"));
          }
        }
      }
    );
  }

  definirEtapas() {
    this.etapas =  ETAPAS.concat(this.fgEtapaUsar.get('etapas').value);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if( (event.previousIndex * event.currentIndex) != 0)
      moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
    else
      this._toast.warning("Primero debe haber una convocatoria");
  }

  /**
   * Crear el atributo que tendra el estado de los aspirante
   */
  private createEstadoAspirante(): any {
    let estadoAspirante = {};
    this.etapas.slice(1).forEach(etapa => {
      estadoAspirante[etapa.valor] = "invalida";
    });
    return estadoAspirante;
  }

  private getEtapasSeleccionadas(etapas) {
    return Object.entries(etapas).map(([nombre]: any) => ETAPAS_BUSCAR[nombre]);
  }
}
