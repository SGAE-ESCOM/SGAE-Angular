import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { BC_ETAPAS } from "@routing/ListLinks";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETAPAS } from '@models/etapas/etapa.enum';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarData } from '@shared/components/calendario/interfaces/calendar-data';
import { fadeInOutDown } from '@shared/animations/router.animations';

@Component({
  selector: 'app-main-etapas',
  templateUrl: './main-etapas.component.html',
  styleUrls: ['./main-etapas.component.scss'],
  animations: [fadeInOutDown()]
})
export class MainEtapasComponent implements OnInit {

  //Variables de logica de Frontend
  isLinear = true;
  isTerminadoStepper = false;

  //Formularios
  fgEtapaUsar: FormGroup;
  fgEtapasFechas: FormGroup;
  
  fechaActual = new Date();
  dataSource: CalendarData[];
  
  etapasDisponibles = ETAPAS;
  etapas = [];
  colores = [{nombre: 'Verde', valor: 'success' }, {nombre: 'Azul', valor: 'info' }, {nombre: 'Amarillo', valor: 'warning' }, {nombre: 'Rojo', valor: 'danger' }, {nombre: 'Azul', valor: 'primary' },];

  constructor(private _fb: FormBuilder, private _toast: ToastrService, private _swal: SweetalertService) {
    BreadcrumbComponent.update(BC_ETAPAS);
    this.fgEtapaUsar = this._fb.group({
      etapas: ['', Validators.required],
    });
    this.fgEtapasFechas = this._fb.group({});
  }

  ngOnInit() {
  }

  definirFechas(){
    this.fgEtapasFechas = new FormGroup({});
    this.etapas.forEach( (etapa, index) => this.fgEtapasFechas.addControl( etapa.valor, this._fb.group({
      nombre: [etapa.nombre],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      color: [ this.colores[index].valor, Validators.required],
    })));  
  }

  finalizarStepper(){
    this.isTerminadoStepper = true;
    //this._swal.confirmarFinalizar('¿Deseas definir las etapas?');
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
          startDate: new Date(valor.fechaInicio),
          endDate: new Date(valor.fechaTermino),
          color: valor.color
        }
      });
      console.log("===============>")
      console.table(this.fgEtapasFechas.value);
      console.table(this.dataSource);

    /*}else{
      this._toast.error("Invalido", "Llena todos los elementos requeridos")
    }*/
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.etapas, event.previousIndex, event.currentIndex);
    this.etapas = this.etapas;
  }

}
