import { Component, OnInit } from '@angular/core';

import { Message } from '../messages.model'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('Apples', "i have 5 apples", "Steven"),
    new Message('Tomatoes', "i have 10 tomatoes", "Fred"),
    new Message('toes', "i have 5 toes", "Barney"),
    new Message('Legos', "i have 10 lefos", "Sam"),
]

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
  this.messages.push(message);
}

}
