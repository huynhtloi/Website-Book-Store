import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	public isVisible: boolean = false;
	constructor() { }

	ngOnInit(): void {
	}

	showAlert(): void {
		if (this.isVisible) {
			return;
		}
		this.isVisible = true;
		setTimeout(() => this.isVisible = false, 1000);
	}

}
