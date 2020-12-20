import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Evaluacion } from '@models/evaluacion/evaluacion';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { SeccionesService } from '@services/evaluacion/secciones.service';

@Component({
  selector: 'app-form-simulador',
  templateUrl: './main-form-simulador.component.html',
  styleUrls: ['./main-form-simulador.component.scss']
})
export class MainFormSimuladorComponent implements OnInit, OnChanges {

  fgSimulador: FormGroup;

  @Input() preguntas: Pregunta[];
  @Input() evaluacion: Evaluacion;
  @Input() totalIteraciones: number = 0;
  private iteracion = 0;
  secciones: Seccion[];
  respuestasSeccion: number[] = [];

  constructor(private fb: FormBuilder, private _secciones: SeccionesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.evaluacion && this.evaluacion != null) {
      console.log("*********************************************************************************************************************************************")
      this.initForm();
      this.secciones = this.groupByProperty(this.evaluacion.temas);
      this.respuestasSeccion = new Array(this.secciones.length).fill(1);
      console.log("*********************************************************************************************************************************************")
    }

  }

  ngOnInit(): void {
  }

  /**************************************** HTPP REST **********************************/
  finalizar(){
    
  }

  /**************************************** UTILS **************************************/

  initForm() {
    this.fgSimulador = this.fb.group({});
  }

  groupByProperty(list: any[]): any {
    let seccionesAux = list.reduce((prevSecciones, temaActual:Tema) => {
      let key = temaActual["idSeccion"];
      if (!prevSecciones[key])
        prevSecciones[key] = [];
      prevSecciones[key].push(temaActual);
      return prevSecciones;
    }, {});
    return Object.entries(seccionesAux);
  }

}