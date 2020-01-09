import { Pipe, PipeTransform } from '@angular/core';
import { OPC_ARCHIVO } from '@models/documentacion/enums/enum-tipo-archivo.enum';
import { OPC_CAMPO } from '@models/documentacion/enums/enum-tipo-campo.enum';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(tipo: any): any {
    switch (tipo) {
      case OPC_CAMPO.TEXTO: {
          return 'text';
      }
      case OPC_CAMPO.NUMERO: {
        return 'number';
    }
      case OPC_ARCHIVO.IMAGEN: {
        return 'file';
      }
      case OPC_ARCHIVO.PDF : {
        return 'file';
      }
      default: {
        return tipo;
      }
    }
  }
}
