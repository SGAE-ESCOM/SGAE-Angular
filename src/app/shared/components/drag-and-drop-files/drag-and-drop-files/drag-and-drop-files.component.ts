import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';

@Component({
  selector: 'app-drag-and-drop-files',
  templateUrl: './drag-and-drop-files.component.html',
  styleUrls: ['./drag-and-drop-files.component.scss']
})
export class DragAndDropFilesComponent implements OnInit {

  @Input() multipleFiles: boolean = false;
  @Input() typeFiles: string[] = [];
  @Input() titleBox: string = '';

  @Output() sendFiles: EventEmitter<any> = new EventEmitter<any>();
  @Output() componentError: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('fileDropRef') btnGetFiles: ElementRef;
  files: any[] = [];
  readyToSend: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    if (!this.multipleFiles && $event.length > 1){
      this.componentError.emit("Arrastre solo un archivo.");
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
    if(this.files.length == 0)
      this.readyToSend = false;
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
                //archivo cargado
                clearInterval(progressInterval);
                this.uploadFilesSimulator(index + 1);
                this.readyToSend = true;
              } else {
                this.files[index].progress += 5;
              }
            } catch(e) {
              //carga de archivo interrumpida
              if(this.files.length == 0)
                this.readyToSend = false;
              clearInterval(progressInterval);
            }
        }, 50);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    //Validaciones para solo cargar 1 archivo a la vez
    if (!this.multipleFiles && this.files.length > 0){
      this.componentError.emit("Ya se subió un archivo.");
      return;
    }
    for(let i = 0; i < files.length; i++){
      //SIZE LIMIT
      if(files[i].size >= 1048576){
        this.componentError.emit("El archivo es demasiado pesado.");
        console.log("limite tamaño");
        return;
      }
    }

    for(let i = 0; i < files.length; i++){
      let f = this.typeFiles.find(type => type == files[i].type);
      if(typeof f === "undefined"){
        this.componentError.emit("Formato de archivo incorrecto.");
        return;
      }
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

  submitFiles(){
    this.sendFiles.emit(this.files);
  }

  clearValue(){
    //Validacion para cargar el mismo elemento antes eliminado
    this.btnGetFiles.nativeElement.value = null;
  }



  abrirArchivo(file: File){
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      let data = {
        archivo : reader.result.toString(),
        nombre: file.name
      }

      const dialogRef = this.dialog.open(ModalVerDocumento, {
        width: '1000px',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {});

    };

    reader.onerror = (error) => {
      this.componentError.emit("Ocurrio un error al cargar el archivo.");
    };


  }
}

@Component({
  selector: 'modal-editar',
  templateUrl: './modal-documento.component.html',
})
export class ModalVerDocumento {

  constructor(
    public dialogRef: MatDialogRef<ModalVerDocumento>,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}