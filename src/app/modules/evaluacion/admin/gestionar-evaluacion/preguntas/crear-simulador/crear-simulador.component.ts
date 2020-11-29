import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { TemasService } from '@services/evaluacion/temas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-simulador',
  templateUrl: './crear-simulador.component.html',
  styleUrls: ['./crear-simulador.component.scss']
})
export class CrearSimuladorComponent implements OnInit, OnChanges {
  
  @Input() tema: Tema;
  @Output() onCancelar: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  fgSimulador: FormGroup;
  preguntas: Pregunta[] = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder, private _swal: SweetalertService, private _preguntas:PreguntasService, private _temas:TemasService, private _toast:ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tema){
      this.getPreguntas();
    }
  }

  ngOnInit(): void {
  }

  ///////////////////////// PREGUNTA ///////////////////////////////
  cancelarPreguntas() {
    this.onCancelar.emit(true);
  }

  modalAgregarPregunta() {
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '1024px',
      data: { opc: 'agregar', pregunta: new Pregunta(), tema: this.tema}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { this.getPreguntas() }
    });
  }

  modalActualizarPregunta(pregunta: Pregunta) {
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '1024px',
      data: { opc: 'actualizar', pregunta: pregunta, tema:  this.tema }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { this.getPreguntas() }
    });
  }

  modalEliminarPregunta(pregunta: Pregunta) {
    this._swal.confirmarEliminar('¿Deseas eliminar pregunta?', 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._preguntas.delete(pregunta).then(() => {
            this.getPreguntas();
            this.tema.total--;
            this._temas.update(this.tema).then( res => res );
            this._swal.eliminadoCorrectamente();
          }).catch(err => this._toast.error(MSJ_ERROR_CONECTAR_SERVIDOR));
        }
      });
  }

  /************************** UTILS **************************/
  getPreguntas(): void {
    this._preguntas.getPreguntas(this.tema).then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push( pregunta );
      });
      this.preguntas = preguntas;
      console.table(preguntas)
    }).catch( err =>  { this._toast.error(MSJ_ERROR_CONECTAR_SERVIDOR)});
  }

  initForm() {
    this.fgSimulador = this.fb.group({});
  }
}

/******************************* MODALS COMPONENT ***********************************/
///////////////////////// PREGUNTA ///////////////////////////////
@Component({
  selector: 'modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
})
export class ModalPregunta {

  constructor(
    public dialogRef: MatDialogRef<ModalPregunta>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    if(realizado){
      this.dialogRef.close(realizado);
    }
  }

}