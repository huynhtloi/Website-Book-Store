import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../../../models/Book.class';
import { BookService } from './../../../../services/book.service';

import { Publisher } from './../../../../models/Publisher.class';
import { PublisherService } from './../../../../services/publisher.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

	public Subscription: Subscription;
	public myBooks = [];
	constructor(
		public BookService: BookService,
		public PublisherService: PublisherService
	) { }

	ngOnInit(): void {
		this.getMyBook();
	}

	getMyBook() {
		let idsuser = sessionStorage.getItem("iduser");
		this.Subscription = forkJoin([
			this.BookService.getBookByProvider(idsuser),
			this.PublisherService.getAllPublisher()]).subscribe(data => {
				for (var j = data[0].length - 1; j >= 0; j--) {
					for (var i = data[1].length - 1; i >= 0; i--) {
						if (data[1][i]["id"] == data[0][j]["publisher"]) {
							this.myBooks.push({
								id: data[0][j]["id"],
								name: data[0][j]["name"],
								img: data[0][j]["img"],
								publisher: data[1][i]["name"],
								sku : data[0][j]["sku"],
								price : data[0][j]["price"],
								cover : data[0][j]["cover"],
								page : data[0][j]["page"],
								width : data[0][j]["width"],
								height : data[0][j]["height"],
								des : data[0][j]["description"]
							});
						}
					}
				}

			}, error => {
				this.BookService.handleError(error);
			});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
