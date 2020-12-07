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

  files: any[] = [];

  constructor(private _toastr: ToastrService) { 
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    BreadcrumbComponent.update(BC_EVIDENCIA_PAGO);
  }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    if ($event.length > 1){
      this._toastr.error("Arraste solo un archivo.");
      return;
    }
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
            try {
              if (this.files[index].progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1);
            } else {
              this.files[index].progress += 5;
            }
          } catch(e) {
            clearInterval(progressInterval);
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    //Validaciones para solo cargar 1 archivo a la vez
    if (this.files.length > 0){
      this._toastr.error("Archivo previamente cargado.");
      return;
    }
    if(files[0].type != 'application/pdf'){
      this._toastr.error("Solo se soportan archivos con extensión pdf.");
      return;
    }
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
