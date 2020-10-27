import { Component, OnInit, OnDestroy } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { AuthorService } from './../../services/author.service';

import { Subscription, forkJoin } from 'rxjs';

import { Author } from './../../models/Author.class';

@Component({
	selector: 'app-buy-content-l',
	templateUrl: './buy-content-l.component.html',
	styleUrls: ['./buy-content-l.component.css']
})
export class BuyContentLComponent implements OnInit, OnDestroy {

	public faAngleDown = faAngleDown;
	public faAngleUp = faAngleUp;

	public Subscription_author: Subscription;
	public check: boolean = false;

	public authors: Author[];

	constructor(public AuthorService: AuthorService) { }

	ngOnInit(): void {
		this.authors = [];
		this.check = false;
		this.loadAllAuthor();
	}

	ngOnDestroy(): void {
		if (this.Subscription_author) {
			this.Subscription_author.unsubscribe();
		}
	}

	setOnIcon() {
		if (this.check) {
			return this.faAngleUp;
		} else {
			return this.faAngleDown;
		}
	}

	loadAllAuthor() {
		this.Subscription_author = this.AuthorService.getAllAuthor().subscribe(data => {
			// danh sách tác giả
			this.authors = data;
		}, error => {
			this.AuthorService.handleError(error);
		});
	}

	toggle() {
		this.check = !this.check;
	}
}
