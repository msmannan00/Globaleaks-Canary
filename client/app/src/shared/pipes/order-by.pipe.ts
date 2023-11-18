import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string | string[], reverse: boolean = false): any[] {
    if (!Array.isArray(value) || !propertyName) {
      return value;
    }

    let propertyNames = typeof propertyName === 'string' ? [propertyName] : propertyName;

    return value.sort((a, b) => {
      for (let prop of propertyNames) {
        const valA = typeof a[prop] === 'string' ? a[prop].toLowerCase() : a[prop];
        const valB = typeof b[prop] === 'string' ? b[prop].toLowerCase() : b[prop];

        if (valA < valB) {
          return reverse ? 1 : -1;
        }
        if (valA > valB) {
          return reverse ? -1 : 1;
        }
      }
      return 0;
    });
  }
}
