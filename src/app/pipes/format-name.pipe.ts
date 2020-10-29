import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    return value.substr(args[0],args[1]) + '...';
  }

}
