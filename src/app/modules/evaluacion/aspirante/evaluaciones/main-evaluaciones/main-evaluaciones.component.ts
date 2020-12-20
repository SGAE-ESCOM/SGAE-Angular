import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Grupo } from '@models/evaluacion/Grupo';
import { Resultado } from '@models/evaluacion/resultado';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { ResultadosService } from '@services/evaluacion/resultados.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_EVALUACIONES, GRUPOS } from '@shared/routing-list/ListLinks';
import { cardAnimation, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { momentJS } from '@shared/utils/traduccion/moment';

@Component({
  selector: 'app-main-evaluaciones',
  templateUrl: './main-evaluaciones.component.html',
  styleUrls: ['./main-evaluaciones.component.scss'],
  animations: [fadeInRight(), cardAnimation()]
})
export class MainEvaluacionesComponent implements OnInit {

  usuario: UsuarioInterface;
  grupo: Grupo;
  hasGrupo: boolean = true;
  aplicaciones: Aplicacion[] = [];
  aplicacionesDisponibles: Aplicacion[] = [];
  aplicacionesRealizadas: Resultado[] = [];
  linkInscribirGrupo = GRUPOS.url;

  constructor(private _auth: AuthService, private _swal: SweetalertService, private router: Router,
    private _aplicaciones: AplicacionService, private _resultados: ResultadosService,) {
    BreadcrumbComponent.update(BC_EVALUACIONES);
    this.usuario = _auth.getUsuarioC();
    if (this.usuario.grupo) {
      this.hasGrupo = true;
      this.grupo = this.usuario.grupo;
      this._aplicaciones.getAllByGrupo(this.grupo).then((querySnapshot) => {
        let aplicaciones = [];
        querySnapshot.forEach((doc) => {
          let aplicacion = doc.data();
          aplicacion.fechaFormated = momentJS(aplicacion.fecha).format('Do MMMM YYYY')
          aplicaciones.push(aplicacion);
        });
        this.aplicaciones = aplicaciones;
        //OBETER TODAS LAS REALIZADAS POR EL ASPIRANTE
        this._resultados.getByUsuario(this.usuario).then(queryS => {
          let aplicacionesRealizadas = [];
          queryS.forEach((doc) => {
            let aplicacion = doc.data();
            aplicacionesRealizadas.push(aplicacion);
          });
          this.aplicacionesRealizadas = aplicacionesRealizadas;
          //FILTRAR APLICACIONES DISPONIBLES
          this.filtrarAplicacionesDisponibles();
        })

      }).catch(err => MSJ_ERROR_CONECTAR_SERVIDOR);
    } else {
      this.hasGrupo = false;
    }
  }

  ngOnInit(): void {
  }

  /************************ UTILS ***********************/
  filtrarAplicacionesDisponibles(){
    this.aplicacionesDisponibles = this.aplicaciones.filter( aplicacion => {
      for (let i = 0; i < this.aplicacionesRealizadas.length; i++) {
        if( aplicacion.id === this.aplicacionesRealizadas[i].idAplicacion )
          return;
      }
      return aplicacion;
    });
  }

  gotoAplicacion(aplicacion: Aplicacion) {
    this._swal.confirmarGenerico('¿Iniciar evaluación de ' + aplicacion.nombre + '?', 'Una vez inicies con la evaluación no podrás realizarla de nuevo.', 'Cancelar', 'Iniciar evaluación').then(accion => {
      if (accion.value) {
        this.router.navigate(['/app/evaluacion/evaluaciones/simulador'], { state: { aplicacion: JSON.stringify(aplicacion) } });
      }
    });
  }

}
