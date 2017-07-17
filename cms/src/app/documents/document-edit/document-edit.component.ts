import { Component, OnInit } from '@angular/core';
import {Document} from '../document.model';
import {DocumentService} from "../documents.service";
import {Params, Router, ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  id: number;
  document: Document;
  originalDocument: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params)=> {
          this.id = +params['id'];

          if (this.id === null || isUndefined(this.id)) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(this.id.toString());
          if(this.originalDocument === null || isUndefined(this.originalDocument)) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
  let values = form.value;
  let newDocument: Document = new Document(
    null,
    values.docName,
    values.description,
    values.docUrl,
    null
  );

  if (this.editMode === true) {
    this.documentService.updateDocument(this.originalDocument, newDocument);
  } else {
    this.documentService.addDocument(newDocument);
  }
  this.router.navigate(["../documents"]);
}

onCancel() {
  this.router.navigate(["../documents"]);
}

}


// ----------------- ERROR MESSAGE STAYS, WHEN NEW DOC ADDED NAME DOESNT SHOW, FIELDS ARENT POPULATED WHEN DOC IS BEING EDITED--------------------
