import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform(value: boolean): string {
    switch (value) {
      case true:
        return "Yes";
      default:
        return "No";
    }
  }

}
