import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  term: string;
  private subscription: Subscription;

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  ngOnDestroy() {
  this.subscription.unsubscribe();
}

  onKeyPress(value: string){
    this.term = value;
  }

}
