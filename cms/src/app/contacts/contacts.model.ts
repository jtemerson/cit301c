import { Injectable } from '@angular/core';

@Injectable()
export class Contact {
  // public contactId: number;
  // public name: string;
  // public phone: string;
  // public email: string;
  // public imageUrl: string;
  // public group: string[];

  constructor(public id: string,
              public name: string,
              public email: string,
              public phone: string,
              public imageUrl: string,
              public group: Contact[]){
    // this.contactId = id;
    // this.name = name;
    // this.phone = phone;
    // this.email = email;
    // this.imageUrl = img;
    // this.group = group;
  }
}
