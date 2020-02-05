import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {
  
  constructor() { }

  private swalConfirmar = Swal.mixin({
    customClass: {
      confirmButton: 'mat-button mat-button-base mat-success',
      cancelButton: 'mat-button mat-button-base mat-danger'
    },
    buttonsStyling: false
  });

  private swalFinalizar = Swal.mixin({
    customClass: {
      confirmButton: 'mat-button mat-button-base mat-info'
    },
    buttonsStyling: false
  });

  confirmarEliminar(titulo: string, texto?: string){
    return this.swalConfirmar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: '<span class="mat-button-wrapper"> Sí, eliminar </span> <div class="mat-button-focus-overlay"></div>',
      cancelButtonText: '<span class="mat-button-wrapper"> Cancelar </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  eliminadoCorrectamente(){
    this.swalFinalizar.fire({
      title: 'Eliminado',
      text: 'El elemento ha sido eliminado',
      icon: 'success'
    });
  }

}
