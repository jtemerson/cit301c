import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
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

  deleteContact (contact: Contact){
    if(this.contacts === null){
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0){
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

}
