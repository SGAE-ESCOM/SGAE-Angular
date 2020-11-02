import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';

@Component({
  selector: 'app-main-simulador',
  templateUrl: './main-simulador.component.html',
  styleUrls: ['./main-simulador.component.scss']
})
export class MainSimuladorComponent implements OnInit, OnChanges {

  fgSimulador: FormGroup;

  @Input() preguntas: Pregunta[];

  constructor(private fb:FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.preguntas && this.preguntas != null ){
      console.log("HOLA")
    }
  }

  ngOnInit(): void {
  }
  
  /************************** UTILS **************************/
  initForm(){
    this.fgSimulador = this.fb.group({});
  }
}
