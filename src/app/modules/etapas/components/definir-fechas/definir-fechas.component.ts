import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_DEFINIR_FECHAS, BC_DEFINIR_ETAPAS, BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarData } from '@shared/components/calendario/interfaces/calendar-data';
import { fadeInOutDown } from '@shared/animations/router.animations';
import { ETAPAS, ETAPAS_BUSCAR } from '@models/etapas/etapa.enum';
import { COLORES_ETAPAS, BUSCAR_COLOR_ETAPAS } from "@models/etapas/colores-etapa.enum";
import { EtapasService } from '@services/etapas/etapas.service';
import { Router } from '@angular/router';
import { AccesosAdministrador } from '@shared/admin-permissions/permissions';

@Component({
  selector: 'app-definir-fechas',
  templateUrl: './definir-fechas.component.html',
  styleUrls: ['./definir-fechas.component.scss'],
  animations: [fadeInOutDown()]
})
export class DefinirFechasComponent implements OnInit {

  //Formularios
  fgEtapasFechas: FormGroup;
  fechaActual = new Date();
  dataSource: CalendarData[];
  etapas = [];
  colores = COLORES_ETAPAS

  //Logica
  existDefinirEtapas = true;
  linkDefinirEtapas = BC_DEFINIR_ETAPAS.title.url;

  constructor(private _fb: FormBuilder, private _etapaService: EtapasService, private accesosAdministrador: AccesosAdministrador,
        private _toast: ToastrService, private _swal: SweetalertService, private router: Router) {
    BreadcrumbComponent.update(BC_ETAPAS);
    if(this.accesosAdministrador.accesoEtapas()){
      BreadcrumbComponent.update(BC_DEFINIR_FECHAS);
    }
  }

  ngOnInit() {
    this._etapaService.getEstadosAspirante().then(estadosAspirante => {
      if (estadosAspirante.exists) {
        this.etapas = this.getEtapasSeleccionadas(estadosAspirante.data());
        this.etapas.unshift( ETAPAS[0], ETAPAS[1] );
        this.llenarFormulario();
        this._etapaService.getFechasEtapas().then( querySnapshot => {
          if (!querySnapshot.empty){
            querySnapshot.forEach( doc => this.llenarDatos(doc.id, doc.data()) );
            this.pintarFechas();
          }
        }).catch(err =>  err);
      } else {
        this.existDefinirEtapas = false;
        this._toast.warning("Aún no se han definido las etapas que se usarán");
      }
    });
  }

  // HTTPS
  saveFechas() {
    if (this.fgEtapasFechas.valid) {
      if( this.menoresConvocatoria() ){
        this.pintarFechas();
        this._swal.confirmarFinalizar('¿Está seguro de finalizar las fechas de cada una de las etapas?').then( result =>{
          if(result.value){
            this._etapaService.saveFechasEtapas(this.fgEtapasFechas.value).then( res => {
              this._toast.success("Fechas establecidas correctamente");
              this.router.navigate([BC_DEFINIR_ETAPAS.links[1].url]);
            }).catch( err => { this._toast.error("Ha ocurrido un error")});
          }
        });
      }
    } else {
      this._toast.error("Invalido", "Llena todos los elementos requeridos")
    }
  }

  definirFechas(){
    if( this.menoresConvocatoria() ){
      this.pintarFechas();
    }
  }

  //Lógica del componente
  pintarFechas() {
    if (this.fgEtapasFechas.valid) {
      console.log(this.fgEtapasFechas.value);
      this.dataSource = Object.entries(this.fgEtapasFechas.value).map(([atributo, valor]: any, index) => {
        return {
          id: index,
          name: valor.nombre,
          startDate: new Date(valor.fechaInicio),
          endDate: new Date(valor.fechaTermino),
          color: valor.color.valor
        }
      });
    } else {
      this._toast.error("Llena todos los elementos requeridos")
    }
  }

  private llenarFormulario() {
    this.fgEtapasFechas = new FormGroup({});
    this.etapas.forEach((etapa, index) => this.fgEtapasFechas.addControl(etapa.valor, this._fb.group({
      nombre: [etapa.nombre],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      color: [this.colores[index+1], Validators.required],
    })));
  }

  private menoresConvocatoria(){
    let inicioConvocatoria = (new Date(this.fgEtapasFechas.value['convocatoria'].fechaInicio)).getTime();
    let estatus = true;
    Object.entries(this.fgEtapasFechas.value).slice(1).forEach(([atributo, etapa]: any) => {
      let inicioEtapa = (new Date(etapa.fechaInicio) ).getTime();
      if(inicioEtapa < inicioConvocatoria ){
        this._toast.error(`La etapa ${etapa.nombre} no debe iniciar antes de convocatoria`);
        estatus = false;
      }
    });
    return estatus;
  }

  private getEtapasSeleccionadas(etapas) {
    return Object.entries(etapas).map(([nombre]: any) => ETAPAS_BUSCAR[nombre]);
  }

  private llenarDatos(nombre: string, etapa:any){
    this.fgEtapasFechas.get(nombre).get('fechaInicio').setValue(new Date(etapa.fechaInicio));
    this.fgEtapasFechas.get(nombre).get('fechaTermino').setValue(new Date(etapa.fechaTermino));    
    this.fgEtapasFechas.get(nombre).get('color').patchValue( BUSCAR_COLOR_ETAPAS[etapa.color]);
  }
}
