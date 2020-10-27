import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from './../models/Cart.class';

@Injectable({
	providedIn: 'root'
})
export class CartService {


	public API_create: string = 'http://localhost:8080/api/carts/create';
	public API: string = 'http://localhost:8080/api/carts';
	public API_amount: string = 'http://localhost:8080/api/carts/amount/';
	public API_update: string = 'http://localhost:8080/api/carts/';
	public API_deletebyid: string = 'http://localhost:8080/api/carts/';
	public API_delete: string = 'http://localhost:8080/api/carts/delete';
	public API_deletebyiduser: string = 'http://localhost:8080/api/carts/iduser/';
	constructor(
		public http: HttpClient
	) { }

	addBookToCart(cart: Cart): Observable<Cart> {
		return this.http.post<Cart>(this.API_create, cart);
	}

	loadAllCart(): Observable<Cart[]> {
		return this.http.get<Cart[]>(this.API);
	}

	loadByAmount(amount): Observable<Cart[]> {
		return this.http.get<Cart[]>(this.API_amount + amount);
	}
	// cập nhật data cart từ db
	updateById(cart: Cart, id: string): Observable<Cart> {
		return this.http.put<Cart>(this.API_update + id, cart);
	}
	deleteCartById(id: string): Observable<Cart> {
		return this.http.delete<Cart>(this.API_deletebyid + id);
	}
	deleteAllCart(): Observable<Cart> {
		return this.http.delete<Cart>(this.API_delete);
	}
	deleteByIduser(id: string): Observable<Cart> {
		return this.http.delete<Cart>(this.API_deletebyiduser + id);
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