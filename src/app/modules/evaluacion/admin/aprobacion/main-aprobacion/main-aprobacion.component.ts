import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Grupo } from '@models/evaluacion/Grupo';
import { UsuarioInterface } from '@models/persona/usuario';
import { Tabla, TipoColumn } from '@models/utils/Tabla';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_APROBACION_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-aprobacion',
  templateUrl: './main-aprobacion.component.html',
  styleUrls: ['./main-aprobacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAprobacionComponent implements OnInit {

  columnas: Tabla[] = [
    { encabezado: 'Nombres', json: 'nombres' }, { encabezado: 'Apellidos', json: 'apellidos' }, { encabezado: 'Aciertos', json: 'aciertos' }, { encabezado: 'Resultado de simulador', json: 'resultado' }, 
    { encabezado: 'Estado Evaluación', tipo: TipoColumn.OBJETO_PROPERTY, json: 'estado', property: 'evaluacionConocimientos' }, { encabezado: 'Acciones', json: 'acciones' }];
  aspirantes: UsuarioInterface[] = [];

  grupos: Grupo[] = [];
  aplicacionAux: Aplicacion;
  aplicaciones: Aplicacion[] = [];
  aplicacionesDisponibles: any = {};

  //Controls
  grupo: FormControl = new FormControl('');
  aplicacion: FormControl = new FormControl('');
  resultado: FormControl = new FormControl('');

  constructor(private _toastr: ToastrService, private _swal: SweetalertService,
    private _usuarios: UsuarioService, private _aplicacion: AplicacionService, private _grupos: GruposService) {
    BreadcrumbComponent.update(BC_APROBACION_EVALUACION);
  }

  ngOnInit(): void {
    this.getCatalogos();
  }

  /*********************************************** REST HTTP **************************************************/
  async getCatalogos() {
    await this._aplicacion.getAll().subscribe(aplicaciones => this.aplicaciones = aplicaciones);
    //await this._grupos.get().subscribe(grupos => this.grupos = grupos);
  }

  private async getAspirantes(aplicacion: Aplicacion, resultado: string) {
    this._usuarios.geAspirantesPorAplicacion(aplicacion.id, resultado).then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
      });
      this.definirUsuarios(usuarios, aplicacion.id);
    }).catch(err => this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR));
  }
  
  cambiarEstadoAspirante(aspirante: UsuarioInterface){
    if(aspirante.estado.evaluacionConocimientos !== 'invalida')
    this._swal.confirmarGenerico(`¿Deseas cambiar el Estado de Evaluación de "${aspirante.nombres} ${aspirante.apellidos}" de "${aspirante.estado.evaluacionConocimientos}" a ${ this.estadoOpuesto(aspirante.estado.evaluacionConocimientos) }?`
      , 'Podrás editar después el estado del aspirante', 'Cancelar', 'Cambiar').then( accion => {
        if(accion.value){

        }
      });
    else{
      this._swal.confirmarGenerico(`¿Deseas admitir a "${aspirante.nombres} ${aspirante.apellidos}"?`
      , 'Podrás editar después el estado del aspirante', 'Cancelar', 'Cambiar').then( accion => {
        if(accion.value){

        }
      });
    }
  }

  aprobarTodos() {
    this._swal.confirmarGenerico('¿Deseas admitir a todos?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'Aprobar').then( accion => {
      if(accion.value){
        this._usuarios.updateEstadoEvaluacionPorAplicacion(this.aspirantes, 'Admitido').then( res => {
          this.onChangeAplicacion(this.aplicacionAux);
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)});
      }
    });
  }

  rechazarTodos() {
    this._swal.confirmarGenerico('¿Deseas rechazar a todos?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'Rechazar').then( accion => {
      if(accion.value){
        this._usuarios.updateEstadoEvaluacionPorAplicacion(this.aspirantes, 'Rechazado').then( res => {
          this.onChangeAplicacion(this.aplicacionAux);
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)});
      }
    });
  }

  admitirSoloAprobados(){
    this._swal.confirmarGenerico('¿Deseas admitir sólo a los aprobados?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'Aprobar').then( accion => {
      if(accion.value){
        const aprobados = this.aspirantes.filter( aspirante => aspirante.historialAplicacion[this.aplicacionAux.id].resultado === 'Aprobado');
        const reprobados = this.aspirantes.filter( aspirante => aspirante.historialAplicacion[this.aplicacionAux.id].resultado === 'Reprobado');
        this._usuarios.updateEstadoEvaluacionPorAplicacion(aprobados, 'Admitido').then( res => {
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)}).then( s => {
          this._usuarios.updateEstadoEvaluacionPorAplicacion(reprobados, 'Rechazado').then( res => {
            this.onChangeAplicacion(this.aplicacionAux);
          }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)});
        });
      }
    });
  }

  /*********************************************** ACCIONES **************************************************/
  onChangeGrupo(grupo: Grupo) {
    this.aplicaciones = this.aplicacionesDisponibles[grupo.id];
    if (this.aplicaciones) {
      this.aplicacion.enable();
    } else {
      this._toastr.warning('No hay aplicaciones para este grupo');
      this.aplicacion.disable();
      this.aplicacion.setValue('');
    }
  }

  async onChangeAplicacion(aplicacion: Aplicacion) {
    this.aplicacionAux = aplicacion;
    this.aspirantes = [];
    await this.getAspirantes(aplicacion, 'Aprobado');
    await this.getAspirantes(aplicacion, 'Reprobado');
  }

  /****************************************  UTILS *********************************************/
  private definirUsuarios(usuarios: any[], idAplicacion: string): void {
    this.aspirantes = this.aspirantes.concat(usuarios.map(usuario => {
      usuario.resultado = usuario.historialAplicacion[idAplicacion].resultado,
        usuario.aciertos = usuario.historialAplicacion[idAplicacion].aciertos
      return usuario;
    }));
  }

  private estadoOpuesto(estado:string): string{
    if(estado === 'Admitido')
      return 'Rechazado'
    return 'Admitido';
  }
}