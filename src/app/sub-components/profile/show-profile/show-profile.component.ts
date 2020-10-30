import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { User } from './../../../models/User.class';
import { UserService } from './../../../services/user.service';

@Component({
	selector: 'app-show-profile',
	templateUrl: './show-profile.component.html',
	styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit, OnDestroy {

	public title:string = 'thông tin người dùng';
	public Subscription : Subscription;
	public user : User;
	constructor(public UserService:UserService) { }

	ngOnInit(): void {
		this.getUserLogin();
	}

	getUserLogin() {
		let userLogin = sessionStorage.getItem("username");
		this.Subscription = this.UserService.getByUsername(userLogin).subscribe(data => {

			this.user = data[0];
			console.log(this.user.name);
		},error => {
			this.UserService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
