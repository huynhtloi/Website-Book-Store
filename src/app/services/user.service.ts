import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../models/User.class';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public API_user: string = 'http://localhost:8080/api/users/username/';
	public API_create: string = 'http://localhost:8080/api/users/create';
	public API_update: string = 'http://localhost:8080/api/users/';
	constructor(public http: HttpClient) { }

	getByUsername(username): Observable<User> {
		// trong angular 5+
		return this.http.get<User>(this.API_user + username);
	}

	createAccount(user: User): Observable<User> {
		return this.http.post<User>(this.API_create, user);
	}

	editAccount(user: User, id: string): Observable<User> {
		return this.http.put<User>(this.API_update + id, user);
	}

	handleError(err) {
		if (err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem('username');
		return !(user === null);
	}

	logout() {
		sessionStorage.removeItem('username');
		sessionStorage.removeItem('iduser');
	}
}
