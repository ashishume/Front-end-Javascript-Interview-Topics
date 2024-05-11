import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'custom',
})
export class UppercasePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value.toUpperCase();
  }
}