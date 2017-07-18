import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject'
import {isUndefined} from "util";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DocumentService{
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangeEvent = new EventEmitter<Document[]>();
  maxDocumentId: number;
  documents: Document[] = [];

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

  constructor(private http: Http) {
    this.initDocuments();
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || isUndefined(newDocument)){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    var clone: Document[] = this.documents.slice();
    this.storeDocuments(clone).subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

updateDocument(original: Document, newDocument: Document) {
  if (original === null || isUndefined(original) || newDocument === null || isUndefined(newDocument)) {
    return;
  }
  const pos = this.documents.indexOf(original);
  if (pos < 0) {
    return;
  }
  newDocument.id = original.id;
  this.documents[pos] = newDocument;
  var clone: Document[] = this.documents.slice();
  this.storeDocuments(clone).subscribe(
    (response: Response) => {
      console.log(response);
    }
  );
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
  this.storeDocuments(clone).subscribe(
    (response: Response) => {
      console.log(response);
    }
  );
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

  initDocuments() {
    this.http.get('https://cms-project-9d374.firebaseio.com/documents.json')
    .map(
      (response: Response) =>{
        return response.json();
     }
    )
    .subscribe(
      (response: Document[]) => {
        this.documents = response;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
}

storeDocuments(value: Document[]) {
  return this.http.put('https://cms-project-9d374.firebaseio.com/documents.json', value);
}

}
