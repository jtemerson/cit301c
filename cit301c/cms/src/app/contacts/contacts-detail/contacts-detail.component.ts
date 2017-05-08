import { Component, OnInit } from '@angular/core';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contacts: Contact[] = [
    // new Contact(1, 'Bro. Jackson', '208-496-3771', 'jacksonk@byui.edu', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    // new Contact(2, 'Bro. Barzee', '208-496-3768', 'barzeer@byui.edu', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null),
  ];

  constructor() { }

  ngOnInit() {
  }

}
