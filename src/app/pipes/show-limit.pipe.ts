import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'showLimit'
})
export class ShowLimitPipe implements PipeTransform {

	transform(value: any, args: number): any {
		return null;
	}

}
