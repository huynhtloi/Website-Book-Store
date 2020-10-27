import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

	public title:string = 'Hướng dẫn đặt hàng online';
	constructor() { }

	ngOnInit(): void {
	}

}
