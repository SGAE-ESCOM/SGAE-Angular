import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
  @Output() singleFileDropError: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() fileLimitUploadError: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() typeFilesError: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('fileDropRef') btnGetFiles: ElementRef;
  files: any[] = [];
  readyToSend: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    if (!this.multipleFiles && $event.length > 1){
      this.singleFileDropError.emit(true);
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
      this.fileLimitUploadError.emit(true);
      return;
    }

    for(let i = 0; i < files.length; i++){
      let f = this.typeFiles.find(type => type == files[i].type);
      if(typeof f === "undefined"){
        this.typeFilesError.emit(true);
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

}
