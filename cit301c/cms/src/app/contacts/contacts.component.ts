import { Component, OnInit, Input } from '@angular/core';

import { Contact } from './contacts.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  selectedContact:Contact;

  constructor() { }

  ngOnInit() {
  }

}
