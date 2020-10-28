import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { UserService } from './../../services/user.service';

import { User } from './../../models/User.class';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public title: string = 'Đăng ký thành viên';

	public Subscription: Subscription;

	public isVisible: boolean = false;
	public messageAlert: string = '';

	public register = new FormGroup({
		userName: new FormControl(''),
		passWord: new FormControl(''),
		confirmPass: new FormControl(''),
		name: new FormControl(''),
		age: new FormControl(''),
		address: new FormControl(''),
		sex: new FormControl(''),
	});
	constructor(public UserService: UserService) { }

	ngOnInit(): void {
	}

	onSubmit() {
		if (this.register.value.userName == '' || this.register.value.passWord == '' ||
			this.register.value.name == '' || this.register.value.age == '' ||
			this.register.value.sex == '' || this.register.value.address == '' ||
			this.register.value.confirmPass == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			if (this.register.value.passWord?.length <= 10) {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Password có độ dài phải hơn 10';
				setTimeout(() => this.isVisible = false, 1000);
			}
			else if (this.register.value.passWord != this.register.value.confirmPass) {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Confirm password không đúng, vui lòng nhập lại';
				setTimeout(() => this.isVisible = false, 1000);
			}
			else if (this.register.value.passWord == this.register.value.confirmPass) {
				let pass: string = btoa(this.register.value.passWord);
				let user: User = new User(
					this.register.value.userName,
					pass,
					this.register.value.name,
					this.register.value.age,
					this.register.value.sex,
					this.register.value.address,
					0);
				console.log(user);
				this.Subscription = this.UserService.createAccount(user).subscribe(data => {
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Đăng ký thành công';
					setTimeout(() => this.isVisible = false, 1000);

				}, error => {
					this.UserService.handleError(error);
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Đăng ký thất bại';
					setTimeout(() => this.isVisible = false, 1000);

				});
			}
		}
	}
}
