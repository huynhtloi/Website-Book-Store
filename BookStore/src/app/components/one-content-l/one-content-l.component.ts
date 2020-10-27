import { Component, OnInit, OnDestroy } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


import { AuthorService } from './../../services/author.service';

import { Subscription } from 'rxjs';

import { Author } from './../../models/Author.class';

@Component({
	selector: 'app-one-content-l',
	templateUrl: './one-content-l.component.html',
	styleUrls: ['./one-content-l.component.css']
})
export class OneContentLComponent implements OnInit,OnDestroy {
  	public faAngleDown = faAngleDown;
  	public faAngleUp = faAngleUp;

	public Subscription :Subscription;

  	public authors:Author[];
  	public check:boolean = false;
	constructor(
		public AuthorService :AuthorService
	) { }

	ngOnInit(): void {
		this.loadAllAuthor();
	}

	loadAllAuthor(){
		this.Subscription = this.AuthorService.getAllAuthor().subscribe(data => {
			this.authors = data;
		}, error => {
			this.AuthorService.handleError(error);
		});
	}

	ngOnDestroy():void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

	toggle() {
		this.check = !this.check;
	}

	setOnIcon() {
		if (this.check) {
			return this.faAngleUp;
		}else {
			return this.faAngleDown;
		}
	}
}
