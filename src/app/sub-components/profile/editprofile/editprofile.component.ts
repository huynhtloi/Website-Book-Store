import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from './../../../models/User.class';
import { UserService } from './../../../services/user.service';

@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit, OnDestroy {

	public title: string = 'Cập nhật thông tin';
	public base64textString: string = '';
	public imagePath: any = null;
	public Subscription: Subscription;
	public user: User;


	public name: string = '';
	public age: number = 0;
	public sex: string = '';
	public address: string = '';

	public isVisible: boolean = false;
	public messageAlert: string = '';
	constructor(
		public _sanitizer: DomSanitizer,
		public UserService: UserService) { }

	ngOnInit(): void {
		this.getUserLogin();
	}

	getUserLogin() {
		let userLogin: string = sessionStorage.getItem("username");
		this.Subscription = this.UserService.getByUsername(userLogin).subscribe(data => {
			this.user = data[0];
			// show ảnh tạm thời
			this.base64textString = this.user.img;
			this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
				'data:image/jpg;base64,' + this.base64textString
			);
			// gán giá trị
			this.name = this.user.name;
			this.age = this.user.age;
			this.sex = this.user.sex;
			this.address = this.user.address;
		}, error => {
			this.UserService.handleError(error);
		});
	}

	editUserProfile() {
		if (this.name == '' || this.sex == '' || this.age == 0 || this.address == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			let userLogin: string = sessionStorage.getItem("username");
			this.Subscription = this.UserService.getByUsername(userLogin).subscribe(data => {

				let user: User = new User
					(data[0]["username"],
						data[0]["pass"],
						this.name, this.age, this.sex, this.address, 0, this.base64textString);

				let id: string = sessionStorage.getItem("iduser");

				this.Subscription = this.UserService.editAccount(user, id).subscribe(data => {
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Cập nhật thông tin thành công';
					setTimeout(() => this.isVisible = false, 1000);
				}, error => {
					this.UserService.handleError(error);
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Cập nhật thông tin thất bại';
					setTimeout(() => this.isVisible = false, 1000);
				});
			}, error => {
				this.UserService.handleError(error);
			});
		}
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
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
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + this.base64textString
		);
	}

	handleShow(event) {
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + event
		);
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}
}
