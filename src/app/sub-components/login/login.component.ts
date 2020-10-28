import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { UserService } from './../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	public title: string = 'Đăng nhập hệ thống';
	public username: string = '';
	public password: string = '';
	public invalidLogin: boolean = false;

	public isVisible: boolean = false;
	public messageAlert: string = '';

	public Subscription: Subscription;

	constructor(
		private router: Router,
		private UserService: UserService
	) { }

	ngOnInit() {
	}

	checkLogin() {
		if (this.username == '' || this.password == '') {
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			this.Subscription = this.UserService.getByUsername(this.username).subscribe(data => {
				if (data[0] == undefined) {
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Tên người dùng không đúng';
					setTimeout(() => this.isVisible = false, 1000);
				}
				else if (btoa(this.password) == data[0]['pass']) {
					sessionStorage.setItem('username', this.username);
					sessionStorage.setItem('iduser', data[0]["id"]);
					this.router.navigate(['']);
					this.invalidLogin = false;
				} else {
					this.invalidLogin = true;
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Mật khẩu sai, vui lòng nhập lại';
					setTimeout(() => this.isVisible = false, 1000);
				}
			}, error => {
				this.UserService.handleError(error);
				this.invalidLogin = true;
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Đăng nhập thất bại';
				setTimeout(() => this.isVisible = false, 1000);
			});
		}
	}

	ngOnDestroy() {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

}