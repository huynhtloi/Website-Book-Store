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

	public meesageAlert: string = '';
	public showAlert: boolean = false;

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
		if (this.register.value.passWord == this.register.value.confirmPass && this.register.value.passWord != '') {
			let pass : string = btoa(this.register.value.passWord);
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
				this.meesageAlert = 'Đăng ký thành công';
				this.showAlert = true;
			}, error => {
				this.UserService.handleError(error);
				this.meesageAlert = 'Đăng ký thất bại';
				this.showAlert = true;
			});
		}
		else if (this.register.value.passWord == '') {
			this.meesageAlert = 'Đăng ký thất bại';
			this.showAlert = true;
		}
		else if (this.register.value.passWord == this.register.value.confirmPass) {
			this.meesageAlert = 'Mật khẩu nhập lại không đúng, vui lòng nhập lại';
			this.showAlert = true;
		}


	}

}
