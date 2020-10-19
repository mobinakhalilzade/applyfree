import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 1:
        return "English as Second Language (ESL)";
      case 2:
        return "1Year Post-Secondary Certificate";
      case 3:
        return "2-Year Undergraduate Diploma";
      case 4:
        return "3-Year Undergraduate Advanced Diploma";
      case 5:
        return "3-Year Bachelor's Degree";
      case 6:
        return "4-Year Bachelor's Degree";
      case 7:
        return "PostGraduate Certificate / Master's Degree"
    }
  }
}