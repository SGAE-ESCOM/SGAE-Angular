import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {
  
  constructor() { }

  private swalConfirmar = Swal.mixin({
    customClass: {
      confirmButton: 'mat-button mat-button-base mat-danger',
      cancelButton: 'mat-button mat-button-base mat-success'
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
      cancelButtonText: '<span class="mat-button-wrapper"> Cancelar </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper"> Sí, eliminar </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  confirmarFinalizar(titulo: string, texto?: string){
    return this.swalConfirmar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '<span class="mat-button-wrapper"> Cancelar </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper"> Sí, finalizar </span> <div class="mat-button-focus-overlay"></div>'
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

const admiracion = '<div class="swal2-icon swal2-warning swal2-icon-show" style="display: flex;"><div class="swal2-icon-content">!</div></div>';
const success = '<div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"> <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div> <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span> <div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div> <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div> </div>';