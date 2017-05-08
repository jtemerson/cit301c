export class Contact {
  public contactId: number;
  public name: string;
  public phone: string;
  public email: string;
  public imageUrl: string;
  public group: string[];

  constructor(id: number, name: string, phone: string, email: string, img: string, group: string[]){
    this.contactId = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.imageUrl = img;
    this.group = group;
  }
}
