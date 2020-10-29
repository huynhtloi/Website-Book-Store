import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../../../models/Book.class';
import { BookService } from './../../../../services/book.service';

import { Publisher } from './../../../../models/Publisher.class';
import { PublisherService } from './../../../../services/publisher.service';

import { Author } from './../../../../models/Author.class';
import { AuthorService } from './../../../../services/author.service';


@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

	public base64textString: string = "";
	imagePath: any = null;

	public title: string = 'Thêm sản phẩm bán';

	public Subscription: Subscription;

	public isVisible: boolean = false;
	public messageAlert: string = '';

	public addmybook = new FormGroup({
		bookname: new FormControl(''),
		bookprice: new FormControl(''),
		bookpublisher: new FormControl(''),
		bookauthor: new FormControl(''),
		bookcover: new FormControl(''),
		bookheight: new FormControl(''),
		bookwidth: new FormControl(''),
		booksku: new FormControl(''),
		bookpage: new FormControl(''),
		bookdescription: new FormControl('')
	});

	constructor(
		private http: HttpClient,
		private _sanitizer: DomSanitizer,
		private BookService: BookService,
		private PublisherService: PublisherService,
		private AuthorService: AuthorService
	) { }
	ngOnInit(): void {

	}

	onSubmit() {
		if (this.addmybook.value.bookname == '' || this.addmybook.value.bookprice == '' ||
			this.addmybook.value.bookprovider == '' || this.addmybook.value.bookauthor == '' ||
			this.addmybook.value.bookcover == '' || this.addmybook.value.bookheight == '' ||
			this.addmybook.value.bookwidth == '' || this.addmybook.value.booksku == '' ||
			this.addmybook.value.bookpage == '' || this.addmybook.value.bookdescription == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			this.Subscription = forkJoin([
				this.PublisherService.getAllPublisher(),
				this.AuthorService.getAllAuthor()]).subscribe(data => {

					let checkPublisher = false;
					let checkAuthor = false;
					let publisherID: string = '';

					// Check Publisher
					for (var i = data[0].length - 1; i >= 0; i--) {
						if (this.addmybook.value.bookpublisher == data[0][i]["name"]) {
							checkPublisher = true;
							publisherID = data[0][i]["id"];
						}
					}

					// Check Author
					for (var i = data[1].length - 1; i >= 0; i--) {
						if (this.addmybook.value.bookauthor == data[1][i]["name"]) {
							checkAuthor = true;
						}
					}

					// Add new Author
					if (checkAuthor) {
						let author: Author = new Author(this.addmybook.value.bookauthor);
						this.Subscription = this.AuthorService.addAuthor(author).subscribe(data => {

						}, error => {
							this.AuthorService.handleError(error);
						});
					}


					if (checkPublisher) {
						let book: Book = new Book(
							this.addmybook.value.bookname, this.addmybook.value.bookpage,
							this.addmybook.value.bookprice, this.addmybook.value.booksku,
							publisherID, sessionStorage.getItem("iduser"),
							this.addmybook.value.bookheight, this.addmybook.value.bookwidth,
							this.addmybook.value.bookcover, this.base64textString,
							this.addmybook.value.bookdescription, 0,
							this.addmybook.value.bookauthor, 0, 0, 1, 0
						);
						this.Subscription = this.BookService.addBook(book).subscribe(data => {
							if (this.isVisible) {
								return;
							}
							this.isVisible = true;
							this.messageAlert = 'Thêm sách mới thành công';
							setTimeout(() => this.isVisible = false, 1000);
						}, error => {
							this.BookService.handleError(error);
							if (this.isVisible) {
								return;
							}
							this.isVisible = true;
							this.messageAlert = 'Thêm sách thất bại';
							setTimeout(() => this.isVisible = false, 1000);
						});
					}
					else {

						let publisher: Publisher = new Publisher(this.addmybook.value.bookpublisher);
						// Add new Publisher
						this.Subscription = this.PublisherService.addPublisher(publisher).subscribe(data => {
						}, error => {
							this.PublisherService.handleError(error);
						});
						// Check Publisher adding to database - get id new Publisher
						this.Subscription = this.PublisherService.getAllPublisher().subscribe(data => {
							for (var i = data.length - 1; i >= 0; i--) {
								if (data[i]["name"] == this.addmybook.value.bookpublisher) {
									let book: Book = new Book(
										this.addmybook.value.bookname, this.addmybook.value.bookpage,
										this.addmybook.value.bookprice, this.addmybook.value.booksku,
										data[i]["id"], sessionStorage.getItem("iduser"),
										this.addmybook.value.bookheight, this.addmybook.value.bookwidth,
										this.addmybook.value.bookcover, this.base64textString,
										this.addmybook.value.bookdescription, 0,
										this.addmybook.value.bookauthor, 0, 0, 1, 0
									);
									this.Subscription = this.BookService.addBook(book).subscribe(data => {

									}, error => {
										this.BookService.handleError(error);
									});
								}
							}
						}, error => {
							this.PublisherService.handleError(error);
						});
					}
				}, error => {
					this.PublisherService.handleError(error);
				});
		}
	}

	handleSeleted(evt) {
		var files = evt.target.files;
		var file = files[0];
		if (files && file) {
			var reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}


	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
	// decodeBase64ToImage() {
	// 	// this.base64textString là ảnh đã được encode thành chuỗi base64 lưu trữ trên db
	// 	this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
	// 		'data:image/jpg;base64,' + this.base64textString
	// 	);
	// }
}