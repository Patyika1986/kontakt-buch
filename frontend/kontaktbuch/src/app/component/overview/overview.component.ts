import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';
import { Contacts } from 'src/app/interface/contact';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  constructor(private facadeService: FacadeService) {}

  subscribtion$ = new Subject();
  list: Contacts[] = [];

  ngOnInit(): void {
    this.facadeService.loadAllContacts();
    this.facadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((contacts: Contacts[]) => {
        this.list = contacts;
      });
  }

  searchContact(search: any) {
    console.log(search.data);
    this.facadeService.loadAllContacts();
    this.facadeService.contacts$
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((contact) => {
        const filter1 = contact.filter((e) => {
          return (
            e.lastname.toLocaleLowerCase().includes(search.target.value) ||
            e.firstname.toLocaleLowerCase().includes(search.target.value)
          );
        });

        if (filter1) {
          this.list = [];
          this.list = filter1;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
