import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 1:
        return 'Poniedziałek';
      case 2:
        return 'Wtorek';
      case 3:
        return 'Środa';
      case 4:
        return 'Czwartek';
      case 5:
        return 'Piątek';
      case 6:
        return 'Sobota';
      case 7:
        return 'Niedziela';
      }
  }

}
