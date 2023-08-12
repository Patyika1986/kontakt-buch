import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';
import { Contacts } from 'src/app/interface/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy{

  constructor(private facadeService: FacadeService,private router: Router){}


  subscribtion$ = new Subject();
  @Input() contactList:Contacts[] = [];

  ngOnInit(): void {
    // this.getAllContacts();
  }

  getAllContacts(){

  }

  editContact(id:number){
    const contact = this.contactList.find((con) => con.id === id);
    if (contact) {
      this.router.navigate(['settings', contact.id]);
    }
  }

  
  deleteUserFromData(id: number) {
    const result = this.contactList.find((con) => con.id === id);
    if (result) {
      this.facadeService.removeContact$
        .pipe(takeUntil(this.subscribtion$))
        .subscribe((users) => {
          this.facadeService.deleteContact(id);
        });
      const index = this.contactList.indexOf(result);
      this.contactList.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
