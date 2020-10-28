import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './../models/Contact.class';

@Injectable({
	providedIn: 'root'
})
export class ContactService {

	public API_create: string = 'http://localhost:8080/api/contacts/create';
	constructor(public http: HttpClient) { }

	addMessageQuestion(contact: Contact): Observable<Contact> {
		return this.http.post<Contact>(this.API_create, contact);
	}

	handleError(err) {
		if (err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}

	}
}
