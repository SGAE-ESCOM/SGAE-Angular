import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Tabla } from '@models/utils/Tabla';
import { BC_PREGUNTAS } from '@shared/routing-list/ListLinks';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MJS_ERROR_REQUERIDO, MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/mensajes';
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  animations: [fadeInLeft(), fadeInRight()]
})
export class PreguntasComponent implements OnInit {

  //TABLA TEMAS
  tablaTemas: Tabla[] = [{ encabezado: 'Tema', json: 'tema' }, { encabezado: 'Subtema', json: 'subtema' }, { encabezado: 'Acciones', json: 'acciones' }];
  tablaPreguntas: Tabla[] = [{ encabezado: 'Enunciado', json: 'enunciado' }, { encabezado: 'Respuestas', json: 'respuestas' }, { encabezado: 'Acciones', json: 'acciones' }];

  temas: Tema[] = [
    { id: '111', tema: 'Matemáticas', subtema: ['Algebra', 'Trigonometria'] },
    { id: '222', tema: 'Español', subtema: ['Compresión Lectora', 'Reminder'] }
  ];

  preguntas: Pregunta[] = [
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', },
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', },
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', },
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', },
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', },
    { enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat.', }
  ];

  titulo: string = 'Agregando';
  isMain: boolean = true;
  isAgregando: boolean = false;

  fgTema: FormGroup;
  tema: Tema;

  //MSJ
  MJS_ERROR_REQUERIDO = MJS_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  constructor(private fb: FormBuilder) {
    BreadcrumbComponent.update(BC_PREGUNTAS);

  }

  ngOnInit(): void {
    this.initFormTema(new Tema(''));
  }


  /****************************  HTTP  ***************************/


  /****************************  ACCIONES  ***************************/
  showTema(tema?: Tema) {
    this.titulo = (tema != null) ? tema.tema : 'Agregar tema';
    this.tema = (tema != null) ? tema : new Tema('');
    this.initFormTema(this.tema);
    this.isMain = false;
  }

  /***************************** UTILS ******************************/
  initFormTema(tema: Tema) {
    console.log('init')
    this.fgTema = this.fb.group({
      tema: [tema.tema, [Validators.required, Validators.pattern(REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION)]]
    })
  }
}
