import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-etapas',
  templateUrl: './main-etapas.component.html',
  styleUrls: ['./main-etapas.component.scss']
})
export class MainEtapasComponent implements OnInit {

  isLinear = true;
  fgEtapaUsar: FormGroup;
  fgEtapasFechas: FormGroup;

  etapasDisponibles = [
    'Documentación',
    'Evaluación',
    'Convocatoria',
    'Pagos'
  ];

  etapas = [
    'Documentación',
    'Evaluación',
    'Convocatoria',
    'Pagos'
  ];


  constructor(private _fb: FormBuilder) {
    BreadcrumbComponent.update(BC_ETAPAS);

    this.fgEtapaUsar = this._fb.group({
      etapas: ['', Validators.required]
    });
    this.fgEtapasFechas = this._fb.group({
      
    });
  }

  ngOnInit() {
    
  }

  definirEtapas(){
    this.etapas = this.fgEtapaUsar.get('etapas').value;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
    this.etapas = this.etapas;
  }

}
