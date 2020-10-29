import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Subscription } from 'rxjs';
import { Book } from './../../models/Book.class';

@Component({
	selector: 'app-one-content-r',
	templateUrl: './one-content-r.component.html',
	styleUrls: ['./one-content-r.component.css']
})
export class OneContentRComponent implements OnInit, OnDestroy {

	public slidingbox: Array<Book> = [];
	public Subscription: Subscription;

	constructor(public BookService: BookService) { }

	ngOnInit(): void {
		this.loadSlidingBox();
	}

	loadSlidingBox() {
		this.Subscription = this.BookService.getAllBook().subscribe(data => {
			let arrayRandomUnique = this.uniqueRandoms(6,0,data.length);
			for (var i = arrayRandomUnique.length - 1; i >= 0; i--) {
				if (data.length) {
					this.slidingbox.push(data[arrayRandomUnique[i]]);
				}	
			}
		}, error => {
			this.BookService.handleError(error);
		});
	}

	uniqueRandoms(qty, min, max) {
		var rnd, arr = [];
		do {
			do { rnd = Math.floor(Math.random() * max) + min }
			while (arr.includes(rnd))
			arr.push(rnd);
		} while (arr.length < qty)
		return arr;
	}
	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
