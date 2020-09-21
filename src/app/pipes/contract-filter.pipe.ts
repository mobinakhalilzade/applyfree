import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contractFilter'
})
export class ContractFilterPipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 1:
        return 'Student';
      case 2:
        return 'School';
      case 3:
        return 'Translators';
      case 4:
        return 'Tutors';
      case 5:
        return 'Recruiters';
      case 6:
        return 'Parents';
    }
  }

}
