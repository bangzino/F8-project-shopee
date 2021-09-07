import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'summary'})

export class ProductSoldPipe implements PipeTransform {
  transform(value: any): any {
    if (value > 1000) {
      value = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').slice(0,-2)
    }
    return (
      value + "k"
    );
  }
}