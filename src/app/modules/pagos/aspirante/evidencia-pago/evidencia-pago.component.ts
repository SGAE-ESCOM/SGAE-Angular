import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { BC_EVIDENCIA_PAGO } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evidencia-pago',
  templateUrl: './evidencia-pago.component.html',
  styleUrls: ['./evidencia-pago.component.scss']
})
export class EvidenciaPagoComponent implements OnInit {



  constructor(private _toastr: ToastrService) { 
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    BreadcrumbComponent.update(BC_EVIDENCIA_PAGO);
  }

  ngOnInit(): void {
  }

  subirArchivo(files: any){
    this._toastr.success("Archivo enviado.");
  }

  singleFileDropError(){
    this._toastr.error("Arrastre solo un archivo.");
  }

  fileLimitUploadError(){
    this._toastr.error("Ya se subió un archivo.");
  }

  typeFilesError(){
    this._toastr.error("Solo se soportan archivos con extensión pdf.");
  }

}
