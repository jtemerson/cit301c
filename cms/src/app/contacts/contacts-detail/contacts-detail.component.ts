import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ContactService } from '../contact.service';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

contact: Contact;
id: string = '';

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
