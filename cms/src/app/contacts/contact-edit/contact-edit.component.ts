import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Contact} from "../contacts.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = new Contact(null, null, null, null, null, []);
  id: number;
  invalidGroupContact: Boolean = false;
  originalContact: Contact;
  editMode: Boolean = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params)=> {
          this.id = +params['id'];
          if (this.id === null || isUndefined(this.id)) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id.toString());
          if(this.originalContact === null || isUndefined(this.originalContact)) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.contact.group === null){
      this.contact.group = [];
    }
    let values = form.value;
    let newContact: Contact = new Contact(
      null,
      values.name,
      values.email,
      values.phone,
      values.url,
      this.contact.group
    );

    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(["/contacts"]);
}

onCancel() {
  this.router.navigate(["../contacts"]);
}

isInvalidContact(newContact: Contact) {
  if (!newContact) {
    return true;
  }
  if (newContact.id === this.contact.id) {
    return true;
  }
  if (this.contact.group) {
    for (let i = 0; i < this.contact.group.length; i++) {
      if (newContact.id === this.contact.group[i].id) {
        return true;
      }
    }
  }
  return false;
}

addToGroup($event: any) {
  let selectedContact: Contact = $event.dragData;
  this.invalidGroupContact = this.isInvalidContact(selectedContact);
  if (this.invalidGroupContact) {
    return;
  }
  if (!this.contact.group){
    this.contact.group = [];
  }
  this.contact.group.push(selectedContact);
  this.invalidGroupContact = false;
}

onRemoveItem(idx: number) {
  if (idx < 0 || idx >= this.contact.group.length)
    return;
  this.contact.group.splice(idx, 1);
  this.invalidGroupContact = false;
}
}
