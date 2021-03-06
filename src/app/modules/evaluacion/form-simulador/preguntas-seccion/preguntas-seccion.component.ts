import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { SeccionesService } from '@services/evaluacion/secciones.service';

@Component({
  selector: 'app-preguntas-seccion',
  templateUrl: './preguntas-seccion.component.html',
  styleUrls: ['./preguntas-seccion.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreguntasSeccionComponent),
      multi: true
    }
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreguntasSeccionComponent implements OnChanges, ControlValueAccessor {

  @Input() idSeccion: string;
  @Input() temas: Tema[];
  seccion: Seccion;
  preguntas: Pregunta[] = [];
  respuestas: any[];
  aciertos: number[] = [];

  //RENDERING
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('item', { read: TemplateRef }) template: TemplateRef<any>;

  @ViewChild('', { read: ViewContainerRef }) opcionesContainer: ViewContainerRef[];
  @ViewChild('', { read: TemplateRef }) opcionTemplate: TemplateRef<any>[];
  
  //CONTROL VALUE
  value: any = { seccion: '', aciertos: 0, total: 0 };
  isDisabled: boolean;
  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(private _secciones: SeccionesService, private _preguntas: PreguntasService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idSeccion && this.idSeccion != null) {
      this._secciones.getById(this.idSeccion).subscribe((doc: any) => {
        if (doc.exists) {
          this.seccion = doc.data();
          this.value.seccion = this.seccion.nombre;
          this.onChange(this.value);
        } else {
          console.log(this.idSeccion);
        }
      });
    }
    if (changes.temas && this.temas != null) {
      this.temas.forEach(tema => {
        this.getPreguntas(tema);
      });
    }
  }

  /************************* OVERRIDE *******************/
  writeValue(value: any): void {
    if (value) {
      //this.value = value || [];
      this.value = { seccion: '', aciertos: 0, total: 0 };
    } else {
      this.value = { seccion: '', aciertos: 0, total: 0 };
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /******************************************** HTTP *************************************/
  async getPreguntas(tema: Tema) {
    await this._preguntas.getPreguntas(tema).then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push(pregunta);
      });
      this.preguntas = this.preguntas.concat(preguntas);
      this.respuestas = new Array(this.preguntas.length).fill(-1);
      this.aciertos = new Array(this.preguntas.length).fill(0);
      this.value.total = this.preguntas.length;
      this.buildData(this.preguntas.length);
      this.onChange(this.value);
    }).catch(err => {
      console.error(err);
      //this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)
    });
  }

  /******************************************** UTILS *************************************/
  changeValue(opcion, i: number, j: number) {
    this.respuestas[i] = opcion.id;
    this.aciertos[i] = this.preguntas[i].respuesta == opcion.id ? 1 : 0;
    this.calcularAciertos();
    this.onChange(this.value);
  }

  calcularAciertos() {
    this.value.aciertos = this.aciertos.reduce((prev, current) => {
      return prev + current;
    }, 0);
  }

  trackByIdPregunta(index: number, item: Pregunta) {
    return item.id
  }

  trackByIdOpcion(index: number, item: any) {
    return item.id
  }

  private buildData(length: number) {
    const end = this.preguntas.length;
    if(this.preguntas){
      this.container.clear();
      for (let n = 0; n < end; n++) {
        this.container.createEmbeddedView(this.template, {
          item: this.preguntas[n],
          index: n
        });
      }
    }
  }

}
