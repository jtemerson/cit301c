import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Message } from '../messages.model';
import { MessageService } from '../messages.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onSendMessage(){
  const subject = this.subject.nativeElement.value;
  const msgText = this.msgText.nativeElement.value;
  const sender = this.contactService.currentContact.id;
  const newMessage = new Message('id', subject, msgText, sender);
  this.messageService.addMessage(newMessage);
}

onClear(){
  this.subject.nativeElement.value = "";
  this.msgText.nativeElement.value = "";
}

}
