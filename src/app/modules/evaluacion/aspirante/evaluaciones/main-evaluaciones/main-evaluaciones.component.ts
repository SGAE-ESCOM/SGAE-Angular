import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Grupo } from '@models/evaluacion/Grupo';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { AplicacionService } from '@services/evaluacion/aplicacion.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_EVALUACIONES, GRUPOS } from '@shared/routing-list/ListLinks';
import { cardAnimation, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';

@Component({
  selector: 'app-main-evaluaciones',
  templateUrl: './main-evaluaciones.component.html',
  styleUrls: ['./main-evaluaciones.component.scss'],
  animations: [ fadeInRight(), cardAnimation() ]
})
export class MainEvaluacionesComponent implements OnInit {

  usuario: UsuarioInterface;
  grupo: Grupo;
  hasGrupo: boolean = true;
  aplicaciones: Aplicacion[] = [];
  linkInscribirGrupo = GRUPOS.url;

  constructor(private _auth:AuthService, private _aplicaciones:AplicacionService,
    private _swal: SweetalertService) {
    BreadcrumbComponent.update(BC_EVALUACIONES);
    this.usuario = _auth.getUsuarioC();
    if(this.usuario.grupo){
      this.hasGrupo = true;
      this.grupo = this.usuario.grupo;
      this._aplicaciones.getAllByGrupo(this.grupo).then((querySnapshot) => {
        let aplicaciones = [];
        querySnapshot.forEach((doc) => {
          aplicaciones.push(doc.data());
        });
        this.aplicaciones = aplicaciones;
      }).catch( err =>  MSJ_ERROR_CONECTAR_SERVIDOR );
    }else{
      this.hasGrupo = false;
    }
  }

  ngOnInit(): void {
  }

  /************************ UTILS ***********************/
  gotoAplicacion( aplicacion: Aplicacion ){
    console.log(aplicacion)
    this._swal.confirmarGenerico('¿Iniciar aplicación de '+aplicacion.nombre+'?', 'Una vez inicies con la aplicación no podrás realizarla de nuevo.', 'Cancelar', 'Iniciar aplicación').then( accion => {
      if(accion.value){
        console.log("This hacer algo")
      }
    });
  }

}
