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

  constructor(private fb: FormBuilder, private _secciones: SeccionesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.evaluacion && this.evaluacion != null) {
      console.log("=================")
      this.initForm();
      this.getCatalogo();
    }

  }

  ngOnInit(): void {
  }

  /**************************************** HTPP REST **********************************/
  async getCatalogo() {
    await this.getSecciones();
  }

  async getSecciones() {
    this._secciones.get().subscribe(secciones => { this.secciones = secciones; this.ordenarPreguntas() }, error => { console.error(error) });
  }

  /**************************************** UTILS **********************************/
  ordenarPreguntas() {
    console.log(this.secciones);
    console.table(this.evaluacion.temas);
    const preguntasSeccion = this.groupByProperty(this.evaluacion.temas, "idSeccion");
    console.log(preguntasSeccion);
    Object.entries(preguntasSeccion).forEach( ( [ id, preguntas ]:any ) => {
      console.log(id);
      console.log(preguntas);
      for (let i = 0; i < this.secciones.length; i++) {
        if(this.secciones[i].id === id ){
          this.secciones[i].preguntas = preguntas;
          break;
        }
      }
    });
    console.log(this.secciones);
  }

  initForm() {
    this.fgSimulador = this.fb.group({});
  }

  groupByProperty(list: any[], propertyGroup: string): any {
    return list.reduce((prevSecciones, temaActual:Tema) => {
      let key = temaActual[propertyGroup];
      if (!prevSecciones[key])
        prevSecciones[key] = [];
      prevSecciones[key] = prevSecciones[key].concat( JSON.parse( JSON.stringify( temaActual.preguntas) ) );
      return prevSecciones;
    }, {});
  }
}