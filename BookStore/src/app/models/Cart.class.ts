export class Cart {
	public id : string;
	public iduser : string;
	public idbook : string;
	public idshipper : string;
	public amount : number;
	public price : number;

	constructor(
		idshipper:string, 
		iduser : string, 
		idbook:string,
		amount : number, 
		price : number) {
		this.iduser = iduser;
		this.idshipper = idshipper;
		this.idbook = idbook;
		this.amount = amount;
		this.price = price;
	}
}