import { Pipe, PipeTransform } from '@angular/core';
import { ServiceShifts } from './service-shifts';


@Pipe({
  name: 'enumShiftToText'
})
export class EnumShiftToTextPipe implements PipeTransform {

  transform(code: ServiceShifts): any {
    if (!code && code !== 0) {
      return 'All';
    }
    return Object.values(ServiceShifts)[code];
  }

}
