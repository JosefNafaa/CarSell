import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharUpperCase'
})
export class FirstCharUpperCasePipe implements PipeTransform {

  transform(value: string): string {
    const firstCharUpperCase=value.charAt(0).toUpperCase();
    const subSTr=value.substring(1);
    return firstCharUpperCase+subSTr;
  }

}
