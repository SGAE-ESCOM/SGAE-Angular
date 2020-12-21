import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Resultado } from '@models/evaluacion/resultado';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { ResultadosService } from '@services/evaluacion/resultados.service';
import { BC_RESULTADOS } from '@shared/routing-list/ListLinks';
import { cardAnimation, fadeInRight } from '@shared/utils/animations/router.animations';
import { momentJS } from '@shared/utils/traduccion/moment';

@Component({
  selector: 'app-main-resultados',
  templateUrl: './main-resultados.component.html',
  styleUrls: ['./main-resultados.component.scss'],
  animations: [fadeInRight(), cardAnimation()]
})
export class MainResultadosComponent implements OnInit {

  usuario: UsuarioInterface;
  aplicacionesRealizadas: Resultado[] = [];

  constructor(public dialog: MatDialog, private _auth: AuthService, private _resultados: ResultadosService) {
    this.usuario = _auth.getUsuarioC();
    BreadcrumbComponent.update(BC_RESULTADOS);
  }

  ngOnInit(): void {
    this.getResultados();
  }

  /************************************* HTTP REST *************************************/
  getResultados() {
    //OBETER TODAS LAS REALIZADAS POR EL ASPIRANTE
    this._resultados.getByUsuario(this.usuario).then(queryS => {
      let aplicacionesRealizadas = [];
      queryS.forEach((doc) => {
        let aplicacion = doc.data();
        console.log(aplicacion.fecha)
        aplicacion.fechaFormated = momentJS(aplicacion.fecha).format('Do/MM/YYYY');
        aplicacion.aciertosTotales = aplicacion.aciertos.reduce( (prev, current ) => { return current.aciertos + prev }, 0 );
        aplicacionesRealizadas.push(aplicacion);
      });
      this.aplicacionesRealizadas = aplicacionesRealizadas;
    });
  }

  /************************************* MODALS *************************************/
  mostrarResultado(resultado: Resultado) {
    const dialogRef = this.dialog.open(ModalResultado, {
      width: '600px',
      data: resultado
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        /* this._ads.updateDocumento(documento.id, result).then(data =>
          this.toast.info("El requisito se actualizó exitosamente")
        ).catch(error => this.toast.error(error)) */
      }
    });
  }
}

/******************************* MODALS ***********************************/
@Component({
  selector: 'modal-resultado',
  templateUrl: './modal-resultado.component.html',
})
export class ModalResultado {

  constructor(
    public dialogRef: MatDialogRef<ModalResultado>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}