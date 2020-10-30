import { Component, OnInit, OnDestroy } from '@angular/core';

import { BuyService } from './../../services/buy.service';
import { BookService } from './../../services/book.service';
import { ShipperService } from './../../services/shipper.service';

import { Buy } from './../../models/Buy.class';
import { Book } from './../../models/Book.class';
import { Shipper } from './../../models/Shipper.class';

import { Subscription, forkJoin } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-buy',
	templateUrl: './buy.component.html',
	styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit, OnDestroy {

	public page = 1;
	public Subscription: Subscription;
	buys: Buy[] = [];
	items = [];
	public idUserLogin: string = sessionStorage.getItem("iduser");
	constructor(
		public BuyService: BuyService,
		public BookService: BookService,
		public ShipperService: ShipperService,
		private _sanitizer: DomSanitizer
	) { }

	ngOnInit(): void {
		this.items = [];
		this.loadAllBuy();
	}

	handlePageChange(event) {
		this.page = event;
	}

	loadAllBuy() {
		this.Subscription = this.BuyService.getAllBuy().subscribe(data => {
			this.buys = data;
			for (var i = data.length - 1; i >= 0; i--) {
				if (this.idUserLogin == data[i]["iduser"]) {
					let buy = data[i];
					forkJoin([
						this.BookService.getBookById(data[i]["idbook"]),
						this.ShipperService.getShipperById(data[i]["idshipper"])
					]).subscribe(dataB => {
						this.items.push({
							idbook: dataB[0]["id"],
							img: dataB[0]["img"],
							name: dataB[0]["name"],
							nameship: dataB[1]["name"],
							priceship: dataB[1]["price"],
							price: dataB[0]["price"],
							amount: buy["amount"],
							allprice: buy["allprice"]
						});
					});
				}
			}
		}, error => {
			this.BuyService.handleError(error);
		});
	}

	ngOnDestroy(): void {

	}
}
