import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject'
import {isUndefined} from "util";

@Injectable()
export class DocumentService{
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangeEvent = new EventEmitter<Document[]>();

  maxDocumentId: number;
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
    this.maxDocumentId = this.getMaxId()
  }

  addDocument(newDocument: Document) {
  if (newDocument === null || isUndefined(newDocument)){
    return;
  }

  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  var clone: Document[] = this.documents.slice();
  this.documentListChangedEvent.next(clone);
}

updateDocument(original: Document, newDoc: Document) {
  if (original === null || isUndefined(original) || newDoc === null || isUndefined(newDoc)) {
    return;
  }
  const pos = this.documents.indexOf(original);
  if (pos < 0) {
    return;
  }
  newDoc.id = original.id;
  this.documents[pos] = newDoc;
  var clone: Document[] = this.documents.slice();
  this.documentListChangedEvent.next(clone);
}

deleteDocument(document: Document) {
  if (document === null || isUndefined(document)) {
    return;
  }

  const pos = this.documents.indexOf(document);
  if (pos < 0){
    return;
  }

  this.documents.splice(pos, 1);
  let clone: Document[] = this.documents.slice();
  this.documentListChangedEvent.next(clone);
}

  getMaxId() : number {
    let maxId = 0;

    for (let i = 0; i < this.documents.length; i++) {
      let currentId = parseInt(this.documents[i].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
