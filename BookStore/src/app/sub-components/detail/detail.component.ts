import { Component, OnInit, OnDestroy } from '@angular/core';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { BookService } from './../../services/book.service';
import { ProviderService } from './../../services/provider.service';
import { PublisherService } from './../../services/publisher.service';
import { CartService } from './../../services/cart.service';
import { UserService } from './../../services/user.service';

import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../models/Book.class';
import { Publisher } from './../../models/Publisher.class';
import { Provider } from './../../models/Provider.class';
import { Cart } from './../../models/Cart.class';
import { User } from './../../models/User.class';


import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

	public Subscription: Subscription;
	public QuerySubscription: Subscription;
	public Subscription_addcart: Subscription;
	public Subscription_cart: Subscription;
	public Subscription_user: Subscription;
	public Subscription_updatecart: Subscription;

	public book = {} as Book;
	public publisher: string;
	public provider: string;

	public bookProviders: Array<Book> = [];

	public meesageAlert: string = '';
	public showAlert: boolean = false;

	constructor(
		public BookService: BookService,
		public ProviderService: ProviderService,
		public PublisherService: PublisherService,
		public CartService: CartService,
		public UserService: UserService,
		public routerService: Router,
		public activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.QuerySubscription = this.activatedRoute.queryParams.subscribe(data => {
			this.publisher = '';
			this.provider = '';

			this.bookProviders = [];
			this.loadBookById(data["id"]);
		});
	}

	onAddBookToCart(idbook, pricebook): void {
		if (sessionStorage.getItem('username')) {
			this.showAlert = !this.showAlert;
			this.Subscription_user = this.UserService.getByUsername(sessionStorage.getItem('username')).subscribe(dataUser => {
				// gán mặc định một nhà vận chuyển, sau đó sẽ chọn lại sau trong Cart
				let idshipper: string = '064e1fa0-1675-11eb-a2a5-bf2eadbaa6ab';
				let iduser: string = dataUser[0]["id"];
				let amount: number = 1;
				let cart = new Cart(idshipper, iduser, idbook, amount, pricebook);
				this.Subscription_cart = this.CartService.loadAllCart().subscribe(dataCart => {
					if (dataCart.length && dataCart != undefined) {
						let checkBook = 0;
						for (var i = dataCart.length - 1; i >= 0; i--) {
							// show
							// console.log(cart);

							if (idbook == dataCart[i].idbook) {
								// delete id trên db, loại bỏ idbook đã thêm vào cart và cập nhật thông tin mới
								cart.amount = dataCart[i].amount + 1;
								// console.log(cart.amount);
								// check id in cart table from db
								// console.log(dataCart[i].id);
								this.Subscription_updatecart = this.CartService.updateById(cart, dataCart[i].id).subscribe(dataUpdate => {
									this.meesageAlert = 'Thêm vào giỏ hàng thành công!!!';
									this.showAlert = true;
								}, error => {
									this.meesageAlert = 'Thêm vào giỏ hàng thất bại';
									this.showAlert = true;
								});
							}
							else if (idbook != dataCart[i].idbook) {
								checkBook++;
							}
						}
						if (checkBook == dataCart.length) {
							this.Subscription_addcart = this.CartService.addBookToCart(cart).subscribe(dataAddCart => {
								this.meesageAlert = 'Thêm vào giỏ hàng thành công!!!';
								this.showAlert = true;
							}, error => {
								this.CartService.handleError(error);
								this.meesageAlert = 'Thêm vào giỏ hàng thất bại';
								this.showAlert = true;
							});
						}
					}
					else {
						this.Subscription_addcart = this.CartService.addBookToCart(cart).subscribe(dataAddCart => {
							this.meesageAlert = 'Thêm vào giỏ hàng thành công!!!';
							this.showAlert = true;
						}, error => {
							this.CartService.handleError(error);
							this.meesageAlert = 'Thêm vào giỏ hàng thất bại';
							this.showAlert = true;
						});
					}
				});
			});
		} else {
			this.meesageAlert = 'Vui lòng đăng nhập';
			this.showAlert = true;
		}

	}

	loadBookById(id) {
		this.Subscription = forkJoin(
			[this.BookService.getBookById(id),
			this.ProviderService.getAllProvider(),
			this.PublisherService.getAllPublisher(),
			this.BookService.getAllBook()]
		).subscribe(data => {

			for (var i = data[1].length - 1; i >= 0; i--) {

				if (data[0]["provider"] == data[1][i]["id"]) {
					this.provider = data[1][i]["name"];
				}
			}

			for (var i = data[3].length - 1; i >= 0; i--) {
				if (data[0]["provider"] == data[3][i]["provider"]) {
					if (data[0]["name"] != data[3][i]["name"]) {
						this.bookProviders.push(data[3][i]);
					}
				}
			}


			for (var i = data[2].length - 1; i >= 0; i--) {
				if (data[0]["publisher"] == data[2][i]["id"]) {
					this.publisher = data[2][i]["name"];
				}
			}

			this.book = data[0];
		}, error => {
			this.BookService.handleError(error);
			this.ProviderService.handleError(error);
			this.PublisherService.handleError(error);
		});
	}


	ngOnDestroy(): void {
		if (this.QuerySubscription) {
			this.QuerySubscription.unsubscribe();
		}
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
		if (this.Subscription_addcart) {
			this.Subscription_addcart.unsubscribe();
		}
		if (this.Subscription_cart) {
			this.Subscription_cart.unsubscribe();
		}
		if (this.Subscription_updatecart) {
			this.Subscription_updatecart.unsubscribe();
		}
	}

}
