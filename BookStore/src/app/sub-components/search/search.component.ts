import { Component, OnInit, OnDestroy } from '@angular/core';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { BookService } from './../../services/book.service';
import { ProviderService } from './../../services/provider.service';
import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../models/Book.class';
import { Provider } from './../../models/Provider.class';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  	faAngleDown = faAngleDown;

  	public Subscription_book :Subscription;
  	public Subscription_provider: Subscription;
  	public QueryParamSubscription : Subscription;

  	public books:Book[];
  	public providers:Provider[];

  	public searchName:string = '';
  	public resultName:string = '';
  	public page:number = 1;
	constructor(
		public BookService :BookService,
		public ProviderService : ProviderService,
		public routerService : Router,
		public activatedRoute : ActivatedRoute
	) { }

	ngOnInit(): void {
		this.QueryParamSubscription = this.activatedRoute.queryParams.subscribe(data => {
			if (data["key"] != '') {
				this.resultName = data["key"];
			}
		});
		this.loadAllBook();
		this.loadAllProvider();
	}

	loadAllBook(){
		this.Subscription_book = this.BookService.getAllBook().subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadAllProvider(){
		this.Subscription_provider = this.ProviderService.getAllProvider().subscribe(data=> {
			this.providers = data;
		},error=>{
			this.ProviderService.handleError(error);
		});
	}

	ngOnDestroy():void {
		if (this.Subscription_book) {
			this.Subscription_book.unsubscribe();
		}
		if (this.Subscription_provider) {
			this.Subscription_provider.unsubscribe();
		}
	}

	searchBook(){
		this.resultName = this.searchName;
	}

	handlePageChange(event) {
		this.page = event;
	}
}
