import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];
  currentContact: Contact;

  getContacts(): Contact[]{
    return this.contacts.slice();
  }

getContact(id: string) {
  for (let contact of this.contacts){
    if(contact.id === id){
      return contact;
    }
  }
  return null;
}

  constructor(){
    this.contacts = MOCKCONTACTS
    this.currentContact = this.contacts[4];
  }
}
