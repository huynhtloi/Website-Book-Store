import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from './../../../models/User.class';
import { UserService } from './../../../services/user.service';

@Component({
	selector: 'app-edit-pass',
	templateUrl: './edit-pass.component.html',
	styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit, OnDestroy {

	public title: string = 'Thay đổi mật khẩu';

	public Subscription: Subscription;
	public user: User;

	public oldpass: string = '';
	public newpass: string = '';
	public confirmpass: string = '';

	public isVisible: boolean = false;
	public messageAlert: string = '';
	constructor(public UserService: UserService) { }

	getLoginUser() {
		let userLogin = sessionStorage.getItem("username");
		this.Subscription = this.UserService.getByUsername(userLogin).subscribe(data => {
			this.user = data[0];
		}, error => {
			this.UserService.handleError(error);
		});
	}

	ngOnInit(): void {
		this.getLoginUser();
	}

	editUserProfile() {
		let userLogin = sessionStorage.getItem("username");
		this.Subscription = this.UserService.getByUsername(userLogin).subscribe(data => {
			if (this.oldpass == '' || this.newpass == '' || this.confirmpass == '') {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
				setTimeout(() => this.isVisible = false, 1000);
			}
			else if (btoa(this.oldpass) != data[0]["pass"]) {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Mật khẩu cũ sai, vui lòng nhập lại';
				setTimeout(() => this.isVisible = false, 1000);
			}
			else if (this.newpass != this.confirmpass) {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Xác thực mật khẩu sai, vui lòng nhập lại';
				setTimeout(() => this.isVisible = false, 1000);
			}
			else {
				let user: User = new User(
					data[0]["username"],
					btoa(this.newpass),
					data[0]["name"],
					data[0]["age"],
					data[0]["sex"],
					data[0]["address"],
					data[0]["role"],
					data[0]["img"]);
				this.Subscription = this.UserService.editAccount(user, data[0]["id"]).subscribe(data => {
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Thay đổi mật khẩu thành công';
					setTimeout(() => this.isVisible = false, 1000);
				}, error => {
					this.UserService.handleError(error);
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Thay đổi mật khẩu thất bại';
					setTimeout(() => this.isVisible = false, 1000);
				});
			}
		}, error => {
			this.UserService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

}
