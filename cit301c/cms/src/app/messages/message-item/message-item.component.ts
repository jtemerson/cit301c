import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../messages.model';
import { Contact } from '../../contacts/contacts.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message:Message;
  messageSender: string = "";

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.messageSender = this.contactService.getContact(this.message.sender).name;
  }

}
