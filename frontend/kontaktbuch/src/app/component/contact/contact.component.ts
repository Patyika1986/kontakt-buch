import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';
import { Contacts } from 'src/app/interface/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy{

  constructor(private facadeService: FacadeService){}


  subscribtion$ = new Subject();
  contactList:Contacts[] = [];

  ngOnInit(): void {
this.getAllContacts();
  }

  getAllContacts(){
    this.facadeService.loadAllContacts();
    this.facadeService.contacts$.pipe(takeUntil(this.subscribtion$)).subscribe((contacts:Contacts[]) => {
      this.contactList = contacts;
      console.log(this.contactList);
    });
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
