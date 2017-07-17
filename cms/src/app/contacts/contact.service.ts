import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";

@Injectable()
export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  currentContact: Contact;
  ContactListChangedEvent = new Subject<Contact[]>();
  maxConId: number;

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
    this.maxConId = this.getMaxId();
  }

  getMaxId() : number {
  let maxId = 0;

  for (let i = 0; i < this.contacts.length; i++) {
    let currentId = parseInt(this.contacts[i].id);
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
}

updateContact(original: Contact, newCon: Contact) {
  if (original === null || isUndefined(original) || newCon === null || isUndefined(newCon)) {
    return;
  }
  const pos = this.contacts.indexOf(original);
  if (pos < 0) {
    return;
  }
  newCon.id = original.id;
  this.contacts[pos] = newCon;
  let clone: Contact[] = this.contacts.slice();
  this.ContactListChangedEvent.next(clone);
}

addContact(newCon: Contact) {
  if (newCon === null || isUndefined(newCon)){
    return;
  }

  this.maxConId++;
  newCon.id = this.maxConId.toString();
  this.contacts.push(newCon);
  let clone: Contact[] = this.contacts.slice();
  this.ContactListChangedEvent.next(clone);
}

deleteContact(contact: Contact) {
  if (contact === null || isUndefined(contact)) {
    return;
  }

  const pos = this.contacts.indexOf(contact);
  if (pos < 0){
    return;
  }

  this.contacts.splice(pos, 1);
  let clone = this.contacts.slice();
  this.ContactListChangedEvent.next(clone);
}

}
