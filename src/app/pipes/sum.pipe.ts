import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sum'
})
export class SumPipe implements PipeTransform {

    transform(items: any[], attr: string): any {
    	let allpriceBuy : number = 0;
    	for (var i = items.length - 1; i >= 0; i--) {
    		if (items[i]["iduser"] == sessionStorage.getItem("iduser")) {
    			allpriceBuy += items[i][attr];
    		}
    	}
    	return allpriceBuy;
        // return items.reduce((a, b) => a + b[attr], 0);
    }
}
