import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { CartService } from './../../services/cart.service';
import { BookService } from './../../services/book.service';
import { ShipperService } from './../../services/shipper.service';
import { BuyService } from './../../services/buy.service';

import { Subscription, forkJoin } from 'rxjs';

import { Cart } from './../../models/Cart.class';
import { Book } from './../../models/Book.class';
import { Shipper } from './../../models/Shipper.class';
import { Buy } from './../../models/Buy.class';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	public Subscription_author: Subscription;
	public Subscription_cart: Subscription;
	public Subscription_book: Subscription;
	public Subscription_ship: Subscription;
	public Subscription_updateCart: Subscription;
	public Subscription_deleteCart: Subscription;
	public Subscription_buy: Subscription;

	public carts: Cart[];
	public books: Array<Book> = [];
	public shippers: Shipper[] = [];

	public items = [];

	public page: number = 1;

	public allprice: number = 0;
	public priceAfter: number;
	public amountAfer: number;

	public meesageAlert: string = '';
	public showAlert: boolean = false;
	public idUserLogin: string = sessionStorage.getItem('iduser');
	constructor(
		public CartService: CartService,
		public BookService: BookService,
		public ShipperService: ShipperService,
		public BuyService: BuyService,
		public router: Router
	) { }

	ngOnInit(): void {
		this.books = [];
		this.carts = [];
		this.shippers = [];
		this.loadAllCart();
	}

	loadAllCart() {
		this.Subscription_cart = this.CartService.loadAllCart().subscribe(dataCart => {
			this.carts = dataCart;
			for (var i = dataCart.length - 1; i >= 0; i--) {
				if (this.idUserLogin == dataCart[i].iduser) {
					this.Subscription_book = this.BookService.getBookById(dataCart[i]["idbook"]).subscribe(dataBook => {
						// sách chọn thêm vào cart
						this.books.push(dataBook);
						// tạo items giả lưu thông tin nhà vận chuyển và giá ship
						this.items.push({ shipperPriceSelected: 0, book: dataBook, amount: 1 });
					}, error => {
						this.CartService.handleError(error);
					});
				}
			}

			this.Subscription_ship = this.ShipperService.getAllShipper().subscribe(dataShip => {
				// lấy tất cả shippers có trong db
				this.shippers = dataShip;
			}, error => {
				this.ShipperService.handleError(error);
			});

		}, error => {
			this.BookService.handleError(error);
		});
	}

	updateAllPrice() {
		this.allprice = 0;
		for (var i = this.carts.length - 1; i >= 0; i--) {
			if (this.idUserLogin == this.carts[i].iduser) {
				for (var j = this.shippers.length - 1; j >= 0; j--) {
					for (var k = this.books.length - 1; k >= 0; k--) {
						if (this.books[k].id == this.carts[i].idbook &&
							this.shippers[j].id == this.carts[i].idshipper) {
							this.allprice += this.shippers[j].price + this.books[k].price * this.carts[i].amount;
						}
					}
				}
			}

		}
	}

	ngOnDestroy(): void {
		if (this.Subscription_author) {
			this.Subscription_author.unsubscribe();
		}
		if (this.Subscription_cart) {
			this.Subscription_cart.unsubscribe();
		}
		if (this.Subscription_book) {
			this.Subscription_book.unsubscribe();
		}
		if (this.Subscription_ship) {
			this.Subscription_ship.unsubscribe();
		}
		if (this.Subscription_updateCart) {
			this.Subscription_updateCart.unsubscribe();
		}
		if (this.Subscription_deleteCart) {
			this.Subscription_deleteCart.unsubscribe();
		}
		if (this.Subscription_buy) {
			this.Subscription_buy.unsubscribe();
		}
	}

	// update giá ship khi chọn nhà vận chuyển (option)
	receiveSelected(event, book, shippers) {
		for (var i = shippers.length - 1; i >= 0; i--) {
			for (var j = this.items.length - 1; j >= 0; j--) {
				if (event.target.value == shippers[i].id &&
					this.items[j].book.id == book.id) {
					if (book.free == 1) {
						this.items[j].shipperPriceSelected = 0;
					}
					else if (book.free == 0) {
						this.items[j].shipperPriceSelected = shippers[i].price;
					}
					
				}
				else if (event.target.value == 0 &&
					this.items[j].book.id == book.id) {
					this.items[j].shipperPriceSelected = 0;
				}
			}
		}
		for (var i = this.carts.length - 1; i >= 0; i--) {
			if (this.carts[i].idbook == book.id && event.target.value != 0) {
				// console.log(event.target.value);
				this.carts[i].idshipper = event.target.value;
				this.Subscription_updateCart = this.CartService.updateById(this.carts[i], this.carts[i].id).subscribe(data => {

				}, error => {
					this.CartService.handleError(error);
				});
				// console.log(this.carts[i].idshipper);
			}
		}
	}

	enterAmount(event, book, shippers) {
		for (var i = this.items.length - 1; i >= 0; i--) {
			if (this.items[i].book.id == book.id) {
				this.items[i].amount = event.target.value;
				for (var i = this.carts.length - 1; i >= 0; i--) {
					if (this.carts[i].idbook == book.id) {
						this.carts[i].amount = event.target.value;
						this.Subscription_updateCart = this.CartService.updateById(this.carts[i], this.carts[i].id).subscribe(data => {

						}, error => {
							this.CartService.handleError(error);
						});
						// console.log(this.carts[i]);
					}
				}
			}
		}
	}

	addCartToBuy() {
		if (this.carts.length && this.carts != undefined) {
			this.Subscription_cart = this.CartService.loadAllCart().subscribe(data => {
				for (var i = data.length - 1; i >= 0; i--) {
					if (this.idUserLogin == data[i]["iduser"]) {
						let cart: Cart = data[i];
						forkJoin([
							this.ShipperService.getShipperById(data[i].idshipper),
							this.BookService.getBookById(data[i].idbook)
						]).subscribe(dataTo => {
							let allprice = dataTo[0]["price"] + cart.amount * dataTo[1]["price"];
							let buy = new Buy(cart.iduser, cart.idshipper, cart.idbook, cart.amount, allprice, dataTo[1]["price"]);
							// console.log(buy);
							this.BuyService.addBuy(buy).subscribe(data => {
								console.log('successful');
								this.meesageAlert = 'Thanh toán thành công';
								this.showAlert = true;
							}, error => {
								this.BuyService.handleError(error);
								this.meesageAlert = 'Thanh toán thất bại';
								this.showAlert = true;
							});
							// console.log(buy);
						}, error => {
							this.BookService.handleError(error);
							this.meesageAlert = 'Thanh toán thất bại';
							this.showAlert = true;
						});
					}
				}
			}, error => {
				this.CartService.handleError(error);
				this.meesageAlert = 'Thanh toán thất bại';
				this.showAlert = true;
			});
		}
	}

	deleteAllCart() {
		if (this.carts.length) {
			for (var i = this.carts.length - 1; i >= 0; i--) {
				if (this.idUserLogin == this.carts[i].iduser) {
					this.Subscription_deleteCart = this.CartService.deleteCartById(this.carts[i].id).subscribe(data => {
						console.log('delete all successful');
					}, error => {
						this.CartService.handleError(error);
					});
				}
			}

		}
	}

	deleteItemBook(idcart: string) {
		this.Subscription_deleteCart = this.CartService.deleteCartById(idcart).subscribe(data => {

		}, error => {
			this.CartService.handleError(error);
		});
	}

	handlePageChange(event) {
		this.page = event;
	}

}
