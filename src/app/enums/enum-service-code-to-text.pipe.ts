import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCodes } from './service-codes';

@Pipe({
  name: 'enumServiceCodeToText'
})
export class EnumServiceCodeToTextPipe implements PipeTransform {

  // transform(value: number, ServiceCodes: any): any {
    // return Object.values(ServiceCodes)[value];
    transform(code: ServiceCodes): any {
      if (!code && code !== 0) {
        return 'All';
      }
      return Object.values(ServiceCodes)[code];
    }
  }

