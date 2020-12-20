import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {
  
  constructor() { }

  private swalEliminar = Swal.mixin({
    customClass: {
      confirmButton: 'mat-button mat-button-base mat-danger',
      cancelButton: 'mat-button mat-button-base mat-success'
    },
    buttonsStyling: false
  });

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

  private swalTerminar = Swal.mixin({
    customClass: {
      confirmButton: 'mat-button mat-button-base mat-success',
    },
    buttonsStyling: false,
    allowOutsideClick: false
  });

  //IMPLEMENTACION GENERICOS
  confirmarEliminar(titulo: string, texto?: string){
    return this.swalEliminar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '<span class="mat-button-wrapper" name="btnCancelar" id="btnCancelar"> Cancelar </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar"> Sí, eliminar </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  confirmarFinalizar(titulo: string, texto?: string){
    return this.swalConfirmar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '<span class="mat-button-wrapper" name="btnCancelar" id="btnCancelar"> Cancelar </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar"> Sí, finalizar </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  confirmarTerminar(titulo: string, texto?: string, butonText?: string){
    return this.swalTerminar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      reverseButtons: true,
      confirmButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar">'+ butonText +'</span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  confirmarCancelar(titulo: string, texto?: string){
    return this.swalConfirmar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '<span class="mat-button-wrapper" name="btnCancelar" id="btnCancelar"> Cancelar </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar"> Sí, cancelar </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  confirmarGenerico(titulo: string, texto?: string, textoBotonCancelar?: string, textoBotonDo?: string ){
    return this.swalConfirmar.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '<span class="mat-button-wrapper" name="btnCancelar" id="btnCancelar">'+ textoBotonCancelar + ' </span> <div class="mat-button-focus-overlay"></div>',
      confirmButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar">'+ textoBotonDo+' </span> <div class="mat-button-focus-overlay"></div>'
    });
  }

  eliminadoCorrecto(texto?: string){
    this.swalFinalizar.fire({
      title: 'Eliminado',
      text: texto,
      icon: 'success'
    });
  }

  /*******************************************   CORREGIR *****************************************************************/
  cancelarRegistroAdmin(titulo: string){
    return this.swalEliminar.fire({
      title: titulo,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: '<span class="mat-button-wrapper" name="btnCancelar" id="btnCancelar"> Si </span> <div class="mat-button-focus-overlay"></div>',
      cancelButtonText: '<span class="mat-button-wrapper" name="btnConfiramar" id="btnConfirmar"> No </span> <div class="mat-button-focus-overlay"></div>'
      
    });
  }
  
  eliminadoCorrectamente(){
    this.swalFinalizar.fire({
      title: 'Eliminado',
      text: 'El elemento ha sido eliminado.',
      icon: 'success'
    });
  }

  aspiranteEliminadoCorrectamente(){
    this.swalFinalizar.fire({
      title: 'Eliminado',
      text: 'El aspirante ha sido eliminado.',
      icon: 'success'
    });
  }

  adminEliminadoCorrectamente(){
    this.swalFinalizar.fire({
      title: 'Eliminado',
      text: 'El usuario ha sido eliminado.',
      icon: 'success'
    });
  }

  informacionAdminActualizada(){
    this.swalFinalizar.fire({
      title: 'Actualizado',
      text: 'El administrador se actualizó exitosamente.',
      icon: 'success'
    });
  }

  errorActualizarAdmin(){
    this.swalFinalizar.fire({
      title: 'Error',
      text: 'Error al actualizar la información, intentelo mas tarde.',
      icon: 'error'
    });
  }

  adminRegistrado(){
    this.swalFinalizar.fire({
      title: 'Registrado',
      text: 'Registro finalizado exitosamente.',
      icon: 'success'
    });
  }

  errorRegistroAdmin(){
    this.swalFinalizar.fire({
      title: 'Error',
      text: 'Error al registrar al nuevo administrador, intente mas tarde.',
      icon: "error"
    });
  }

  errorAccesoRestringido(){
    return this.swalFinalizar.fire({
      title: 'Acceso Restringido',
      text: 'No tienes permisos para entrar en esta sección, consulte a un administrador del sistema.',
      icon: "warning"
    });
  }

  informacionActualizada(){
    this.swalFinalizar.fire({
      title: 'Actualizado',
      text: 'Los datos se actualizaron exitosamente.',
      icon: 'success'
    });
  }

  errorActualizar(){
    this.swalFinalizar.fire({
      title: 'Error',
      text: 'No se pudo actualizar los datos, intente mas tarde.',
      icon: "error"
    });
  }

  eliminarCuenta(){
    this.swalFinalizar.fire({
      title: 'Cuenta eliminada',
      text: 'La cuenta ha sido eliminada.',
      icon: 'success'
    });
  }
}

const admiracion = '<div class="swal2-icon swal2-warning swal2-icon-show" style="display: flex;"><div class="swal2-icon-content">!</div></div>';
const success = '<div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;"> <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div> <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span> <div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div> <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div> </div>';