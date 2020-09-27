import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contractType'
})
export class ContractTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return "Free";
      case 2:
        return "Premiume"
      case 3:
        return "Agancy"
    }
  }

}
