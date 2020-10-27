import { Component, OnInit, OnDestroy } from '@angular/core';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { BookService } from './../../services/book.service';
import { AuthorService } from './../../services/author.service';
// import forkJoin
import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../models/Book.class';
import { Author } from './../../models/Author.class';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

	public faAngleDown = faAngleDown;

	public Subscription: Subscription;
	public Subscription_book: Subscription;
	public queryParamSubscription: Subscription;

	public type: string = '';

	public books: Array<Book> = [];

	public page: number = 1;
	constructor(
		public BookService: BookService,
		public AuthorService: AuthorService,
		public routerService: Router,
		public activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.queryParamSubscription = this.activatedRoute.queryParams.subscribe(data => {
			if (data["type"] == 'provider') {
				this.books = [];
				this.loadBookByProvider(data["id"]);
				this.type = 'sách theo nhà cung cấp';
			}
			else if (data["type"] == 'publisher') {
				this.books = [];
				this.loadBookByPublisher(data["id"]);
				this.type = 'sách theo nhà xuất bản';
			}
			else if (data["type"] == 'author') {
				this.books = [];
				this.loadNameByAuthor(data["id"]);
				this.type = 'sách theo tác giả';
			}
			else if (data["type"] == 'bestseller') {
				this.books = [];
				this.loadAllBestSellerBook();
				this.type = 'sách bán chạy';
			}
			else if (data["type"] == 'sale') {
				this.books = [];
				this.loadAllSaleBook();
				this.type = 'sách giảm giá';
			}
			else if (data["type"] == 'freeship') {
				this.books = [];
				this.loadBookFreeShip(data["id"]);
				if (data["id"] == '1') {
					this.type = 'Miễn phí vận chuyển';
				}
				else if(data["id"] == '0') {
					this.type = 'Có phí vận chuyển';
				}
			}
		});
	}

	loadAllSaleBook() {
		this.Subscription_book = this.BookService.getAllSaleBook().subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadBookFreeShip(key: string) {
		this.Subscription_book = this.BookService.getBookByFreeship(key).subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadAllBestSellerBook() {
		this.Subscription_book = this.BookService.getAllBestSellerBook().subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadBookByProvider(id: number) {
		this.Subscription_book = this.BookService.getBookByProvider(id).subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadBookByPublisher(id: number) {
		this.Subscription_book = this.BookService.getBookByPublisher(id).subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadNameByAuthor(id: number) {
		// load 2 api cùng lúc
		this.Subscription_book = forkJoin(
			[this.AuthorService.getByAuthor(id),
			this.BookService.getAllBook()]
		).subscribe(data => {
			var temp: Array<Book> = [];
			for (var i = data[1].length - 1; i >= 0; i--) {
				if (data[0]["name"] == data[1][i]["author"]) {
					temp.push(data[1][i]);
				}
			}
			this.books = temp;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription_book) {
			this.Subscription_book.unsubscribe();
		}
		if (this.queryParamSubscription) {
			this.queryParamSubscription.unsubscribe();
		}
	}

	handlePageChange(event) {
		this.page = event;
	}
}
