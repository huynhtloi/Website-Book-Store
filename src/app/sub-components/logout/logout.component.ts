import { Component, OnInit, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(
		private router: Router,
		private UserService : UserService) {

	}
	ngOnInit() {
		this.UserService.logout();
		this.router.navigate(['login']);
	}

	// ngAfterViewInit() {
	// 	this.logout();
	// 	this.cdr.detectChanges();
	// }

	// ngAfterViewChecked() {
	// 	this.logout();
	// 	this.cdr.detectChanges();
	// }
}