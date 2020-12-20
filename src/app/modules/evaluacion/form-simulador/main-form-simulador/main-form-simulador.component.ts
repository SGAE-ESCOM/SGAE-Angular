import { Component, Input, OnChanges, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Aplicacion } from '@models/evaluacion/aplicacion';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Resultado } from '@models/evaluacion/resultado';
import { AuthService } from '@services/auth.service';
import { ResultadosService } from '@services/evaluacion/resultados.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { MSJ_ERROR_CONECTAR_SERVIDOR, MSJ_OK_AGREGADO } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-simulador',
  templateUrl: './main-form-simulador.component.html',
  styleUrls: ['./main-form-simulador.component.scss']
})
export class MainFormSimuladorComponent implements OnInit, OnChanges {

  fgSimulador: FormGroup;

  @Input() preguntas: Pregunta[];
  @Input() evaluacion: Evaluacion;
  @Input() aplicacion: Aplicacion;
  @Input() totalIteraciones: number = 0;
  @Output() finalizar: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  secciones: Seccion[];
  respuestasSeccion: number[] = [];
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 59;
  interval;


  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _swal: SweetalertService,
    private _auth: AuthService, private _resultados: ResultadosService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.evaluacion && this.evaluacion != null) {
      this.secciones = this.groupByProperty(this.evaluacion.temas);
      this.respuestasSeccion = new Array(this.secciones.length).fill({});
      this.init();
    }
    if (changes.aplicacion && this.aplicacion != null) {
      this.startTimer();
    }
  }

  ngOnInit(): void {
  }

  /**************************************** HTPP REST **********************************/
  private finalizarSimulador() {
    let aciertos = Object.entries(this.fgSimulador.value).map(([id, aciertosSeccion]: any) => {
      return { seccion: aciertosSeccion.seccion, aciertos: aciertosSeccion.aciertos };
    });
    let resultado: Resultado = {
      idUsuario: this._auth.getUsuarioC().id,
      idAplicacion: this.aplicacion.id,
      nombre: this.aplicacion.nombre,
      fecha: new Date(),
      aciertos: aciertos,
    }
    this._resultados.save(resultado).then(result => {
      this.finalizar.emit(true);
      this._toastr.success(MSJ_OK_AGREGADO);
    }, err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
  }

  /**************************************** ACCIONS **********************************/
  onFinalizar() {
    this._swal.confirmarFinalizar('¿Finalizar evaluación?').then(result => {
      if (result.value) {
        this.finalizarSimulador();
      }
    })
  }

  /**************************************** UTILS **************************************/
  async init() {
    await this.initForm();
  }

  async initForm() {
    this.fgSimulador = this.fb.group({});
    console.log(this.secciones)
    this.secciones.forEach(([id, seccion]: any) => {
      this.fgSimulador.addControl(id, new FormControl(0));
    });
  }

  groupByProperty(list: any[]): any {
    let seccionesAux = list.reduce((prevSecciones, temaActual: Tema) => {
      let key = temaActual["idSeccion"];
      if (!prevSecciones[key])
        prevSecciones[key] = [];
      prevSecciones[key].push(temaActual);
      return prevSecciones;
    }, {});
    return Object.entries(seccionesAux);
  }

  //Timer
  async startTimer() {
    let time = this.aplicacion.duracion.split(':');
    this.horas = Number(time[0]);
    this.minutos = Number(time[1]);
    //LOGICA PARA EL DESCENSO
    this.interval = setInterval(() => {
      if (this.segundos > 0) {
        this.segundos--;
      } else {
        if (this.minutos > 0) {
          this.segundos = 59;
          this.minutos--;
        } else {
          if (this.horas > 0) {
            this.minutos = 59;
            this.horas--;
          } else {
            clearInterval(this.interval);
            this._swal.confirmarTerminar('Se acabo el tiempo', 'El tiempo de la evaluación ha terminado, aún así se enviaran las respuestas que lograste contestar', 'Terminar evaluación').then(result => {
              if (result) {
                this.finalizarSimulador();
              }
            })
          }
        }
      }
    //}, 10)
    },1000)
  }
}