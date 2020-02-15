import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETAPAS } from '@models/etapas/etapa.enum';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarData } from '@shared/components/calendario/interfaces/calendar-data';

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
  dataSource: CalendarData[];
  etapas = [];

  constructor(private _fb: FormBuilder, private _toast: ToastrService, private _swal: SweetalertService) {
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
      nombre: [etapa.valor]
    })));
    
  }

  // HTTPS
  saveEtapas(){
    this._swal.confirmarFinalizar('¿Deseas definir las etapas?');
  }

  definirEtapas() {
    this.etapas = this.fgEtapaUsar.get('etapas').value;
    this.definirFechas();
  }

  saveFechas(){
    //if(this.fgEtapasFechas.valid ){
      this.dataSource = Object.entries(this.fgEtapasFechas.value).map( ([atributo, valor]:any, index) => {
        return {
          id: index,
          name: valor.nombre,
          startDate: valor.fechaInicio,
          endDate: valor.fechaTermino,
          color: 'info'
        }
      });
      console.log(this.dataSource);
    /*}else{
      this._toast.error("Invalido", "Llena todos los elementos requeridos")
    }*/
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
    this.etapas = this.etapas;
  }

}
