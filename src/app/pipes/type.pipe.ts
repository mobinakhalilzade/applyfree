import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {

      case 1:
        return "University";

      case 2:
        return "College";

      case 3:
        return "ESL";
        
    }
  }
}
