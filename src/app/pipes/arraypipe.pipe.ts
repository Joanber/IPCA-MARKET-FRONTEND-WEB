import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraypipe'
})
export class ArraypipePipe implements PipeTransform {

  transform(array: any, ...args: any[]): any {
    if(array !==null && array.length>0){
      const key =args[0];
     return array.map((item) => item[key])
   }
   return null;
  }

}
