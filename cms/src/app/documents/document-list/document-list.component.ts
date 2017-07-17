import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  document: Document[] = [];
  documentId: string = '';

  constructor(private documentService: DocumentService) {
    this.document = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.document = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
        (document: Document[]) => {
          this.document = document;
        }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
