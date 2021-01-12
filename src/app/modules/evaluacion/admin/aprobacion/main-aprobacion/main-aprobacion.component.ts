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
    { encabezado: 'Nombres', json: 'nombres' }, { encabezado: 'Apellidos', json: 'apellidos' }, {encabezado:'Email', json: 'email'}, { encabezado: 'Aciertos', json: 'aciertos' }, { encabezado: 'Resultado de simulador', json: 'resultado' },
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

  cambiarEstadoAspirante(aspirante: UsuarioInterface) {
    if (aspirante.estado.evaluacionConocimientos !== 'invalida'){
      let estadoOpuesto = this.estadoOpuesto(aspirante.estado.evaluacionConocimientos);
      this._swal.confirmarGenerico(`¿Deseas cambiar el Estado de Evaluación de "${aspirante.nombres} ${aspirante.apellidos}" de "${aspirante.estado.evaluacionConocimientos}" a "${estadoOpuesto}"?`
        , '', 'Cancelar', 'Cambiar').then(accion => {
          if (accion.value) {
            this._usuarios.updateEstadoEvaluacion(aspirante, estadoOpuesto).then(result => {
              this._toastr.success("Estado de aspirante actualizado");
              this.onChangeAplicacion(this.aplicacionAux);
            }, err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR); console.error(err) })
          }
        });
      } else {
      this._swal.confirmarGenerico(`¿Deseas validar a "${aspirante.nombres} ${aspirante.apellidos}"?`
        , '', 'Cancelar', 'Cambiar').then(accion => {
          if (accion.value) {
            this._usuarios.updateEstadoEvaluacion(aspirante, 'Válido').then(result => {
              this._toastr.success("Estado de aspirante actualizado");
              this.onChangeAplicacion(this.aplicacionAux);
            }, err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR); console.error(err) })
          }
        });
    }
  }

  aprobarTodos() {
    this._swal.confirmarGenerico('¿Deseas validar a todos?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'Validar').then(accion => {
      if (accion.value) {
        this._usuarios.updateEstadoEvaluacionPorAplicacion(this.aspirantes, 'Válido').then(res => {
          this.onChangeAplicacion(this.aplicacionAux);
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
      }
    });
  }

  rechazarTodos() {
    this._swal.confirmarGenerico('¿Deseas no validar a ninguno?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'No validar').then(accion => {
      if (accion.value) {
        this._usuarios.updateEstadoEvaluacionPorAplicacion(this.aspirantes, 'No válido').then(res => {
          this.onChangeAplicacion(this.aplicacionAux);
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
      }
    });
  }

  admitirSoloAprobados() {
    this._swal.confirmarGenerico('¿Deseas validar sólo a los aprobados?', 'Podrás editar después el estado de cada uno de manera individual', 'Cancelar', 'Validar').then(accion => {
      if (accion.value) {
        const aprobados = this.aspirantes.filter(aspirante => aspirante.historialAplicacion[this.aplicacionAux.id].resultado === 'Aprobado');
        const reprobados = this.aspirantes.filter(aspirante => aspirante.historialAplicacion[this.aplicacionAux.id].resultado === 'Reprobado');
        this._usuarios.updateEstadoEvaluacionPorAplicacion(aprobados, 'Válido').then(res => {
        }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) }).then(s => {
          this._usuarios.updateEstadoEvaluacionPorAplicacion(reprobados, 'No válido').then(res => {
            this.onChangeAplicacion(this.aplicacionAux);
          }, err => { console.error(err); this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
        });
      }
    });
  }


  enviarNotificacionTodos(){
    this._swal.confirmarGenerico('¿Deseas enviar noficación de estado a estos aspirantes?', '', 'Cancelar', 'Enviar').then(accion => {
      if (accion.value) {
        this._usuarios.enviarNotificacionEvaluacion(this.aspirantes).then( result => {
          this._toastr.success("Estado de evaluación enviado");
          console.log(result);
        }, err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR); console.error(err)});
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

  private estadoOpuesto(estado: string): string {
    if (estado === 'Válido')
      return 'No válido'
    return 'Válido';
  }
}