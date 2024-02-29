import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutletName',
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value + 'HI THERE';
  }
}
