import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Output() selectedContentEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(1, 'Bro. Jackson', '208-496-3771', 'jacksonk@byui.edu', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact(2, 'Bro. Barzee', '208-496-3768', 'barzeer@byui.edu', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact){
    this.selectedContentEvent.emit(contact);
  }

}
