import { Component } from '@angular/core';
import { DocumentService } from './documents/documents.service'
import { ContactService } from './contacts/contact.service'
import { MessageService } from './messages/messages.service'

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeLearn CMS!';
  constructor(private documentService: DocumentService, private messageService: MessageService, private contactService: ContactService){

  }
}
