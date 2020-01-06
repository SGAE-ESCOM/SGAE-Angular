import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BooleanPipePipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? 'Si':'No';
  }

}
