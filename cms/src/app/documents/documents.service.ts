import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable()
export class DocumentService{
  documentSelectedEvent = new EventEmitter<Document>();

  private documents: Document[]

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null;
  }

  constructor(){
    this.documents = MOCKDOCUMENTS;
  }
}
