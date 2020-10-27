import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription,forkJoin } from 'rxjs';
import { UserService } from './../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	public title : string = 'Đăng nhập hệ thống';
	public username:string = '';
	public password:string = '';
	public invalidLogin:boolean = false;

	public Subscription : Subscription;

	constructor(
		private router: Router,
		private UserService: UserService
	) { }

	ngOnInit() {
	}

	checkLogin() {
		this.Subscription = this.UserService.getByUsername(this.username).subscribe(data => {
			if (btoa(this.password) == data[0]['pass']) {
				sessionStorage.setItem('username', this.username);
				sessionStorage.setItem('iduser', data[0]["id"]);
				this.router.navigate(['']);
				this.invalidLogin = false;
			} else {
				this.invalidLogin = true;
			}
		}, error => {
			this.UserService.handleError(error);
			this.invalidLogin = true;
		});
	}

	ngOnDestroy() {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

}