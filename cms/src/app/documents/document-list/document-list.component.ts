import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  document: Document[] = [];
  documentId: string = '';

  constructor(private documentService: DocumentService) {
    this.document = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.document = this.documentService.getDocuments();

    this.documentService.documentChangeEvent
      .subscribe(
        (document: Document[]) => {
          this.document = document;
        }
      );
  }

}
