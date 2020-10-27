import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
	selector: 'app-top-menu-c',
	templateUrl: './top-menu-c.component.html',
	styleUrls: ['./top-menu-c.component.css']
})
export class TopMenuCComponent implements OnInit {

	public user: string;
	constructor(
		public UserService : UserService
	) { }

	ngOnInit(): void {
	}
}
