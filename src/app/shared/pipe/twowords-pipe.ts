import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twowords'
})
export class TwowordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.split(' ').slice(0, 2).join(' ');
  }

}
