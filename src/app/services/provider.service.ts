import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from './../models/Provider.class';

@Injectable({
	providedIn: 'root'
})
export class ProviderService {

	public API:string = 'http://localhost:8080/api/providers';
	constructor(
		public http:HttpClient
	) { }

	getAllProvider(): Observable<Provider[]> {
		// trong angular 5+
		return this.http.get<Provider[]>(this.API);
	}

	handleError(err){
		if(err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}
	}
}
