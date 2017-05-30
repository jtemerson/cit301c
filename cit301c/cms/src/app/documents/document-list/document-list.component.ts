import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document(1, 'Bro. Jackson', 'Description', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'children'),
    new Document(1, 'Bro. Jackson', 'Description', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'children'),
    new Document(1, 'Bro. Jackson', 'Description', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'children'),
    new Document(1, 'Bro. Jackson', 'Description', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'children'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
