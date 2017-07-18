import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import {Subject} from "rxjs/Subject";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class MessageService{
  messageChangeEvent = new Subject<Message[]>();
  maxMessageId: number;
  messages: Message[] = [];

  constructor(private http:Http) {
  this.initMessages();
}

getMaxId() : number {
  let maxId = 0;

  for (let i = 0; i < this.messages.length; i++) {
    let currentId = parseInt(this.messages[i].id);
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
}



  getMessages(): Message[]{
    return this.messages.slice();
  }

getMessage(id: string) {
  for (let message of this.messages){
    if(message.id === id){
      return message;
    }
  }
  return null;
}

addMessage (message: Message) {
  this.messages.push(message);
  var clone: Message[] = this.messages.slice();
  this.storeMessages(clone).subscribe(
    (response: Response) => {
      console.log(response);
    }
  );
}

initMessages() {
  this.http.get('https://cms-project-9d374.firebaseio.com/messages.json')
    .map(
      (response: Response) =>{
        return response.json();
      }
    )
    .subscribe(
      (response: Message[]) => {
        this.messages = response;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      }
    );
}

storeMessages(value: Message[]) {
  return this.http.put('https://cms-project-9d374.firebaseio.com/messages.json', value);
}

}
