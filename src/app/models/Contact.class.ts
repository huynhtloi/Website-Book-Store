export class Contact {
	public id : string;
	public name : string;
	public mail : string;
	public message : string;

	constructor(name:string,mail:string,message:string) {
		this.name = name;
		this.mail = mail;
		this.message = message;
	}
}