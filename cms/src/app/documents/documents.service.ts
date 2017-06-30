import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable()
export class DocumentService{
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangeEvent = new EventEmitter<Document[]>();

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

  deleteDocument(document: Document){
    if(document === null){
      return;
    }

    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangeEvent.emit(this.documents.slice());
  }

}
