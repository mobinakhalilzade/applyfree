import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any): string {
    const x = parseInt(value);
    switch (x) {
      case 1:
        return "Private, College";
      case 2:
        return "Public, College";
      case 3:
        return "Public, University";
      case 4:
        return "Private, University";
    }
  }
}
