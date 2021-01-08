import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Breadcrumb } from '@models/template/Breadcrumb';
import { NavigationLink } from '@models/template/NavigationLink';
import { AuthService } from '@services/auth.service';
import { AdminEvaluacionesService } from '@services/evaluacion/admin-evaluaciones.service';
import { EVALUACION, EVALUACIONES, HOME } from '@shared/routing-list/ListLinks';

//1. Obtener la evaluación
//2. Hacer un random entre las evaluaciones disponibles
//3. Evaluar si //Ya hizo esa evaluacion, //Es el dia
//4. Llevar el control de los parametros
//5. Cerar el form-simulador

@Component({
  selector: 'app-main-simulador',
  templateUrl: './main-simulador.component.html',
  styleUrls: ['./main-simulador.component.scss']
})
export class MainSimuladorComponent implements OnInit {

  private SIMULADOR: NavigationLink;
  private BC_SIMULADOR: Breadcrumb;
  private usuario: any;
  aplicacion: Aplicacion;
  evaluacion: Evaluacion;
  preguntas: Pregunta[] = [];
  //totalIteraciones: number;

  constructor(private router: Router,
    private _auth: AuthService, private _evaluaciones:AdminEvaluacionesService) {
    //OBTENER USUARIO Y APLICACION
    this.usuario = this._auth.getUsuarioC();
    const navigation = this.router.getCurrentNavigation();
    //VALIDAR URL DEL PARAMETRO
    if (navigation.extras.state) {
      //OBTENER LA APLICACION
      this.aplicacion = JSON.parse(navigation.extras.state.aplicacion);
      //DEFINIR EL BREADCRUMB
      this.SIMULADOR = new NavigationLink(this.aplicacion.nombre, "/app/evaluacion/evaluaciones/simulador", "spellcheck", "");
      this.BC_SIMULADOR = new Breadcrumb(this.SIMULADOR, [HOME, EVALUACION, EVALUACIONES]);
      BreadcrumbComponent.update(this.BC_SIMULADOR);
      //INICIAR LA BUSQUEDA DE SECCIONES
      this.init();
    } else {
      this.redireccionarEvaluaciones(true)
    }
  }

  ngOnInit(): void {

  }

  /*************************************** HTTP REST *******************************************/
  async init() {
    //Define la evaluacion a través de un random 
    let indexRandom = this.getRandomInt(0, this.aplicacion.evaluaciones.length)
    this.evaluacion = null;
    this._evaluaciones.get(this.aplicacion.evaluaciones[indexRandom].id).subscribe( evaluacion => {
      this.evaluacion = evaluacion;
    });
  }

  /*************************************** UTILS *******************************************/
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  redireccionarEvaluaciones(accion:Boolean){
    if(accion)
      this.router.navigate([EVALUACIONES.url]);
  }
}
