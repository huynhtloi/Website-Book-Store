import { Component, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { Contact } from './../../models/Contact.class';
import { ContactService } from './../../services/contact.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	public name: string = '';
	public mail: string = '';
	public message: string = '';
	public isVisible: boolean = false;
	public messageAlert: string = '';
	public Subscription: Subscription;

	constructor(public ContactService: ContactService) { }

	ngOnInit(): void {
	}

	showAlert(): void {
		if ((this.name == '') || (this.mail == '') || (this.message == '')) {
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			let contact: Contact = new Contact(this.name, this.mail, this.message);
			console.log(contact);
			this.Subscription = this.ContactService.addMessageQuestion(contact).subscribe(data => {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Gửi yêu cầu thành công';
				setTimeout(() => this.isVisible = false, 1000);
			}, error => {
				this.isVisible = true;
				this.messageAlert = 'Gửi yêu cầu thất bại';
				setTimeout(() => this.isVisible = false, 1000);
				this.ContactService.handleError(error);
			});
		}
	}

}
