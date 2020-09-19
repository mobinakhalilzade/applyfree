import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Not verify';
      case 1:
        return 'In Progress';
      case 2:
        return 'Removed';
      case 3:
        return 'Verified';
      case 4:
        return 'Done';
      default:
        break;
    }
  }

}
