import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';


@Component({
  selector: 'app-form-simulador',
  templateUrl: './main-form-simulador.component.html',
  styleUrls: ['./main-form-simulador.component.scss']
})
export class MainFormSimuladorComponent implements OnInit, OnChanges {

  fgSimulador: FormGroup;

  @Input() preguntas: Pregunta[];

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.preguntas && this.preguntas != null) {
      console.log("HOLAAA")
      this.initForm();
    }
  }

  ngOnInit(): void {
  }

  /************************** UTILS **************************/
  initForm() {
    this.fgSimulador = this.fb.group({});
  }
  
}