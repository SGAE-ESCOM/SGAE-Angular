import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Grupo } from '@models/evaluacion/Grupo';
import { UsuarioInterface } from '@models/persona/usuario';
import { Tabla } from '@models/utils/Tabla';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { GruposService } from '@services/evaluacion/grupos.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_APROBACION_EVALUACION } from '@shared/routing-list/ListLinks';
import { fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { groupBy } from '@shared/utils/utils-grupos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-aprobacion',
  templateUrl: './main-aprobacion.component.html',
  styleUrls: ['./main-aprobacion.component.scss'],
  animations: [fadeInRight()]
})
export class MainAprobacionComponent implements OnInit {

  columnas: Tabla[] = [{ encabezado: 'Nombres', json: 'nombres' }, { encabezado: 'Apellidos', json: 'apellidos' }, { encabezado: 'Aciertos', json: 'aciertos', property:'',  }, { encabezado: 'Resultado', json: 'resultado' }, { encabezado: 'Acciones', json: 'acciones' }]
  aspirantes: UsuarioInterface[] = [];

  grupos: Grupo[] = [];
  aplicaciones: Aplicacion[] = [];
  aplicacionesDisponibles: any = {};

  //Controls
  grupo: FormControl = new FormControl('');
  aplicacion: FormControl = new FormControl('');
  resultado: FormControl = new FormControl('');

  constructor(private _toastr: ToastrService,
    private _usuarios: UsuarioService, private _aplicacion: AplicacionService, private _grupos: GruposService) {
    BreadcrumbComponent.update(BC_APROBACION_EVALUACION);
  }

  ngOnInit(): void {
    this.getCatalogos();
  }

  /*********************************************** REST HTTP **************************************************/
  async getCatalogos() {
    await this._aplicacion.getAll().subscribe(aplicaciones => this.aplicacionesDisponibles = groupBy(aplicaciones, 'grupo'));
    this._grupos.get().subscribe(grupos => this.grupos = grupos);
  }

  private async getAspirantes(aplicacion:Aplicacion, resultado: string){
    this._usuarios.geAspirantesPorAplicacion(aplicacion.id, resultado).then((querySnapshot) => {
      let usuarios = [];
      querySnapshot.forEach((doc) => {
        usuarios.push(doc.data());
      });
      this.definirUsuarios(usuarios, aplicacion.id);
    }).catch(err => this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR));
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
    this.aspirantes = [];
    await this.getAspirantes(aplicacion, 'Aprobado');
    await this.getAspirantes(aplicacion, 'Reprobado');
  }

  /****************************************  UTILS *********************************************/
  private definirUsuarios(usuarios: any[], idAplicacion: string): void {
    console.log(usuarios);
    if (!usuarios.length)
      this._toastr.info("No se han encontrado resultados");
    this.aspirantes = this.aspirantes.concat(usuarios.map( usuario => {
      usuario.resultado = usuario.historialAplicacion[idAplicacion].resultado,
      usuario.aciertos = usuario.historialAplicacion[idAplicacion].aciertos
      return usuario;
    }));
  }

}