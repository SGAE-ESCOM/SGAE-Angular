import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETAPAS } from '@models/etapas/etapa.enum';


@Component({
  selector: 'app-main-etapas',
  templateUrl: './main-etapas.component.html',
  styleUrls: ['./main-etapas.component.scss']
})
export class MainEtapasComponent implements OnInit {

  isLinear = true;
  fgEtapaUsar: FormGroup;
  fgEtapasFechas: FormGroup;

  etapasDisponibles = ETAPAS;
  fechaActual = new Date();

  etapas = [];

  constructor(private _fb: FormBuilder) {
    BreadcrumbComponent.update(BC_ETAPAS);
    this.fgEtapaUsar = this._fb.group({
      etapas: ['', Validators.required],
    });
    this.fgEtapasFechas = this._fb.group({});
  }

  ngOnInit() {
    console.log(this.fechaActual);
  }

  definirFechas(){
    this.fgEtapasFechas = new FormGroup({});
    this.etapas.forEach(etapa => this.fgEtapasFechas.addControl( etapa.valor, this._fb.group({
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      lugar: ['']
    })));

    /*this.etapas.forEach(etapa => {
      this.fgEtapasFechas.get(etapa.valor).get('fechaTermino').
    });*/
    
  }

  definirEtapas() {
    this.etapas = this.fgEtapaUsar.get('etapas').value;
    this.definirFechas();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
    this.etapas = this.etapas;
  }

}
