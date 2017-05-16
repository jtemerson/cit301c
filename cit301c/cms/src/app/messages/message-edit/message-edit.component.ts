import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage(){
  const subject = this.subject.nativeElement.value;
  const msgText = this.msgText.nativeElement.value;
  const newMessage = new Message(subject, msgText, null);
  this.addMessageEvent.emit(newMessage);
}

onClear(){
  this.subject.nativeElement.value = "";
  this.msgText.nativeElement.value = "";
}

}
