import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, forkJoin } from 'rxjs';

import { Book } from './../../../../models/Book.class';
import { BookService } from './../../../../services/book.service';


@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	private base64textString: String = "";
	imagePath: any = null;

	public title: string = 'Thêm sản phẩm bán';

	public Subscription: Subscription;

	public isVisible: boolean = false;
	public messageAlert: string = '';

	public addmybook = new FormGroup({
		bookname: new FormControl(''),
		bookprice: new FormControl(''),
		bookprovider: new FormControl(''),
		bookauthor: new FormControl(''),
		bookcover: new FormControl(''),
		bookheight: new FormControl(''),
		bookwidth: new FormControl(''),
		booksku: new FormControl(''),
		bookpage: new FormControl(''),
		bookdescription: new FormControl(''),
		bookimagepath: new FormControl('')
	});

	constructor(
		private http: HttpClient,
		private _sanitizer: DomSanitizer,
		private BookService:BookService
	) { }
	ngOnInit(): void {

	}

	onSubmit() {
		if (this.addmybook.value.bookname == '' || this.addmybook.value.bookprice == '' ||
			this.addmybook.value.bookprovider == '' || this.addmybook.value.bookauthor == '' ||
			this.addmybook.value.bookcover == '' || this.addmybook.value.bookheight == '' ||
			this.addmybook.value.bookwidth == '' || this.addmybook.value.booksku == '' ||
			this.addmybook.value.bookpage == '' || this.addmybook.value.bookdescription == '' ||
			this.addmybook.value.bookimagepath == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		// var files = evt.target.files;
		// var file = files[0];
		// if (files && file) {
		// 	var reader = new FileReader();
		// 	reader.onload = this._handleReaderLoaded.bind(this);
		// 	reader.readAsBinaryString(file);
		// }
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}

	// onSubmit() {
	// 	// this.base64textString là ảnh đã được encode thành chuỗi base64 lưu trữ trên db
	// 	this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
	// 		'data:image/jpg;base64,' + this.base64textString
	// 	);
	// }
}