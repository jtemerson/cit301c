import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contacts.model';
import {Subject} from "rxjs/Subject";
import {isUndefined} from "util";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  currentContact: Contact;
  ContactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http:Http) {
    this.initContacts();
  }

  getContacts(): Contact[]{
    // this.initContacts();
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

updateContact(original: Contact, newContact: Contact) {
  if (original === null || isUndefined(original) || newContact === null || isUndefined(newContact)) {
    return;
  }
  const pos = this.contacts.indexOf(original);
  if (pos < 0) {
    return;
  }
  newContact.id = original.id;
  this.contacts[pos] = newContact;
  let clone: Contact[] = this.contacts.slice();
  this.storeContacts(clone).subscribe(
    (response: Response) => {
      console.log(response);
    }
  );
}

addContact(newContact: Contact) {
  if (newContact === null || isUndefined(newContact)){
    return;
  }

  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  let clone: Contact[] = this.contacts.slice();
  this.storeContacts(clone).subscribe(
  (response: Response) => {
    console.log(response);
  }
);
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
  let clone: Contact[] = this.contacts.slice();
  this.storeContacts(clone).subscribe(
  (response: Response) => {
    console.log(response);
  }
);
}

initContacts() {
  this.http.get('https://cms-project-9d374.firebaseio.com/contacts.json')
    .map(
      (response: Response) =>{
        return response.json();
      }
    )
    .subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        this.currentContact = this.getContact('7');
        this.maxContactId = this.getMaxId();
        this.ContactListChangedEvent.next(this.contacts.slice());
      }
    );
}

storeContacts(value: Contact[]) {
  return this.http.put('https://cms-project-9d374.firebaseio.com/contacts.json', value);
}

}
