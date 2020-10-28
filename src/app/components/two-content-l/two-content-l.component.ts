import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from './../../services/book.service';
import { Subscription } from 'rxjs';
import { Book } from './../../models/Book.class';

@Component({
	selector: 'app-two-content-l',
	templateUrl: './two-content-l.component.html',
	styleUrls: ['./two-content-l.component.css']
})
export class TwoContentLComponent implements OnInit, OnDestroy {

	public Subscription: Subscription;
	public books: Book[];
	public newBooks: Book[];
	public saleBooks: Book[];
	public bestBooks: Book[];

	public pageNew = 1;
	public pageSale = 1;
	public pageBest = 1;

	constructor(
		public BookService: BookService
	) { }



	ngOnInit(): void {
		this.loadDataBook();
		this.loadAllNewBook();
		this.loadAllSaleBook();
	}

	handlePageChangeNew(event) {
		this.pageNew = event;
	}
	handlePageChangeSale(event) {
		this.pageSale = event;
	}
	handlePageChangeBest(event) {
		this.pageBest = event;
	}

	loadAllBestBook(){
		this.Subscription = this.BookService.getAllBestSellerBook().subscribe(data=>{
			this.bestBooks = data;
		},error => {
			this.BookService.handleError(error);
		});
	}

	loadDataBook() {
		this.Subscription = this.BookService.getAllBook().subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadAllNewBook() {
		this.Subscription = this.BookService.getAllNewBook().subscribe(data => {
			this.newBooks = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadAllSaleBook() {
		this.Subscription = this.BookService.getAllSaleBook().subscribe(data => {
			this.saleBooks = data;
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
