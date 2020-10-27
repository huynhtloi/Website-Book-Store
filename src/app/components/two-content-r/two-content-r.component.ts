import { Component, OnInit, OnDestroy } from '@angular/core';

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { BookService } from './../../services/book.service';
import { ProviderService } from './../../services/provider.service';
import { PublisherService } from './../../services/publisher.service';

import { Subscription } from 'rxjs';

import { Book } from './../../models/Book.class';
import { Provider } from './../../models/Provider.class';
import { Publisher } from './../../models/Publisher.class'

@Component({
	selector: 'app-two-content-r',
	templateUrl: './two-content-r.component.html',
	styleUrls: ['./two-content-r.component.css']
})
export class TwoContentRComponent implements OnInit, OnDestroy {

	public faAngleDown = faAngleDown;
	public faAngleUp = faAngleUp;
	public checkProvider: boolean = false;
	public checkPublisher: boolean = false;

	public Subscription_book : Subscription;
	public Subscription_provider : Subscription;
	public Subscription_publisher : Subscription;
	public featureBooks : Book[];
	public providers : Provider[];
	public publishers : Publisher[];
	constructor(
		public BookService : BookService,
		public ProviderService : ProviderService,
		public PublisherService : PublisherService
	) { }

	ngOnInit(): void {
		this.loadFeatureBook();
		this.loadProvider();
		this.loadPublisher();
	}

	loadFeatureBook(){
		this.Subscription_book = this.BookService.getFeatureBook(0).subscribe(data => {
			this.featureBooks = data;
		}, error => {
			this.BookService.handleError(error);
		});
	}

	loadProvider() {
		this.Subscription_provider = this.ProviderService.getAllProvider().subscribe(data => {
			this.providers = data;
		}, error => {
			this.ProviderService.handleError(error);
		});
	}

	loadPublisher() {
		this.Subscription_publisher = this.PublisherService.getAllPublisher().subscribe(data => {
			this.publishers = data;
		}, error => {
			this.PublisherService.handleError(error);
		});
	}

	ngOnDestroy():void {
		if(this.Subscription_book) {
			this.Subscription_book.unsubscribe();
		}
		if(this.Subscription_provider) {
			this.Subscription_provider.unsubscribe();
		}
		if(this.Subscription_publisher) {
			this.Subscription_publisher.unsubscribe();
		}
	}

	toggleProvider() {
		this.checkProvider = !this.checkProvider;
	}
	togglePublisher() {
		this.checkPublisher = !this.checkPublisher;
	}

	setOnIconProvider() {
		if (this.checkProvider) {
			return this.faAngleUp;
		}else {
			return this.faAngleDown;
		}
	}

	setOnIconPublisher() {
		if (this.checkPublisher) {
			return this.faAngleUp;
		}else {
			return this.faAngleDown;
		}		
	}
}
