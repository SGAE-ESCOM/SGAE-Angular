import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { SeccionesService } from '@services/evaluacion/secciones.service';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';

@Component({
  selector: 'app-preguntas-seccion',
  templateUrl: './preguntas-seccion.component.html',
  styleUrls: ['./preguntas-seccion.component.scss']
})
export class PreguntasSeccionComponent implements OnChanges {
  
  @Input() idSeccion:string;
  @Input() temas:Tema[];
  seccion:Seccion;
  preguntas: Pregunta[] = [];
  respuestas: any[];
  aciertos: number = 0;

  constructor( private _secciones: SeccionesService, private _preguntas:PreguntasService ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.idSeccion && this.idSeccion != null ){
      this._secciones.getById(this.idSeccion).subscribe( (doc:any) => {
        if(doc.exists)
          this.seccion = doc.data();
      });
    }
    if(changes.temas && this.temas != null ){
      this.temas.forEach( tema => {
        this.getPreguntas(tema);
      });
    }
  }

  /******************************************** HTTP *************************************/
  async getPreguntas(tema: Tema) {
    await this._preguntas.getPreguntas(tema).then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push( pregunta );
      });
      this.preguntas = this.preguntas.concat(preguntas);
      this.respuestas = new Array(this.preguntas.length).fill(-1);
    }).catch( err =>  { 
      console.error(err);
      //this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR)
    });
  }

  /******************************************** HTTP *************************************/
  changeValue(opcion, i:number, j:number){
    console.log(opcion);
    console.log(this.preguntas[i]);
    console.log(this.preguntas[i].opciones[j]);
    this.respuestas[i] = opcion.id;
    if(this.respuestas[i] == this.preguntas[i].respuesta)
      this.aciertos++;
    else if( this.aciertos > 0 )
      this.aciertos--;
  }
}
